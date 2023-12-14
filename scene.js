import Player from "./gameObjects/Player.js";
import { Gravity } from "./sceneSetup.js";

export default class Scene {
  constructor(objects) {
    this.objects = [...objects];
    this.walls = [];
    this.nonPhysicals = []; // for objects with no physics( ghost spawnpoints)
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

  this.walls.forEach((wall) => {
    wall.update(dt);
  });

  this.nonPhysicals.forEach((nonPhysical) => {
    nonPhysical.update(dt);
  });

  //loop until no collisions?
  let maxIterations = 10; // Maximum number of iterations to prevent infinite loops
  let iterations = 0;

  this.objects.forEach((object, index) => {
    for (let wall of this.walls) {
      if (object.collider.collide(wall.collider)) {
        object.collider.onCollision(wall.collider);
      }
    }
    for (
      let otherIndex = index + 1;
      otherIndex < this.objects.length;
      otherIndex++
    ) {
      let otherObject = this.objects[otherIndex];
      if (object.collider.collide(otherObject.collider)) {
        if (object instanceof Player) {
          otherObject.collideWithPlayer();
        }
        if (otherObject instanceof Player) {
          object.collideWithPlayer();
        }

        object.collider.onCollision(otherObject.collider);
      }
    }
  });
};

Scene.prototype.addObjects = function (objects, isWalls = false) {
  if (isWalls) {
    this.walls.push(...objects);
    return;
  }
  this.objects.push(...objects);
};
