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
import { castRay } from "./helperFuncs/raycast.js";

export default class Direction{
    constructor(){
        this.velocity = new Vector3(0, 0, 0)
        this.vectors = new Array(8);
        this.directions = [new Vector3(0, 0, 1) ,
                        new Vector3(1, 0, 1) ,
                        new Vector3(0, 0, 1) ,
                        new Vector3(1, 0, -1) ,
                        new Vector3(0, 0, -1) ,
                        new Vector3(-1, 0, -1),
                        new Vector3(-1, 0, 0) ,
                        new Vector3(-1, 0, 1)]
    }
}

Direction.prototype.getDirection = function(ghostPosition, playerPostion){ 
  let avg_vector = new Vector3(0, 0, 0);
  for (let i = 0; i < this.vectors.length; i++){
    this.vectors[i] = get_weighted_vector(castRay(this.directions[i], ghostPosition).rayLength, this.directions[i]);
    avg_vector.add_(this.vectors[i]);
  }
  let relativePosition = ghostPosition.subtract(playerPostion);
  avg_vector.y = 0;
  relativePosition.y = 0;
  avg_vector.subtract_(relativePosition.elementMult(10));

  return avg_vector;
}

function get_weighted_vector(weight, vector){
  return vector.elementMult(weight/10);
}