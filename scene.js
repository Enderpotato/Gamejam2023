import BoundingBox from "./physics/BoundingBox.js";
import Vector3 from "./structs/Vector3.js";
import { gObject1, gObject3, gObject6 } from "./sceneSetup.js";

export default class Scene {
  constructor(objects) {
    this.objects = [...objects];
  }
}

Scene.prototype.addObject = function (object) {
  this.objects.push(object);
};

Scene.prototype.update = function (dt) {
  // console.log(gObject1.velocity);
  this.objects.forEach((object) => {
    // add gravity
    object.force = object.force.add(new Vector3(0, 9.8, 0));
    object.update(dt);
  });
  // console.log(gObject1.collider.boundingBox);
  this.objects.forEach((object, index) => {
    for (
      let otherIndex = index + 1;
      otherIndex < this.objects.length;
      otherIndex++
    ) {
      let otherObject = this.objects[otherIndex];
      if (object.collider.collide(otherObject.collider)) {
        // console.log("collision");
        object.collider.onCollision(otherObject.collider);
      }
    }
  });
};
