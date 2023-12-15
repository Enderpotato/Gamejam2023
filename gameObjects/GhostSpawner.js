import { boxMullerRandom } from "../helperFuncs/testfuncs.js";
import Ghost from "./Ghost.js";
import { ghostMesh, scene } from "../sceneSetup.js";

export default class GhostSpawner {
  constructor(position) {
    this.position = position;
    this.cooldown = 4;
  }
}

GhostSpawner.prototype.update = function (dt) {
  this.cooldown -= dt;
  if (this.cooldown < 0) {
    this.spawnGhost();
    this.cooldown = boxMullerRandom() * 5 + 35; // ~ N (35, 5)
  }
};

GhostSpawner.prototype.spawnGhost = function () {
  let ghost = new Ghost(this.position.clone(), ghostMesh);
  ghost.lifetime = boxMullerRandom() * 10 + 30; // ~ N(30, 10)
  scene.addObjects([ghost]);
};
