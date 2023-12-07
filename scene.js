import BoundingBox from "./physics/BoundingBox.js";
import Vector3 from "./structs/Vector3.js";
import { gObject1, gObject3, gObject4, gObject6 } from "./sceneSetup.js";

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
  let maxIterations = 10; // Maximum number of iterations to prevent infinite loops
  let iterations = 0;

  this.objects.forEach((object, index) => {
    for (
      let otherIndex = index + 1;
      otherIndex < this.objects.length;
      otherIndex++
    ) {
      let otherObject = this.objects[otherIndex];
      if (object.collider.collide(otherObject.collider)) {
        object.collider.onCollision(otherObject.collider);
        // collisionFound = true;
      }
    }
  });
  // while (iterations < maxIterations) {
  //   let collisionFound = false;
  //   this.objects.forEach((object, index) => {
  //     for (
  //       let otherIndex = index + 1;
  //       otherIndex < this.objects.length;
  //       otherIndex++
  //     ) {
  //       let otherObject = this.objects[otherIndex];
  //       if (object.collider.collide(otherObject.collider)) {
  //         object.collider.onCollision(otherObject.collider);
  //         collisionFound = true;
  //       }
  //     }
  //   });

  //   if (!collisionFound) {
  //     break; // Exit the loop if no collisions were found in this pass
  //   }

  //   iterations++;
  // }
};
