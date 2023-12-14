import TextureBuffer from "./graphics/Texture.js";
import { loadMap } from "./map.js";
import GameObject from "./gameObjects/GameObject.js";
import Player from "./gameObjects/Player.js";
import Mesh from "./shapes/Mesh.js";
import Scene from "./Scene.js";
import Vector3 from "./structs/Vector3.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";

export const Textures = new TextureBuffer();
export let bestShader;

let steveMesh;
export let ghostMesh;
export let trophyMesh;
export let player;
export let scene;

function loadErrorCallback(err) {
  console.log("error loading image");
}

export default async function preloadAssets() {
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

  bestShader = loadShader("./shader/vertex.vert", "./shader/fragment.frag");

  steveMesh = Mesh.createFromObj("./assets/game3dModels/steve.obj");
  ghostMesh = Mesh.createFromObj("./assets/game3dModels/ghost.obj");
  trophyMesh = Mesh.createFromObj("./assets/game3dModels/trophy.obj");

  const cube2 = new MeshCuboid(300, 40, 300);

  steveMesh.setTexture(Textures["steve"]);
  ghostMesh.setTexture(Textures["ghost"]);
  trophyMesh.setTexture(Textures["trophy"]);
  cube2.setTexture(Textures["bricks"]);

  player = new Player();
  const gObject6 = new GameObject(new Vector3(0, 25, 0), cube2);
  gObject6.immovable = true;

  scene = new Scene([gObject6, player]);

  await loadMap("./assets/maps/gamejam_map1.csv", scene);
}
