import Vector3 from "./structs/Vector3.js";
import { camera } from "./index.js";
import { matrixPointAt, matrixQuickInverse } from "./helperFuncs/testfuncs.js";

const PosElement = document.getElementById("camera-pos");
const RotElement = document.getElementById("camera-rot");
const LookElement = document.getElementById("camera-look");

export default class Camera {
  constructor(position, lookDir) {
    this.position = position; // vector3
    this.lookDir = lookDir; // vector3

    this.vel = new Vector3(0, 0, 0);

    this.matCamera;
    this.matView;

    this.yawAngle = 0; // Y axis
    this.pitchAngle = 0; // X axis
  }

  update(dt) {
    if (this.pitchAngle > TAU) this.pitchAngle -= TAU;
    if (this.pitchAngle < -TAU) this.pitchAngle += TAU;

    if (this.yawAngle > TAU) this.yawAngle -= TAU;
    if (this.yawAngle < -TAU) this.yawAngle += TAU;
    let rotQuat = Quaternion.fromEulerLogical(
      this.pitchAngle,
      this.yawAngle,
      PI,
      "XYZ"
    );
    this.lookDir = new Vector3(0, 0, 1).quaternionRotate(rotQuat).normalize();
    this.position = this.position.add(this.vel.elementMult(dt));
  }
}

Camera.prototype.calcCameraMatrix = function (pos, target, up) {
  this.matCamera = matrixPointAt(pos, target, up);
  this.matView = matrixQuickInverse(this.matCamera);
};

export function cameraControl(deltaTime) {
  // reset input velocity
  camera.inputVel = new Vector3(0, 0, 0);
  const speed = 0.02 * deltaTime;
  let forwardW = camera.lookDir.clone().elementMult(speed);
  // w and s key
  if (keyIsDown(87)) {
    camera.position = camera.position.add(forwardW);
  } else if (keyIsDown(83)) {
    camera.position = camera.position.add(forwardW.elementMult(-1));
  }
  // a and d key
  if (keyIsDown(65)) {
    camera.position = camera.position.add(
      Vector3.cross(camera.lookDir, new Vector3(0, 1, 0))
        .normalize()
        .elementMult(-speed)
    );
  } else if (keyIsDown(68)) {
    camera.position = camera.position.add(
      Vector3.cross(camera.lookDir, new Vector3(0, 1, 0))
        .normalize()
        .elementMult(speed)
    );
  }

  // q and e key
  if (keyIsDown(81)) {
    camera.position = camera.position.add(new Vector3(0, speed, 0));
  } else if (keyIsDown(69)) {
    camera.position = camera.position.add(new Vector3(0, -speed, 0));
  }

  const rotationSpeed = 0.002 * deltaTime;

  // left and right arrow key for rotation
  if (keyIsDown(LEFT_ARROW)) {
    camera.yawAngle += -rotationSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    camera.yawAngle += rotationSpeed;
  }

  // up and down arrow key for rotation
  if (keyIsDown(UP_ARROW)) {
    camera.pitchAngle += rotationSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    camera.pitchAngle += -rotationSpeed;
  }

  // console.log(camera.inputVel);
  PosElement.innerHTML = `Camera Position: 
  ${camera.position.x.toFixed()},
   ${camera.position.y.toFixed()},
    ${camera.position.z.toFixed()}`;
  RotElement.innerHTML = `Camera Rotation:
  ${camera.yawAngle.toFixed(3)},
   ${camera.pitchAngle.toFixed(3)}`;
  LookElement.innerHTML = `Camera Look Direction:
  ${camera.lookDir.x.toFixed(3)},
   ${camera.lookDir.y.toFixed(3)},
    ${camera.lookDir.z.toFixed(3)}`;
}
