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
import { ghost } from "./sceneSetup.js";

export default class Direction{
    constructor(){
        this.velocity = new Vector3(0, 0, 0)
    }
}

Direction.prototype.update = function(){
  console.log(castRay(new Vector3(0, 0, -1), ghost.position));
  console.log(castRay(new Vector3(0, 0, 1), ghost.position));
  console.log(castRay(new Vector3(1, 0, 0), ghost.position));
  console.log(castRay(new Vector3(-1, 0, 0), ghost.position));
}

Direction.prototype.point = function(steve, player){
        this.velocity = new Vector3(player.positon.x - steve.positon.x, 0, player.positon.z = steve.positon.z);
        this.Vector3.normalize_()
        // return (new Vector3(this.point))
}