import Vector3 from "./structs/Vector3.js";
import Vector2 from "./structs/Vector2.js";
import { ZNEAR, ZFAR, AspectRatio, invFov } from "./index.js";

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
    vec.z * perspMatrix[2][2] + perspMatrix[3][2];
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
  return multiplyPMatrix(vect).elementMult(width);
}
