import Vector3 from "./structs/Vector3.js";
import { camera } from "./index.js";
import { matrixPointAt, matrixQuickInverse } from "./testfuncs.js";

const PosElement = document.getElementById("camera-pos");

export default class Camera {
  constructor(position, lookDir) {
    this.position = position; // vector3
    this.lookDir = lookDir; // vector3

    this.inputVel = new Vector3(0, 0, 0);
    this.vel = new Vector3(0, 0, 0);

    this.matCamera;
    this.matView;
  }

  update(dt) {
    this.vel = this.inputVel.elementMult(0.1);
    this.position = this.position.add(this.vel.elementMult(dt));
  }
}

Camera.prototype.calcCameraMatrix = function (pos, target, up) {
  this.matCamera = matrixPointAt(pos, target, up);
  this.matView = matrixQuickInverse(this.matCamera);
};

export function cameraControl() {
  // reset input velocity
  camera.inputVel = new Vector3(0, 0, 0);
  // w and s key
  if (keyIsDown(87)) {
    camera.inputVel.z = 1;
  } else if (keyIsDown(83)) {
    camera.inputVel.z = -1;
  }
  // a and d key
  if (keyIsDown(65)) {
    camera.inputVel.x = 1;
  } else if (keyIsDown(68)) {
    camera.inputVel.x = -1;
  }
  // q and e key
  if (keyIsDown(81)) {
    camera.inputVel.y = 1;
  } else if (keyIsDown(69)) {
    camera.inputVel.y = -1;
  }
  camera.inputVel = camera.inputVel.normalize();
  // console.log(camera.inputVel);
  PosElement.innerHTML = `Camera Position: 
  ${camera.position.x.toFixed()},
   ${camera.position.y.toFixed()},
    ${camera.position.z.toFixed()}`;
}
