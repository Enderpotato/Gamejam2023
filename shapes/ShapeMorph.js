export default class ShapeMorph {
  constructor() {}
}

ShapeMorph.rotate = function (object, quaternion) {
  object.vertices = object.vertices.map((vertex) => {
    vertex = vertex.subtract(object.position);
    let rotated = vertex.quaternionRotate(quaternion);
    return rotated.add(object.position);
  });
};
