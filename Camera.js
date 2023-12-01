import Vector3 from "./structs/Vector3.js";
import { camera } from "./index.js";
import { matrixPointAt, matrixQuickInverse } from "./testfuncs.js";

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
    let rotQuat = Quaternion.fromEulerLogical(
      this.pitchAngle,
      this.yawAngle,
      0,
      "XYZ"
    ).normalize();
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
  let forwardW = camera.lookDir.clone().elementMult(0.05 * deltaTime);
  // w and s key
  if (keyIsDown(87)) {
    camera.position = camera.position.add(forwardW);
  } else if (keyIsDown(83)) {
    camera.position = camera.position.add(forwardW.elementMult(-1));
  }
  // // a and d key
  // if (keyIsDown(65)) {
  //   camera.inputVel.x = 1;
  // } else if (keyIsDown(68)) {
  //   camera.inputVel.x = -1;
  // }
  // // q and e key
  // if (keyIsDown(81)) {
  //   camera.inputVel.y = 1;
  // } else if (keyIsDown(69)) {
  //   camera.inputVel.y = -1;
  // }

  // left and right arrow key for rotation
  if (keyIsDown(LEFT_ARROW)) {
    camera.yawAngle += 0.001 * deltaTime;
  } else if (keyIsDown(RIGHT_ARROW)) {
    camera.yawAngle += -0.001 * deltaTime;
  }

  // up and down arrow key for rotation
  if (keyIsDown(UP_ARROW)) {
    camera.pitchAngle += -0.001 * deltaTime;
  } else if (keyIsDown(DOWN_ARROW)) {
    camera.pitchAngle += 0.001 * deltaTime;
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
