import Vector3 from "../structs/Vector3.js";

export function vectorIntersectPlane(planeP, planeN, lineStart, lineEnd) {
  planeN = planeN.normalize();
  let planeD = -Vector3.dot(planeN, planeP);
  let ad = Vector3.dot(lineStart, planeN);
  let bd = Vector3.dot(lineEnd, planeN);
  let t = (-planeD - ad) / (bd - ad);
  let lineStartToEnd = Vector3.subtract(lineEnd, lineStart);
  let lineToIntersect = lineStartToEnd.elementMult(t);
  return Vector3.add(lineStart, lineToIntersect);
}

export function triangleClipAgainstPlane(
  planeP,
  planeN,
  triIn,
  triOut1,
  triOut2
) {
  // Make sure plane normal is indeed normal
  planeN = planeN.normalize();

  // Return signed shortest distance from point to plane, plane normal must be normalised
  let dist = function (p) {
    let n = planeN;
    let planeD = -Vector3.dot(n, planeP);
    return n.x * p.x + n.y * p.y + n.z * p.z + planeD;
  };

  // Create two temporary storage arrays to classify points either side of plane
  // If distance sign is positive, point lies on "inside" of plane
  let insidePoints = [];
  let outsidePoints = [];
  let insidePointCount = 0;
  let outsidePointCount = 0;

  // Get signed distance of each point in triangle to plane
  let d0 = dist(triIn.vertices[0]);
  let d1 = dist(triIn.vertices[1]);
  let d2 = dist(triIn.vertices[2]);

  if (d0 >= 0) {
    insidePoints[insidePointCount++] = triIn.vertices[0];
  } else {
    outsidePoints[outsidePointCount++] = triIn.vertices[0];
  }
  if (d1 >= 0) {
    insidePoints[insidePointCount++] = triIn.vertices[1];
  } else {
    outsidePoints[outsidePointCount++] = triIn.vertices[1];
  }
  if (d2 >= 0) {
    insidePoints[insidePointCount++] = triIn.vertices[2];
  } else {
    outsidePoints[outsidePointCount++] = triIn.vertices[2];
  }

  // Now classify triangle points, and break the input triangle into
  // smaller output triangles if required. There are four possible
  // outcomes...
  if (insidePointCount === 0) {
    // All points lie on the outside of plane, so clip whole triangle
    // It ceases to exist

    return 0; // No returned triangles are valid
  }

  if (insidePointCount === 3) {
    triOut1.color = triIn.color;
    triOut1.normal = triIn.normal;
    // set color to red
    triOut1.color = new Vector3(255, 0, 0);

    // All points lie on the inside of plane, so do nothing
    // and allow the triangle to simply pass through
    triOut1.vertices[0] = triIn.vertices[0];
    triOut1.vertices[1] = triIn.vertices[1];
    triOut1.vertices[2] = triIn.vertices[2];

    return 1; // Just the one returned original triangle is valid
  }

  if (insidePointCount === 1) {
    // Triangle should be clipped. As two points lie outside
    // the plane, the triangle simply becomes a smaller triangle

    // Copy appearance info to new triangle
    triOut1.color = triIn.color;
    triOut1.normal = triIn.normal;

    triOut1.color = new Vector3(0, 255, 0);

    // The inside point is valid, so keep that...
    triOut1.vertices[0] = insidePoints[0];

    // but the two new points are at the locations where the
    // original sides of the triangle (lines) intersect with the plane
    triOut1.vertices[1] = vectorIntersectPlane(
      planeP,
      planeN,
      insidePoints[0],
      outsidePoints[0]
    );
    triOut1.vertices[2] = vectorIntersectPlane(
      planeP,
      planeN,
      insidePoints[0],
      outsidePoints[1]
    );

    return 1; // Return the newly formed single triangle
  }

  if (insidePointCount === 2 && outsidePointCount === 1) {
    // Triangle should be clipped. As two points lie inside the plane,
    // the clipped triangle becomes a "quad". Fortunately, we can
    // represent a quad with two new triangles

    // Copy appearance info to new triangles
    triOut1.color = triIn.color;
    triOut2.color = triIn.color;

    // set color to blue
    triOut1.color = new Vector3(0, 0, 255);
    triOut2.color = new Vector3(0, 0, 255);

    triOut1.normal = triIn.normal;
    triOut2.normal = triIn.normal;

    // The first triangle consists of the two inside points and a new
    // point determined by the location where one side of the triangle
    // intersects with the plane
    triOut1.vertices[0] = insidePoints[0];
    triOut1.vertices[1] = insidePoints[1];
    triOut1.vertices[2] = vectorIntersectPlane(
      planeP,
      planeN,
      insidePoints[0],
      outsidePoints[0]
    );

    // The second triangle is composed of one of he inside points, a
    // new point determined by the intersection of the other side of the
    // triangle and the plane, and the newly created point above
    triOut2.vertices[0] = insidePoints[1];
    triOut2.vertices[1] = triOut1.vertices[2];
    triOut2.vertices[2] = vectorIntersectPlane(
      planeP,
      planeN,
      insidePoints[1],
      outsidePoints[0]
    );

    return 2; // Return two newly formed triangles which form a quad
  }

  return 0; // Otherwise, no returned triangles are valid
}
