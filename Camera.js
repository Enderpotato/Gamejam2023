import Vector3 from "./structs/Vector3.js";
import BoundingBox from "./physics/BoundingBox.js";

const PosElement = document.getElementById("camera-pos");
const RotElement = document.getElementById("camera-rot");
const LookElement = document.getElementById("camera-look");

const pitchLimit = Math.PI / 2 - 0.01;

export default class Camera {
  constructor(cam) {
    this.cam = cam; // p5.Camera object
    this.position = new Vector3(cam.eyeX, cam.eyeY, cam.eyeZ);

    this.lookDir = new Vector3(0, 0, 1);

    this.yawAngle = 0; // Y axis
    this.pitchAngle = 0; // X axis
    this.boundingBoxWidth = 2;
    this.boundingBox = new BoundingBox(
      this.position,
      this.boundingBoxWidth,
      this.boundingBoxWidth,
      this.boundingBoxWidth
    );
  }

  update(dt) {
    if (this.pitchAngle > pitchLimit) this.pitchAngle = pitchLimit;
    if (this.pitchAngle < -pitchLimit) this.pitchAngle = -pitchLimit;

    if (this.yawAngle > TAU) this.yawAngle -= TAU;
    if (this.yawAngle < -TAU) this.yawAngle += TAU;
    let rotQuat = Quaternion.fromEulerLogical(
      this.pitchAngle,
      this.yawAngle,
      0,
      "XYZ"
    );
    this.cam.setPosition(this.position.x, this.position.y, this.position.z);
    this.lookDir = new Vector3(0, 0, 1).quaternionRotate(rotQuat).normalize();
    let target = Vector3.add(this.position, this.lookDir);
    this.cam.lookAt(target.x, target.y, target.z);

    this.boundingBox = new BoundingBox(
      this.position,
      this.boundingBoxWidth,
      this.boundingBoxWidth,
      this.boundingBoxWidth
    );
  }
}

Camera.prototype.calcFrustum = function (fov, aspect, near, far) {
  let tanHalfFov = Math.tan(fov / 2);

  // Calculate the dimensions of the near and far clipping planes
  let nearHeight = 2 * tanHalfFov * near;
  let nearWidth = nearHeight * aspect;
  let farHeight = 2 * tanHalfFov * far;
  let farWidth = farHeight * aspect;

  // Calculate the corners of the near clipping plane
  let nearCenter = Vector3.add(
    this.position,
    Vector3.elementMult(this.lookDir, near)
  );
  let nearRight = Vector3.elementMult(
    Vector3.cross(this.lookDir, new Vector3(0, 1, 0)),
    nearWidth / 2
  );
  let nearTop = Vector3.elementMult(new Vector3(0, 1, 0), nearHeight / 2);
  let nearCorners = [
    Vector3.add3(nearCenter, nearRight, nearTop), // top right
    Vector3.add3(nearCenter, nearRight, Vector3.neg(nearTop)), // bottom right
    Vector3.add3(nearCenter, Vector3.neg(nearRight), nearTop), // top left
    Vector3.add3(nearCenter, Vector3.neg(nearRight), Vector3.neg(nearTop)), // bottom left
  ];

  // Calculate the corners of the far clipping plane
  let farCenter = Vector3.add(
    this.position,
    Vector3.elementMult(this.lookDir, far)
  );
  let farRight = Vector3.elementMult(
    Vector3.cross(this.lookDir, new Vector3(0, 1, 0)),
    farWidth / 2
  );
  let farTop = Vector3.elementMult(new Vector3(0, 1, 0), farHeight / 2);
  let farCorners = [
    Vector3.add3(farCenter, farRight, farTop), // top right
    Vector3.add3(farCenter, farRight, Vector3.neg(farTop)), // bottom right
    Vector3.add3(farCenter, Vector3.neg(farRight), farTop), // top left
    Vector3.add3(farCenter, Vector3.neg(farRight), Vector3.neg(farTop)), // bottom left
  ];

  // Return the corners of the near and far clipping planes
  return { nearCorners, farCorners };
};

export function cameraControl(deltaTime, cameraC) {
  const speed = 40 * deltaTime; // 40 units per second
  let forwardW = cameraC.lookDir.clone().elementMult(speed);
  let rightW = Vector3.cross(cameraC.lookDir, new Vector3(0, 1, 0))
    .normalize()
    .elementMult(speed);
  // w and s key
  if (keyIsDown(87)) {
    cameraC.position.add_(forwardW);
  } else if (keyIsDown(83)) {
    cameraC.position.add_(forwardW.neg());
  }
  // a and d key
  if (keyIsDown(65)) {
    cameraC.position.add_(rightW.neg());
  } else if (keyIsDown(68)) {
    cameraC.position.add_(rightW);
  }

  // q and e key
  if (keyIsDown(81)) {
    cameraC.position.add_(new Vector3(0, -speed, 0));
  } else if (keyIsDown(69)) {
    cameraC.position.add_(new Vector3(0, speed, 0));
  }

  const rotationSpeed = 2 * deltaTime; // 2 radians per second

  // left and right arrow key for rotation
  if (keyIsDown(LEFT_ARROW)) {
    cameraC.yawAngle += rotationSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    cameraC.yawAngle += -rotationSpeed;
  }

  // up and down arrow key for rotation
  if (keyIsDown(UP_ARROW)) {
    cameraC.pitchAngle += rotationSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    cameraC.pitchAngle += -rotationSpeed;
  }

  PosElement.innerHTML = `Camera Position: 
  ${cameraC.position.x.toFixed()},
   ${cameraC.position.y.toFixed()},
    ${cameraC.position.z.toFixed()}`;
  RotElement.innerHTML = `Camera Rotation:
  ${cameraC.yawAngle.toFixed(3)},
   ${cameraC.pitchAngle.toFixed(3)}`;
  LookElement.innerHTML = `Camera Look Direction:
  ${cameraC.lookDir.x.toFixed(3)},
   ${cameraC.lookDir.y.toFixed(3)},
    ${cameraC.lookDir.z.toFixed(3)}`;
}
