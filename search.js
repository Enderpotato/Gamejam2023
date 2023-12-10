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

        this.start = this.grid[1][1];
        this.end = this.grid[cols-2][rows-2];

        this.openSet.push(this.start);
        this.pathArr = [];
        this.current = this.start;
        this.pathCost = 1; //this is the default
    }
}

pathFind.prototype.generatePath = function(){
  var fScore = []; 
  this.current.addNeighbour(this.grid);
  //  console.log(this.start)
  var neighbours = this.current.neighbours;

  removeFromArray(this.openSet, this.current); //we only want the other stuff inside
  this.closeSet.push(this.current); //evaluated stuff is pushed into closedSet

  for (let neighbour of neighbours){
    if (!this.closeSet.includes(neighbour)){
      neighbour.g = this.pathCost; //evaluation
      neighbour.h = heuristic(neighbour, this.end);
      neighbour.f = neighbour.g + neighbour.h;
      fScore.push(neighbour.f); //get fScore
    } else {
      fScore.push(Infinity);
    }
  }

  let winnerIndex = indexOfMin(fScore);
  let winner = this.current.neighbours[winnerIndex]

  this.current = winner;
  if (this.openSet.includes(this.current)){
    //no need to push
  } else {
    this.openSet.push(this.current.neighbours)
  }
  
  if (this.current == this.end) {
    console.log('Done') //DONE
    noLoop();
  }

  console.log(this.current)
  

    // if (this.openSet.length > 0) {
    //     var winner = 0;
    //     for (let i = 0;i < this.openSet.length; i++) {
    //         if (this.openSet[i].f < this.openSet[winner].f) {
    //         winner = i;
    //         } 
    //     }
    //     this.current = this.openSet[winner];
    //     this.pathArr.push(this.openSet[winner]);

    //     if (this.current == this.end) {
    //         console.log('Done') //DONE
    //         noLoop();
    //     }
        
    // // this.start.addNeighbour(this.grid); // add neighbour to first node
    // removeFromArray(this.openSet, this.current)
    // this.closeSet.push(this.current);
    // this.current.addNeighbour(this.grid);
    // var neighbours = this.current.neighbours;
    // for (let i = 0; i < neighbours.length; i++) {
    //   var neighbour = neighbours[i];
      
    //   if (!this.closeSet.includes(neighbour)) {
    //     var tempG = this.current.g + 1;
    //     if (this.openSet.includes(neighbour)) {
    //       if (tempG < neighbour.g) {
    //         neighbour.g = tempG;
    //       }
    //     } else {         
    //       neighbour.g = tempG;
    //       this.openSet.push(neighbour);
    //     }
        
    //     neighbour.h = heuristic(neighbour, this.end)
    //     neighbour.f = neighbour.g + neighbour.h;
    //     neighbour.previous = this.current;
    //         }
    //     }
    // }
    // console.log(this.current)
}




















//ignore these they are just helper functions
function indexOfMin(arr) {
  if (arr.length === 0) {
      return 0;
  }

  var min = arr[0];
  var minIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
          minIndex = i;
          min = arr[i];
      }
  }

  return minIndex;
}

function heuristic(a, b) {
    var d = dist(a.x, a.z, b.x, b.z);
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
      for (let i of this.neighbours){ //remove all instances of walls so walls are not evaluated
        if (i.wall){
          removeFromArray(this.neighbours, i)
        }
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
                row.push(new Node(i, j, w, h, false)); //not wall
            }
        }
        grid.push(row);
    }
    return grid;
}

