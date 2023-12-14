import TextureBuffer from "./graphics/Texture.js";
import { loadMap } from "./map.js";
import GameObject from "./gameObjects/GameObject.js";
import Player from "./gameObjects/Player.js";
import Mesh from "./shapes/Mesh.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import Trophy from "./gameObjects/Trophy.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";

export const Textures = new TextureBuffer();
export let bestShader;

let steveMesh;
export let ghostMesh;
export let trophyMesh;
export let player;
export const scene = new Scene([]);
export const floorMesh = new MeshCuboid(300, 40, 300);

function loadErrorCallback(err) {
  console.log("error loading image");
}

function loadTextures() {
  Textures.addTexture(loadImage("/assets/textures/bricks.png"), "bricks");
  Textures.addTexture(loadImage("/assets/textures/sand.png"), "sand");
  Textures.addTexture(loadImage("assets/textures/white.png"), "white");
  Textures.addTexture(
    loadImage("assets/textures/diamond_block.png"),
    "diamond"
  );
  Textures.addTexture(loadImage("assets/textures/steve.png"), "steve");
  Textures.addTexture(loadImage("assets/textures/ghost.png"), "ghost");
  Textures.addTexture(loadImage("assets/textures/walter.png"), "walter");
  Textures.addTexture(loadImage("assets/textures/trophy.png"), "trophy");
}

export default async function preloadAssets() {
  loadTextures();

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");

  steveMesh = Mesh.createFromObj("./assets/game3dModels/steve.obj");
  ghostMesh = Mesh.createFromObj("./assets/game3dModels/ghost.obj");
  trophyMesh = Mesh.createFromObj("./assets/game3dModels/trophy.obj");

  steveMesh.setTexture(Textures["steve"]);
  ghostMesh.setTexture(Textures["ghost"]);
  trophyMesh.setTexture(Textures["trophy"]);
  floorMesh.setTexture(Textures["bricks"]);

  player = new Player();
  const gObject6 = new GameObject(new Vector3(0, 25, 0), floorMesh);
  gObject6.immovable = true;
  const trophy1 = new Trophy(new Vector3(20, -25, 0), trophyMesh);
  const trophy2 = new Trophy(new Vector3(30, -25, 0), trophyMesh);

  scene.addObjects([gObject6, player]);

  await loadMap("./assets/maps/test_map.csv", scene);
  console.log(scene.objects);
}
