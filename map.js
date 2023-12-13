import GameObject from "./gameObjects/GameObject.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import { Textures } from "./preload.js";

// lmao back to 2d coords
const MapWidth = 300;
const MapHeight = 300;

let cellWidth = 10;
let cellHeight = 10;

let MapGridW = 0;
let MapGridH = 0;

export let Map2d = [];

export { MapWidth, MapHeight, cellWidth, cellHeight, MapGridW, MapGridH };

export async function loadMap(filepath) {
  Map2d = [];
  const sceneArray = await parseMap(filepath);
  return sceneArray;
}

async function parseMap(filepath) {
  let sceneArray = [];
  const response = await fetch(filepath);
  let data = await response.text();
  data = data.split("\n");
  MapGridW = data[0].split(",").length;
  MapGridH = data.length - 1;
  cellHeight = Math.round(300 / MapGridH);
  cellWidth = Math.round(300 / MapGridW);
  data.forEach((line, row) => parseLine(line, sceneArray, row));
  return sceneArray;
}

function parseLine(line, sceneArray, row) {
  const height = 30;
  const Ypos = -10;
  const gridLine = line.split(",");
  if (gridLine.length < MapGridW) return;
  Map2d.push([]);

  gridLine.forEach((cell, col) => {
    Map2d[row].push(parseInt(cell));
    if (parseInt(cell) > -1) {
      let wallCuboid = new MeshCuboid(cellWidth, height, cellHeight);
      const Xpos = col * cellWidth + cellWidth / 2 - MapWidth / 2;
      const Zpos = row * cellHeight + cellHeight / 2 - MapHeight / 2;
      const wallPosition = new Vector3(Xpos, Ypos, Zpos);
      let wallCell = new GameObject(wallPosition, wallCuboid);
      wallCuboid.setTexture(Textures["walter"]);
      wallCell.immovable = true;
      wallCell.rotation.x = Math.PI;
      sceneArray.push(wallCell);
    }
  });
}
