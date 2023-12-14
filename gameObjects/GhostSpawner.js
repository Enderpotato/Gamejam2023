import { boxMullerRandom } from "../helperFuncs/testfuncs.js";
import Ghost from "./Ghost.js";
import { ghostMesh, scene } from "../preload.js";

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
    this.cooldown = boxMullerRandom() * 10 + 40; // ~ N(40, 3)
  }
};

GhostSpawner.prototype.spawnGhost = function () {
  let ghost = new Ghost(this.position, ghostMesh);
  ghost.lifetime = 40;
  scene.addObjects([ghost]);
};
