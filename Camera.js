import Vector3 from "./structs/Vector3.js";
import { camera } from "./index.js";
import { matrixPointAt, matrixQuickInverse } from "./helperFuncs/testfuncs.js";
import BoundingBox from "./physics/BoundingBox.js";

const PosElement = document.getElementById("camera-pos");
const RotElement = document.getElementById("camera-rot");
const LookElement = document.getElementById("camera-look");

export default class Camera {
  constructor(cam) {
    this.cam = cam; // p5.Camera object
    this.position = new Vector3(cam.eyeX, cam.eyeY, cam.eyeZ);

    this.lookDir = new Vector3(0, 0, 1);

    this.yawAngle = 0; // Y axis
    this.pitchAngle = 0; // X axis
    this.boundingBoxWidth = 2
    this.boundingBox = new BoundingBox(this.position, this.boundingBoxWidth,
      this.boundingBoxWidth,
      this.boundingBoxWidth);
  }

  update(dt) {
    if (this.pitchAngle > HALF_PI) this.pitchAngle = HALF_PI;
    if (this.pitchAngle < -HALF_PI) this.pitchAngle = -HALF_PI;

    if (this.yawAngle > TAU) this.yawAngle -= TAU;
    if (this.yawAngle < -TAU) this.yawAngle += TAU;
    let rotQuat = Quaternion.fromEulerLogical(
      this.pitchAngle,
      this.yawAngle,
      PI,
      "XYZ"
    );
    this.cam.setPosition(this.position.x, this.position.y, this.position.z);
    this.lookDir = new Vector3(0, 0, 1).quaternionRotate(rotQuat).normalize();
    let target = Vector3.add(this.position, this.lookDir);
    this.cam.lookAt(target.x, target.y, target.z);

    this.boundingBox = new BoundingBox(this.position, this.boundingBoxWidth,
      this.boundingBoxWidth,
      this.boundingBoxWidth);
  }
}

Camera.prototype.calcCameraMatrix = function (pos, target, up) {
  this.matCamera = matrixPointAt(pos, target, up);
  this.matView = matrixQuickInverse(this.matCamera);
};


export function cameraControl(deltaTime) {
  // reset input velocity
  camera.inputVelZ = new Vector3(0, 0, 0);
  camera.inputVelX = new Vector3(0, 0, 0)
  const speed = 0.04 * deltaTime;
  let forwardW = camera.lookDir.clone().elementMult(speed);
  let rightW = Vector3.cross(camera.lookDir, new Vector3(0, 1, 0))
    .normalize()
    .elementMult(speed);
  // w and s key
  if (keyIsDown(87)) {
    camera.position.add_(forwardW);
    camera.inputVelZ = forwardW;
  } else if (keyIsDown(83)) {
    camera.position.add_(forwardW.neg());
    camera.inputVelZ = forwardW.neg();
  }
  // a and d key
  if (keyIsDown(65)) {
    camera.position.add_(rightW.neg());
    camera.inputVelX = rightW.neg();
  } else if (keyIsDown(68)) {
    camera.position.add_(rightW);
    camera.inputVelX = rightW;
  }

  // q and e key
  if (keyIsDown(81)) {
    camera.position.add_(new Vector3(0, -speed, 0));
  } else if (keyIsDown(69)) {
    camera.position.add_(new Vector3(0, speed, 0));
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
    camera.pitchAngle += -rotationSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    camera.pitchAngle += rotationSpeed;
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
