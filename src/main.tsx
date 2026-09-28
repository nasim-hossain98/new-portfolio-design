import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

/**
 * NOTE: `<StrictMode>` is deliberately NOT used here.
 *
 * In development, StrictMode mounts -> unmounts -> remounts every component.
 * On that unmount, @react-three/fiber's <Canvas> cleanup runs
 * `unmountComponentAtNode(canvas)`, which 500ms later calls
 * `gl.forceContextLoss()` on the <canvas> element (see
 * @react-three/fiber/dist/events-*.esm.js -> unmountComponentAtNode).
 *
 * React reuses the same <canvas> DOM node on the remount, and a canvas can only
 * ever own ONE WebGL context — so the element's context stays permanently lost
 * (`gl.isContextLost() === true`, drawingBuffer 0x0). The 3D gallery then
 * silently draws nothing and three.js logs
 * "THREE.WebGLRenderer: Context Lost.", leaving an empty black box.
 *
 * @react-three/fiber 9.7.0 (latest) exposes no opt-out for that call, so the
 * only reliable fix is to keep the WebGL canvas out of StrictMode's
 * double-invoked effects.
 */
createRoot(document.getElementById("root")!).render(<App />);
