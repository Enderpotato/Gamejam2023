import Vector3 from "../structs/Vector3.js";
import Vector2 from "../structs/Vector2.js";
import { ZNEAR, ZFAR, AspectRatio, invFov } from "../index.js";

let perspMatrix;
let perspMatrixTensor;

export function createPerspectiveMatrix() {
  perspMatrix = [
    [AspectRatio * invFov, 0, 0, 0],
    [0, invFov, 0, 0],
    [0, 0, ZFAR / (ZFAR - ZNEAR), -1],
    [0, 0, (-ZFAR * ZNEAR) / (ZFAR - ZNEAR), 0],
  ];
  perspMatrixTensor = tf.tensor2d(perspMatrix);
  // console.log(pers);pMatrix
}

function multiplyPMatrix(vec) {
  // tensor multiplication is slow so we do it manually
  let result = new Vector3();
  result.x = vec.x * perspMatrix[0][0];
  // here all zeros
  // vec.y * perspMatrix[1][0] +
  // vec.z * perspMatrix[2][0] +
  // perspMatrix[3][0];
  result.y =
    // vec.x * perspMatrix[0][1] +
    vec.y * perspMatrix[1][1];
  // vec.z * perspMatrix[2][1] +
  // perspMatrix[3][1];
  result.z =
    // vec.x * perspMatrix[0][2] +
    // vec.y * perspMatrix[1][2] +
    vec.z * perspMatrix[2][2] + perspMatrix[3][2] * vec.w;
  let w =
    vec.x * perspMatrix[0][3] +
    vec.y * perspMatrix[1][3] +
    vec.z * perspMatrix[2][3] +
    perspMatrix[3][3];
  w = 1 / w;
  result.x *= w;
  result.y *= w;
  result.z *= w;
  return result;
}

export function transform3Dto2D(xy, z) {
  return (xy * ZNEAR) / z;
}

export function transformWorldtoScreen(worldPoint) {
  let screenPoint = new Vector2(
    transform3Dto2D(worldPoint.x, worldPoint.z) * width,
    transform3Dto2D(worldPoint.y, worldPoint.z) * height
  );
  return screenPoint;
}

export function perspectiveProject(vect) {
  // let vecTensor = vect.to4dTensor().transpose();
  // let result = tf.matMul(perspMatrixTensor, vecTensor);
  // let result2 = result.arraySync();
  // let w = result2[3][0];
  // return new Vector3(
  //   result2[0][0] / w,
  //   result2[1][0] / w,
  //   result2[2][0] / w
  // ).elementMult(width);
  let projected = multiplyPMatrix(vect);

  return new Vector3(projected.x * width, projected.y * height, projected.z);
}

export function Matrix_MultiplyVector(m, i) {
  let v = new Vector3(0, 0, 0);
  v.x = i.x * m[0][0] + i.y * m[1][0] + i.z * m[2][0] + i.w * m[3][0];
  v.y = i.x * m[0][1] + i.y * m[1][1] + i.z * m[2][1] + i.w * m[3][1];
  v.z = i.x * m[0][2] + i.y * m[1][2] + i.z * m[2][2] + i.w * m[3][2];
  v.w = i.x * m[0][3] + i.y * m[1][3] + i.z * m[2][3] + i.w * m[3][3];
  return v;
}

export function matrixPointAt(pos, target, up) {
  // Calculate new forward direction
  let newForward = Vector3.subtract(target, pos).normalize();

  // Calculate new Up direction
  let a = newForward.elementMult(Vector3.dot(up, newForward));
  let newUp = Vector3.subtract(up, a).normalize();

  // New Right direction is easy, its just cross product
  let newRight = Vector3.cross(newUp, newForward);

  // Construct Dimensioning and Translation Matrix
  let matrix = [
    [newRight.x, newRight.y, newRight.z, 0],
    [newUp.x, newUp.y, newUp.z, 0],
    [newForward.x, newForward.y, newForward.z, 0],
    [pos.x, pos.y, pos.z, 1],
  ];

  return matrix;
}

export function matrixQuickInverse(m) {
  // only for rotation/translation matrices

  let matrix = [
    [m[0][0], m[1][0], m[2][0], 0],
    [m[0][1], m[1][1], m[2][1], 0],
    [m[0][2], m[1][2], m[2][2], 0],
    [
      -(m[3][0] * m[0][0] + m[3][1] * m[0][1] + m[3][2] * m[0][2]),
      -(m[3][0] * m[1][0] + m[3][1] * m[1][1] + m[3][2] * m[1][2]),
      -(m[3][0] * m[2][0] + m[3][1] * m[2][1] + m[3][2] * m[2][2]),
      1,
    ],
  ];
  return matrix;
}
