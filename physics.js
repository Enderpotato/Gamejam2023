import Vector3 from "./structs/Vector3.js";


export default class BoundingBox{
    constructor(pos_vec, w, l, h){
        this.w = w;
        this.h = h;
        this.l = l;
        this.minX = pos_vec.x - w/2;
        this.minY = pos_vec.y - l/2;
        this.minZ = pos_vec.z - h/2;

        this.maxX = pos_vec.x + w/2;
        this.maxY = pos_vec.y + l/2;
        this.maxZ = pos_vec.z + h/2;
    }        
}

BoundingBox.intersect = function(a, b) {
    return (
        a.minX <= b.maxX &&
        a.maxX >= b.minX && 
        a.minY <= b.maxY &&
        a.maxY >= b.minY &&
        a.minZ <= b.maxZ &&
        a.maxZ >= b.minZ
    )
}

