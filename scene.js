import { Gravity } from "./sceneSetup.js";

export default class Scene {
  constructor(objects) {
    this.objects = [...objects];
  }
}

Scene.prototype.addObject = function (object) {
  this.objects.push(object);
};

Scene.prototype.update = function (dt) {
  this.objects.forEach((object) => {
    // add gravity
    object.force = object.force.add(Gravity);

    object.update(dt);
    object.collider.isCollidingBelow = false;
  });

  //loop until no collisions?
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
};

Scene.prototype.addObjects = function (objects) {
  this.objects.push(...objects);
};
