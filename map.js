import GameObject from "./GameObject.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import { Textures } from "./preload.js";

const MapWidth = 300;
const MapLength = 300;

let cellWidth = 10;
let cellLength = 10;

export let Map2d = [];

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
  cellLength = Math.round(300 / data.length);
  cellWidth = Math.round(300 / data[0].split(",").length);
  data.forEach((line, row) => parseLine(line, sceneArray, row));
  return sceneArray;
}

function parseLine(line, sceneArray, row) {
  const height = 30;
  const Ypos = -10;
  const gridLine = line.split(",");
  Map2d.push([]);

  gridLine.forEach((cell, col) => {
    Map2d[row].push(parseInt(cell));
    if (parseInt(cell) == 0) {
      let wallCuboid = new MeshCuboid(cellWidth, height, cellLength);
      const Xpos = col * cellWidth + cellWidth / 2 - MapWidth / 2;
      const Zpos = row * cellLength + cellLength / 2 - MapLength / 2;
      const wallPosition = new Vector3(Xpos, Ypos, Zpos);
      let wallCell = new GameObject(wallPosition, wallCuboid);
      wallCuboid.setTexture(Textures["walter"]);
      wallCell.immovable = true;
      wallCell.rotation.x = Math.PI;
      sceneArray.push(wallCell);
    }
  });
}
