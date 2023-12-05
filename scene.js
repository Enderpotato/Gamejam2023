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
    this.objects.forEach((object, index) => {
      for (
        let otherIndex = index + 1;
        otherIndex < this.objects.length;
        otherIndex++
      ) {
        let otherObject = this.objects[otherIndex];
        if (
          BoundingBox.intersect(object.boundingBox, otherObject.boundingBox)
        ) {
          console.log("collision");
          object.onCollision(otherObject);
        }
      }
    });
  }
}
