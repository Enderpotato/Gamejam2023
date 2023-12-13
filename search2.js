import {
  scene,
  sceneSetTextures,
  Lights,
  player,
  steve,
  Gravity,
} from "./sceneSetup.js";
import Vector3 from "./structs/Vector3.js";
import Player from "./gameObjects/Player.js";
import { ghost } from "./sceneSetup.js";
import { castRay } from "./helperFuncs/raycast.js";

export default class Direction {
  constructor(n) {
    this.vectors = new Array(n);
    this.directions = [];
    let deltaDirVector = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      this.directions.push(
        new Vector3(
          Math.cos(i * deltaDirVector),
          0,
          Math.sin(i * deltaDirVector)
        )
      );
    }
  }
}

Direction.prototype.getDirection = function (
  ghostPosition,
  playerPostion,
  ghostFacing
) {
  let avg_vector = new Vector3(0, 0, 0);
  let playerToGhost = ghostPosition.subtract(playerPostion);
  for (let i = 0; i < this.vectors.length; i++) {
    this.vectors[i] = get_weighted_vector(
      castRay(this.directions[i], ghostPosition).rayLength,
      this.directions[i]
    );
    avg_vector.subtract_(this.vectors[i]);
  }

  playerToGhost = ghostPosition.subtract(playerPostion);

  avg_vector.y = 0;
  playerToGhost.y = 0;
  avg_vector.add_(playerToGhost.elementMult(5));

  return avg_vector.neg();
};

function get_weighted_vector(weight, vector) {
  return vector.elementMult(weight / 10);
}
