'use client';

import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
	/** Fade in range as percentage of depth range (0-1) */
	fadeIn: {
		start: number;
		end: number;
	};
	/** Fade out range as percentage of depth range (0-1) */
	fadeOut: {
		start: number;
		end: number;
	};
}

interface BlurSettings {
	/** Blur in range as percentage of depth range (0-1) */
	blurIn: {
		start: number;
		end: number;
	};
	/** Blur out range as percentage of depth range (0-1) */
	blurOut: {
		start: number;
		end: number;
	};
	/** Maximum blur amount (0-10, higher values = more blur) */
	maxBlur: number;
}

interface InfiniteGalleryProps {
	images: ImageItem[];
	/** Speed multiplier applied to scroll delta (default: 1) */
	speed?: number;
	/** Spacing between images along Z in world units (default: 2.5) */
	zSpacing?: number;
	/** Number of visible planes (default: clamp to images.length, min 8) */
	visibleCount?: number;
	/** Near/far distances for opacity/blur easing (default: { near: 0.5, far: 12 }) */
	falloff?: { near: number; far: number };
	/** Fade in/out settings with ranges based on depth range percentage (default: { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } }) */
	fadeSettings?: FadeSettings;
	/** Blur in/out settings with ranges based on depth range percentage (default: { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 }) */
	blurSettings?: BlurSettings;
	/** Optional className for outer container */
	className?: string;
	/** Optional style for outer container */
	style?: React.CSSProperties;
}

interface PlaneData {
	index: number;
	z: number;
	imageIndex: number;
	/** Texture index currently bound to this plane's material (-1 = none yet) */
	appliedIndex: number;
	x: number;
	y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

// Custom shader material for blur, opacity, and cloth folding effects
const createClothMaterial = () => {
	return new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;

        vec3 pos = position;

        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;

        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;

        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;

        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;

          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }

        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
		fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vec4 color = texture2D(map, vUv);

        // Blur approximation (3x3 kernel keeps the fill cost sane on weak GPUs)
        if (blurAmount > 0.01) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;

          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }

        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);

        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
	});
};

function GalleryScene({
	images,
	speed = 1,
	visibleCount = 8,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.15 },
		fadeOut: { start: 0.85, end: 0.95 },
	},
	blurSettings = {
		blurIn: { start: 0.0, end: 0.1 },
		blurOut: { start: 0.9, end: 1.0 },
		maxBlur: 3.0,
	},
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
	const gl = useThree((state) => state.gl);

	// All animation state lives in refs — mutating React state inside useFrame
	// forces a full re-render every frame and can starve the GPU process.
	const scrollVelocity = useRef(0);
	const autoPlay = useRef(true);
	const lastInteraction = useRef(Date.now());
	const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
	const hoverFlags = useRef<boolean[]>([]);

	// Normalize images to objects
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	// Load textures (suspends until ready — the parent Suspense shows a loader)
	const textures = useTexture(normalizedImages.map((img) => img.src)) as THREE.Texture[];

	// Create materials pool and dispose on unmount
	const materials = useMemo(
		() => Array.from({ length: visibleCount }, () => createClothMaterial()),
		[visibleCount]
	);
	useEffect(() => {
		return () => {
			materials.forEach((material) => material.dispose());
		};
	}, [materials]);

	const spatialPositions = useMemo(() => {
		const positions: { x: number; y: number }[] = [];
		const maxHorizontalOffset = MAX_HORIZONTAL_OFFSET;
		const maxVerticalOffset = MAX_VERTICAL_OFFSET;

		for (let i = 0; i < visibleCount; i++) {
			const horizontalAngle = (i * 2.618) % (Math.PI * 2);
			const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

			const horizontalRadius = (i % 3) * 1.2;
			const verticalRadius = ((i + 1) % 4) * 0.8;

			const x =
				(Math.sin(horizontalAngle) * horizontalRadius * maxHorizontalOffset) /
				3;
			const y =
				(Math.cos(verticalAngle) * verticalRadius * maxVerticalOffset) / 4;

			positions.push({ x, y });
		}

		return positions;
	}, [visibleCount]);

	const totalImages = normalizedImages.length;
	const depthRange = DEFAULT_DEPTH_RANGE;

	const planesData = useMemo<PlaneData[]>(
		() =>
			Array.from({ length: visibleCount }, (_, i) => ({
				index: i,
				z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
				imageIndex: totalImages > 0 ? i % totalImages : 0,
				appliedIndex: -1,
				x: spatialPositions[i]?.x ?? 0,
				y: spatialPositions[i]?.y ?? 0,
			})),
		[depthRange, spatialPositions, totalImages, visibleCount]
	);

	// Wheel / touch / keyboard input drives the gallery.
	// `data-lenis-prevent` on the wrapper keeps Lenis from stealing the wheel.
	useEffect(() => {
		const el = gl.domElement;
		const beginInteraction = () => {
			autoPlay.current = false;
			lastInteraction.current = Date.now();
		};

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			scrollVelocity.current += event.deltaY * 0.01 * speed;
			beginInteraction();
		};

		let lastTouchY = 0;
		const handleTouchStart = (event: TouchEvent) => {
			lastTouchY = event.touches[0]?.clientY ?? 0;
		};
		const handleTouchMove = (event: TouchEvent) => {
			const y = event.touches[0]?.clientY;
			if (y == null) return;
			scrollVelocity.current += (lastTouchY - y) * 0.02 * speed;
			lastTouchY = y;
			beginInteraction();
		};

		const arrowKeys = new Set([
			'ArrowUp',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
		]);
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!arrowKeys.has(event.key)) return;
			// Only capture the keys while the gallery fills a good part of the view
			const rect = el.getBoundingClientRect();
			const viewportH = window.innerHeight || 1;
			const visibleRatio =
				(Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0)) / viewportH;
			if (visibleRatio < 0.35) return;
			event.preventDefault();
			const direction =
				event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
			scrollVelocity.current += direction * 2 * speed;
			beginInteraction();
		};

		el.addEventListener('wheel', handleWheel, { passive: false });
		el.addEventListener('touchstart', handleTouchStart, { passive: true });
		el.addEventListener('touchmove', handleTouchMove, { passive: true });
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			el.removeEventListener('wheel', handleWheel);
			el.removeEventListener('touchstart', handleTouchStart);
			el.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [gl, speed]);

	if (hoverFlags.current.length !== visibleCount) {
		hoverFlags.current = Array.from({ length: visibleCount }, () => false);
	}

	useFrame((state, delta) => {
		if (Date.now() - lastInteraction.current > 3000) {
			autoPlay.current = true;
		}
		if (autoPlay.current) {
			scrollVelocity.current += 0.3 * delta;
		}
		scrollVelocity.current *= 0.95;

		const time = state.clock.getElapsedTime();
		const velocity = scrollVelocity.current;
		materials.forEach((material) => {
			if (material?.uniforms) {
				material.uniforms.time.value = time;
				material.uniforms.scrollForce.value = velocity;
			}
		});

		const imageAdvance =
			totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
		const totalRange = depthRange;

		planesData.forEach((plane, i) => {
			let newZ = plane.z + velocity * delta * 10;
			let wrapsForward = 0;
			let wrapsBackward = 0;

			if (newZ >= totalRange) {
				wrapsForward = Math.floor(newZ / totalRange);
				newZ -= totalRange * wrapsForward;
			} else if (newZ < 0) {
				wrapsBackward = Math.ceil(-newZ / totalRange);
				newZ += totalRange * wrapsBackward;
			}

			if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
				plane.imageIndex =
					(plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
			}

			if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
				const step = plane.imageIndex - wrapsBackward * imageAdvance;
				plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
			}

			plane.z = ((newZ % totalRange) + totalRange) % totalRange;

			const normalizedPosition = plane.z / totalRange;
			let opacity = 1;

			if (
				normalizedPosition >= fadeSettings.fadeIn.start &&
				normalizedPosition <= fadeSettings.fadeIn.end
			) {
				const fadeInProgress =
					(normalizedPosition - fadeSettings.fadeIn.start) /
					(fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
				opacity = fadeInProgress;
			} else if (normalizedPosition < fadeSettings.fadeIn.start) {
				opacity = 0;
			} else if (
				normalizedPosition >= fadeSettings.fadeOut.start &&
				normalizedPosition <= fadeSettings.fadeOut.end
			) {
				const fadeOutProgress =
					(normalizedPosition - fadeSettings.fadeOut.start) /
					(fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
				opacity = 1 - fadeOutProgress;
			} else if (normalizedPosition > fadeSettings.fadeOut.end) {
				opacity = 0;
			}

			opacity = Math.max(0, Math.min(1, opacity));

			let blur = 0;

			if (
				normalizedPosition >= blurSettings.blurIn.start &&
				normalizedPosition <= blurSettings.blurIn.end
			) {
				const blurInProgress =
					(normalizedPosition - blurSettings.blurIn.start) /
					(blurSettings.blurIn.end - blurSettings.blurIn.start);
				blur = blurSettings.maxBlur * (1 - blurInProgress);
			} else if (normalizedPosition < blurSettings.blurIn.start) {
				blur = blurSettings.maxBlur;
			} else if (
				normalizedPosition >= blurSettings.blurOut.start &&
				normalizedPosition <= blurSettings.blurOut.end
			) {
				const blurOutProgress =
					(normalizedPosition - blurSettings.blurOut.start) /
					(blurSettings.blurOut.end - blurSettings.blurOut.start);
				blur = blurSettings.maxBlur * blurOutProgress;
			} else if (normalizedPosition > blurSettings.blurOut.end) {
				blur = blurSettings.maxBlur;
			}

			blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

			const material = materials[i];
			if (material?.uniforms) {
				material.uniforms.opacity.value = opacity;
				material.uniforms.blurAmount.value = blur;
				material.uniforms.isHovered.value = hoverFlags.current[i] ? 1 : 0;
			}

			// Apply transforms imperatively — no React render involved.
			const mesh = meshRefs.current[i];
			if (!mesh) return;
			// Skip fragment work for fully transparent planes (they still cost fill rate)
			mesh.visible = opacity > 0.01;
			if (!mesh.visible) return;

			mesh.position.set(plane.x, plane.y, plane.z - totalRange / 2);

			if (plane.imageIndex !== plane.appliedIndex) {
				plane.appliedIndex = plane.imageIndex;
				const texture = textures[plane.imageIndex];
				if (texture && material) {
					material.uniforms.map.value = texture;
					const img = texture.image as { width?: number; height?: number } | null;
					const aspect =
						img && img.width ? img.width / (img.height || 1) : 1;
					mesh.scale.set(
						aspect > 1 ? 2 * aspect : 2,
						aspect > 1 ? 2 : 2 / aspect,
						1
					);
				}
			}
		});
	});

	if (totalImages === 0) return null;

	return (
		<>
			{planesData.map((plane, i) => {
				const material = materials[i];
				if (!material) return null;

				return (
					<mesh
						key={plane.index}
						ref={(m) => {
							meshRefs.current[i] = m;
						}}
						position={[plane.x, plane.y, plane.z - depthRange / 2]}
						material={material}
						onPointerEnter={() => {
							hoverFlags.current[i] = true;
						}}
						onPointerLeave={() => {
							hoverFlags.current[i] = false;
						}}
					>
						<planeGeometry args={[1, 1, 32, 32]} />
					</mesh>
				);
			})}
		</>
	);
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
	const normalizedImages = useMemo(
		() =>
			images.map((img) =>
				typeof img === 'string' ? { src: img, alt: '' } : img
			),
		[images]
	);

	return (
		<div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
			<p className="text-gray-600 mb-4">
				WebGL not supported. Showing image list:
			</p>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
				{normalizedImages.map((img, i) => (
					<img
						key={i}
						src={img.src || '/placeholder.svg'}
						alt={img.alt}
						className="w-full h-32 object-cover rounded"
					/>
				))}
			</div>
		</div>
	);
}

/** Synchronous WebGL capability check — runs before any Canvas is created */
function detectWebGL(): boolean {
	try {
		const canvas = document.createElement('canvas');
		return !!(
			canvas.getContext('webgl') ||
			canvas.getContext('experimental-webgl')
		);
	} catch {
		return false;
	}
}

export default function InfiniteGallery({
	images,
	className = 'h-96 w-full',
	style,
	speed,
	visibleCount,
	fadeSettings = {
		fadeIn: { start: 0.05, end: 0.25 },
		fadeOut: { start: 0.4, end: 0.43 },
	},
	blurSettings = {
		blurIn: { start: 0.0, end: 0.1 },
		blurOut: { start: 0.4, end: 0.43 },
		maxBlur: 8.0,
	},
}: InfiniteGalleryProps) {
	const [webglSupported] = useState(detectWebGL);
	// If the GPU process drops the context (driver reset, software-GL watchdog,
	// context cap...), remount the Canvas once to get a fresh one instead of
	// leaving a dead white rectangle on the page.
	const [canvasKey, setCanvasKey] = useState(0);
	const recoveryCount = useRef(0);

	const handleContextLost = useCallback((event: Event) => {
		event.preventDefault();
		if (recoveryCount.current < 5) {
			recoveryCount.current += 1;
			setCanvasKey((key) => key + 1);
		}
	}, []);

	if (!webglSupported) {
		return (
			<div className={className} style={style}>
				<FallbackGallery images={images} />
			</div>
		);
	}

	return (
		<div className={className} style={style} data-lenis-prevent>
			<Canvas
				key={canvasKey}
				camera={{ position: [0, 0, 0], fov: 55 }}
				gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
				dpr={[1, 2]}
				onCreated={({ gl }) => {
					gl.domElement.addEventListener('webglcontextlost', handleContextLost);
				}}
			>
				<GalleryScene
					images={images}
					speed={speed}
					visibleCount={visibleCount}
					fadeSettings={fadeSettings}
					blurSettings={blurSettings}
				/>
			</Canvas>
		</div>
	);
}
