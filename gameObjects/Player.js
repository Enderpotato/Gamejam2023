import GameObject from "./GameObject.js";
import BoundingBox from "../physics/BoundingBox.js";
import Vector3 from "../structs/Vector3.js";

export let rotationSpeed = 0;

let controls = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function addMouseDownEvent(element, index) {
  element.addEventListener("touchstart", () => {
    controls[index] = 1;
  });

  element.addEventListener("touchend", () => {
    controls[index] = 0;
  });
}

addMouseDownEvent(document.getElementById("move-up"), 0);
addMouseDownEvent(document.getElementById("move-down"), 1);
addMouseDownEvent(document.getElementById("move-left"), 2);
addMouseDownEvent(document.getElementById("move-right"), 3);
addMouseDownEvent(document.getElementById("jump"), 4);
addMouseDownEvent(document.getElementById("look-left"), 5);
addMouseDownEvent(document.getElementById("look-right"), 6);
addMouseDownEvent(document.getElementById("look-up"), 7);
addMouseDownEvent(document.getElementById("look-down"), 8);

export default class Player extends GameObject {
  constructor(position, camera) {
    super(position ? position : new Vector3(0, 0, 0));
    this.camera = camera || null;
    this.mesh = null;
    this.yawAngle = 0; // Y axis
    this.pitchAngle = 0; // X axis
  }
}

Player.prototype.setCamera = function (camera) {
  this.camera = camera;
};

Player.prototype.update = function (dt) {
  this.playerControl(dt);
  // semi-implicit euler integration (copy-pasted from GameObject.js cuz this dont have mesh)
  this.acc = Vector3.elementMult(this.force, this.invMass);
  if (this.immovable) this.acc = Vector3.zeros();
  this.velocity.add_(this.acc.elementMult(dt));
  this.position.add_(this.velocity.elementMult(dt));
  this.acc = Vector3.zeros();
  this.force = Vector3.zeros();

  this.camera.position = this.position;
  this.camera.yawAngle = this.yawAngle;
  this.camera.pitchAngle = this.pitchAngle;

  this.createBoundingBox();
};

Player.prototype.playerControl = function (dt) {
  let speed = 10 * dt;
  let inputVelocity = new Vector3(0, 0, 0);

  let lookDir = this.camera.lookDir;
  lookDir.y = 0;
  lookDir.normalize();

  // W & S
  if (keyIsDown(87) || controls[0]) inputVelocity.add_(lookDir);
  if (keyIsDown(83) || controls[1]) inputVelocity.subtract_(lookDir);

  // A & D
  let rightDir = lookDir.cross(new Vector3(0, 1, 0));
  if (keyIsDown(65) || controls[2]) inputVelocity.subtract_(rightDir);
  if (keyIsDown(68) || controls[3]) inputVelocity.add_(rightDir);

  this.position.add_(inputVelocity.normalize().elementMult(speed));

  // space for jumping
  if ((keyIsDown(32) || controls[4]) && this.collider.isCollidingBelow) {
    this.velocity.y = -7;
  }

  rotationSpeed = 0.05 * deltaTime; // 2 radians per second
  const arrowKeyRotationSpeed = 2 * deltaTime;

  // left and right arrow key for rotation
  if (keyIsDown(LEFT_ARROW) || controls[5]) {
    this.yawAngle += arrowKeyRotationSpeed;
  } else if (keyIsDown(RIGHT_ARROW) || controls[6]) {
    this.yawAngle += -arrowKeyRotationSpeed;
  }

  // up and down arrow key for rotation
  if (keyIsDown(UP_ARROW) || controls[7]) {
    this.pitchAngle += arrowKeyRotationSpeed;
  } else if (keyIsDown(DOWN_ARROW) || controls[8]) {
    this.pitchAngle += -arrowKeyRotationSpeed;
  }

  if (this.yawAngle > TAU) this.yawAngle -= TAU;
  if (this.yawAngle < -TAU) this.yawAngle += TAU;

  if (this.pitchAngle > HALF_PI) this.pitchAngle = HALF_PI;
  if (this.pitchAngle < -HALF_PI) this.pitchAngle = -HALF_PI;
};

Player.prototype.createBoundingBox = function () {
  let min = new Vector3(
    this.position.x - 1,
    this.position.y - 0,
    this.position.z - 1
  );

  let max = new Vector3(
    this.position.x + 1,
    this.position.y + 3,
    this.position.z + 1
  );

  this.collider.boundingBox = new BoundingBox(min, max);
};

Player.prototype.reset = function () {
  this.position = new Vector3(0, 0, 0);
  this.velocity = new Vector3(0, 0, 0);
  this.force = new Vector3(0, 0, 0);
  this.yawAngle = 0;
  this.pitchAngle = 0;
};
