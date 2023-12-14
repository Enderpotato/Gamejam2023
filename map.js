import GameObject from "./gameObjects/GameObject.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import { Textures } from "./preload.js";
import Ghost from "./gameObjects/Ghost.js";
import Trophy from "./gameObjects/Trophy.js";

// lmao back to 2d coords
const MapWidth = 300;
const MapHeight = 300;

let cellWidth = 10;
let cellHeight = 10;

let MapGridW = 0;
let MapGridH = 0;

export let Map2d = [];

export { MapWidth, MapHeight, cellWidth, cellHeight, MapGridW, MapGridH };

export async function loadMap(filepath, scene) {
  Map2d = [];
  const sceneDict = await parseMap(filepath);
  scene.addObjects(sceneDict.walls, true);
  scene.nonPhysicals.push(...sceneDict.nonPhysicals);
  console.log(scene);
  return sceneDict;
}

async function parseMap(filepath) {
  let sceneDict = {
    walls: [],
    nonPhysicals: [],
  };
  const response = await fetch(filepath);
  let data = await response.text();
  data = data.split("\n");
  MapGridW = data[0].split(",").length;
  MapGridH = data.length - 1;
  cellHeight = Math.round(300 / MapGridH);
  cellWidth = Math.round(300 / MapGridW);
  data.forEach((line, row) => parseLine(line, sceneDict, row));
  return sceneDict;
}

function parseLine(line, sceneDict, row) {
  const height = 30;
  const Ypos = -10;
  const gridLine = line.split(",");
  if (gridLine.length < MapGridW) return;
  Map2d.push([]);

  gridLine.forEach((cell, col) => {
    Map2d[row].push(parseInt(cell));
    let cellId = parseInt(cell);
    if (cellId <= -1) return;

    let wallCuboid = new MeshCuboid(cellWidth, height, cellHeight);
    const Xpos = col * cellWidth + cellWidth / 2 - MapWidth / 2;
    const Zpos = row * cellHeight + cellHeight / 2 - MapHeight / 2;
    const wallPosition = new Vector3(Xpos, Ypos, Zpos);
    let wallCell = new GameObject(wallPosition, wallCuboid);
    wallCuboid.setTexture(Textures["walter"]);
    wallCell.immovable = true;
    wallCell.rotation.x = Math.PI;
    sceneDict.walls.push(wallCell);
  });
}
