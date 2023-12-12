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
    constructor(n){
        this.isHostile = true;
        this.velocity = new Vector3(0, 0, 0)
        this.vectors = new Array(n);
        this.directions = [];
        let deltaDirVector = 2* Math.PI / n;
        for (let i = 0; i < n; i++){
          this.directions.push(new Vector3(Math.cos(i * deltaDirVector), 0, Math.sin(i * deltaDirVector)));
        }
    }
}

Direction.prototype.getDirection = function(ghostPosition, playerPostion, ghostFacing){ 
  let avg_vector = new Vector3(0, 0, 0);
  let relativePosition  = ghostPosition.subtract(playerPostion);
  let relativeVectorOfDirectionsToPlayer = new Array(this.vectors.length);
  let minLength;
  let minLengthIndex;
  for (let i = 0; i < this.vectors.length; i++){
    this.vectors[i] = get_weighted_vector(castRay(this.directions[i], ghostPosition).rayLength, this.directions[i]);
    avg_vector.add_(this.vectors[i]);
    //calculate which vector the ghost should evaluate to check if player is hidden
    //we have to get the vector closest to where the ghost is facing
    //to do that, we will find the direction vector in which is has a minimum length to the player.
    //We must note that the directions vector is relative, so we use relativePosition
    relativeVectorOfDirectionsToPlayer[i] = relativePosition.subtract(this.directions[i]).mag();
  }

  // console.log(relativeVectorOfDirectionsToPlayer)

  minLength = Math.min(...relativeVectorOfDirectionsToPlayer);
  minLengthIndex = 15 - int(relativeVectorOfDirectionsToPlayer.indexOf(minLength));

  if (castRay(this.directions[minLengthIndex], ghostPosition).rayLength < relativePosition.mag()){
    this.isHostile = false;
  } else {
    this.isHostile = true;
  }
  // console.log(this.isHostile)

  if (this.isHostile){
    relativePosition = ghostPosition.subtract(playerPostion);
  } else {
    relativePosition = new Vector3(0, 0, 0);
  }
  avg_vector.y = 0;
  relativePosition.y = 0;
  avg_vector.subtract_(relativePosition.elementMult(5));

  return avg_vector;
}

function get_weighted_vector(weight, vector){
  return vector.elementMult(weight/10);
}