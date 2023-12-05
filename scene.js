import { camera } from "./index.js";
import BoundingBox from "./physics/BoundingBox.js";

export default class Scene {
  constructor(objects) {
    this.objects = [...objects];

  }

  update(dt) {
    this.objects.forEach((object) => {
      object.update(dt);
    });
    for (let object of this.objects) {
      if (BoundingBox.intersect(camera.boundingBox, object.boundingBox)) {
        object.position.add(camera.inputVelX.add(camera.inputVelZ));
        console.log(object.position);
      }
    }
  }
}
