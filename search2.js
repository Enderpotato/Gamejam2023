import {
    scene,
    sceneSetTextures,
    Lights,
    player,
    steve,
    Gravity,
  } from "./sceneSetup.js";
import Vector3 from "./structs/Vector3.js";
import Player from "./gameObjects/Player.js";

export default class Direction{
    constructor(){
        this.velocity = new Vector3(0, 0, 0)
    }
}


Direction.prototype.point = function(steve, player){
        this.velocity = new Vector3(player.positon.x - steve.positon.x, 0, player.positon.z = steve.positon.z);
        this.Vector3.normalize_()
        // return (new Vector3(this.point))
}