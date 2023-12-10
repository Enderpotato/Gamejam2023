import GameObject from "./GameObject.js";
import Vector3 from "../structs/Vector3.js";
import { player } from "../sceneSetup.js";
import { scene } from "../sceneSetup.js";

export default class Trophy extends GameObject {
  constructor(position, mesh) {
    super(position, mesh);
    this.scale = new Vector3(2, 2, 2);
  }
}

Trophy.prototype.collideWithPlayer = function () {
  if (this.collider.collide(player.collider)) {
    console.log("You win!");

    let index = scene.objects.indexOf(this);

    if (index !== -1) {
      scene.objects.splice(index, 1);
    }
    // bro i swear this is not me copilot literally generated this
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
};
