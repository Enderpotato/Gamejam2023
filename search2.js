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
        ).normalize()
      );
    }
  }
}

Direction.prototype.getDirection = function (ghostPosition, playerPostion) {
  let toPlayerDir = playerPostion.subtract(ghostPosition).normalize();
  toPlayerDir.y = 0;

  let dangerWeights = new Array(this.directions.length);
  let targetWeights = new Array(this.directions.length);
  for (let i = 0; i < this.directions.length; i++) {
    targetWeights[i] =
      Math.max(0, Vector3.dot(this.directions[i], toPlayerDir)) * 10;

    // inverse of distance since the closer the ghost to the wall the more it wanna avoid it
    dangerWeights[i] =
      100 / castRay(this.directions[i], ghostPosition).rayLength;
  }
  let finalDir = new Vector3(0, 0, 0);
  for (let i = 0; i < this.directions.length; i++) {
    finalDir.add_(
      this.directions[i].elementMult(targetWeights[i] - dangerWeights[i])
    );
  }

  return finalDir;
};

function get_weighted_vector(weight, vector) {
  return vector.elementMult(weight / 10);
}
