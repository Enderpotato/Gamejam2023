import {
    scene,
    sceneSetTextures,
    Lights,
    player,
    steve,
    Gravity,
  } from "./sceneSetup.js";

export default class pathFind{
    constructor(map, map_w, map_h){
        this.grid = generateNodes(map, map_w, map_h);
        let cols = map.length;
        let rows = map[0].length;
        this.start;
        this.end;
        this.openSet = [];
        this.closeSet = [];

        this.start = this.grid[0][0];
        this.end = this.grid[cols-1][rows-1];

        this.openSet.push(this.start);
    }
}

pathFind.prototype.generatePath = function(){
    if (this.openSet.length > 0) {
        var winner = 0;
        for (let i = 0;i < this.openSet.length; i++) {
            if (this.openSet[i].f < this.openSet[winner].f) {
            winner = i;
            } 
        }
        var current = this.openSet[winner];

        if (current == this.end) {
            console.log('Done') //DONE
            noLoop();
        }
        
    this.start.addNeighbour(this.grid); // add neighbour to first node
    removeFromArray(this.openSet, current)
    this.closeSet.push(current);
    
    var neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      var neighbour = neighbours[i];
      
      if (!this.closeSet.includes(neighbour)) {
        var tempG = current.g + 1;
        if (this.openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
          }
        } else {         
          neighbour.g = tempG;
          this.openSet.push(neighbour);
        }
        
        neighbour.h = heuristic(neighbour, this.end)
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.previous = current;
            }
        }
    }
    console.log(neighbours)
}




















//ignore these they are just helper functions

function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

function removeFromArray(arr, elt) {
    for (var i = arr.length -1; i>= 0; i--) {
        if (arr[i] ==elt) {
            arr.splice(i,1)
        }
    }
}

class Node{
    constructor(i, j, w, h, isWall = false){
    this.x = j;
    this.z = i;
    this.wall = isWall; //it is not a wall by default
    
   //fn(ttl cost) = gn(cost from curr to n) + hn(estimated cost from n to target)     
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;
    }
    
    addNeighbour(grid) {
      var j  = this.x;
      var i = this.z;
      var cols = grid[0].length;
      var rows = grid.length;
      if ( i < cols - 1) {
        this.neighbours.push(grid[i + 1][j])
      }
      if ( i > 0) {
        this.neighbours.push(grid[i - 1][j])
      }
      if (j < rows - 1) {
        this.neighbours.push(grid[i][j +1])
      }
      if (j > 0){
        this.neighbours.push(grid[i][j -1])
      }
    }
  }

function generateNodes(map, map_w, map_h){
    let w = map_w/map[0].length;
    let h = map_h/map.length;
    var grid = []
    for (let i = 0; i < map.length; i++){
        let row = [];
        for (let j = 0; j < map[0].length; j++){
            if (map[i][j] == 0) {
                row.push(new Node(i, j, w, h, true));
            } else {
                row.push(new Node(i, j, w, h));
            }
        }
        grid.push(row);
    }
    return grid;
}

