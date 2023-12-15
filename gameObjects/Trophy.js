import GameObject from "./GameObject.js";
import Vector3 from "../structs/Vector3.js";
import { scene } from "../sceneSetup.js";
import { game } from "../index.js";

export default class Trophy extends GameObject {
  constructor(position, mesh) {
    super(position, mesh);
    this.scale = new Vector3(2, 2, 2);
  }
}

Trophy.prototype.collideWithPlayer = function () {
  game.currentTrophies++;
  if (game.currentTrophies == game.numTrophies) {
    game.running = false;
    game.win = true;
    console.log("you win");
    // // bro i swear this is not me copilot literally generated this
    // window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }

  let index = scene.objects.indexOf(this);

  if (index !== -1) {
    scene.objects.splice(index, 1);
  }
};
