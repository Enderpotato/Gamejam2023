import Mesh from "./shapes/Mesh.js";
import MeshCube from "./shapes/TestShapes/MeshCube.js";
import MeshCuboid from "./shapes/TestShapes/MeshCuboid.js";
import Vector3 from "./structs/Vector3.js";
import GameObject from "./GameObject.js";
import Scene from "./Scene.js";
import { Textures } from "./preload.js";
import Light from "./graphics/Light.js";
import Player from "./Player.js";
import Material from "./graphics/Material.js";
import { loadMap } from "./map.js";

export default class Steve{
    constructor(){
        this.position = new Vector3(0, 0, 20);
        this.mesh = new Mesh().createFromObj("./assets/testObjs/steve.obj");
        this.gObject = new GameObject(this.position, this.mesh);
    }

    get_position(){
        return this.position
    }

    update(player_position, player_velocity){

        this.position = player_position;
        this.gObject = new GameObject(this.position, this.mesh);
    }
}