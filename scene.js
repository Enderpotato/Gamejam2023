import { camera } from "./index.js";
import BoundingBox from "./physics/BoundingBox.js";
import Vector3 from "./structs/Vector3.js";

export default class Scene {
  constructor(objects) {
    this.objects = [...objects];

  }

  update(dt) {
    this.objects.forEach((object) => {
      object.update(dt);
    });
    // console.log(camera.inputVelX.add(camera.inputVelZ))
    for (let object of this.objects) {
      if (BoundingBox.intersect(camera.boundingBox, object.boundingBox)) {
        object.acc = camera.inputVelX.add(camera.inputVelZ);
      } else {
        // object.velocity = new Vector3(0, 0, 0);
      }
    }
  }
}
