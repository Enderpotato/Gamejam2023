import Vector3 from "./structs/Vector3.js";
import BoundingBox from "./physics/BoundingBox.js";

export default class GameObject {
    constructor(position, mesh) {
        this.position = position;
        this.rotation = new Vector3(0, 0, 0);
        this.mesh = mesh;
        mesh.position = position;

        this.velocity = new Vector3(0, 0, 0);
        this.acc = new Vector3(0, 0, 0);
        this.boundingBox = BoundingBox.createFromCube(this);
    }
}

GameObject.prototype.update = function (dt) {
    this.velocity.add_(this.acc);
    this.position.add_(this.velocity.elementMult(dt));
    this.acc = this.velocity.elementMult(-0.1);

    let [rotate_x, rotate_y, rotate_z] = [0, 0, 0];
    // i, o, p key for axis rotation
    const speed = 0.002 * dt;
    if (keyIsDown(73)) rotate_x = speed;
    if (keyIsDown(79)) rotate_y = speed;
    if (keyIsDown(80)) rotate_z = speed;

    this.boundingBox = BoundingBox.createFromCube(this);

    this.rotation.add_(new Vector3(rotate_x, rotate_y, rotate_z));

    const quat = Quaternion.fromEulerLogical(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z,
        "XYZ"
    );

    this.mesh.update(this.position, quat)
}