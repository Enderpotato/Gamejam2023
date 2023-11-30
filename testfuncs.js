import Vector3 from "./structs/Vector3.js";
import Vector2 from "./structs/Vector2.js";
import { NEAR } from "./index.js";

export function transform3Dto2D(xy, z) {
  return (xy * NEAR) / z;
}

export function transformWorldtoScreen(worldPoint) {
  let screenPoint = new Vector2(
    transform3Dto2D(worldPoint.x, worldPoint.z) * width,
    transform3Dto2D(worldPoint.y, worldPoint.z) * height
  );
  return screenPoint;
}
