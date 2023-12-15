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
  let deltaDistX = Math.abs(1 / rayDir.x);
  let deltaDistY = Math.abs(1 / rayDir.y);

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

  let hit = false;
  let side = 0;
  while (!hit) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapY += stepY;
      side = 1;
    }
    if (Map2d[mapY][mapX] > 0) {
      hit = true;
    }
  }

  // adjust mapX and mapY to be the cell that was hit
  if (Math.sign(rayDir.x) == 1) mapX += 1;
  if (Math.sign(rayDir.y) == 1) mapY += 1;

  // convert map coord to world coords
  let hitX = mapX * cellWidth - MapWidth / 2;
  let hitY = mapY * cellHeight - MapHeight / 2;
  hit = new Vector2(hitX, hitY);
  rayLength = Math.sqrt((hitX - rayOrigin.x) ** 2 + (hitY - rayOrigin.z) ** 2);

  return { rayLength, hit };
}
