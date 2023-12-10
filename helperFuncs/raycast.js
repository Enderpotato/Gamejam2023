import {
  Map2d,
  MapGridW,
  MapGridH,
  cellWidth,
  cellHeight,
  MapWidth,
  MapHeight,
} from "../map.js";
import Vector2 from "../structs/Vector2.js";

export function castRay(rayDirection, rayOrigin) {
  let rayLength = 0;
  const rayDir = new Vector2(rayDirection.x, rayDirection.z).normalize();

  // top down view
  let rayX = rayOrigin.x + MapWidth / 2;
  let rayY = rayOrigin.z + MapHeight / 2;

  // calculate initial values
  let mapX = Math.floor(rayX / cellWidth);
  let mapY = Math.floor(rayY / cellHeight);

  console.log(mapX, mapY);

  let deltaDistX = rayDir.x < 0.001 ? 0 : Math.abs(1 / rayDir.x);
  let deltaDistY = rayDir.y < 0.001 ? 0 : Math.abs(1 / rayDir.y);
  console.log(deltaDistX, deltaDistY);

  let stepX, stepY;
  let sideDistX, sideDistY;

  if (rayDir.x < 0) {
    stepX = -1;
    sideDistX = (rayX - mapX * cellWidth) * deltaDistX;
  } else if (rayDir.x > 0) {
    stepX = 1;
    sideDistX = (mapX * cellWidth + cellWidth - rayX) * deltaDistX;
  } else {
    stepX = 0;
    sideDistX = 0;
  }

  if (rayDir.y < 0) {
    stepY = -1;
    sideDistY = (rayY - mapY * cellHeight) * deltaDistY;
  } else if (rayDir.y > 0) {
    stepY = 1;
    sideDistY = (mapY * cellHeight + cellHeight - rayY) * deltaDistY;
  } else {
    stepY = 0;
    sideDistY = 0;
  }

  console.log(MapGridW, MapGridH);
  console.log(sideDistX, sideDistY);

  return rayLength;
}
