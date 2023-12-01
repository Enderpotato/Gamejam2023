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

ShapeMorph.rotateTriangle = function (tri, quaternion, position) {
  tri.vertices = tri.vertices.map((vertex) => {
    vertex = vertex.subtract(position);
    let rotated = vertex.quaternionRotate(quaternion);
    return rotated.add(position);
  });
};

ShapeMorph.translate = function (object, vector) {
  object.vertices = object.vertices.map((vertex) => {
    return vertex.add(vector);
  });
};
