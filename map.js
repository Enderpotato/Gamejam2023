import Camera from "./Camera.js";
export default class Map{
    constructor(map_width, map_height, map_start_x, map_start_y){ 
        this.map = [[0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0]];
        this.map_width = map_width;
        this.map_height = map_height;
        this.map_start_x = map_start_x;
        this.map_start_y = map_start_y;
    }

    from_coords(pos){
        return [pos.z * this.map_width/width + this.map_start_x ,pos.x * this.map_height/height + this.map_start_y]
    }

    draw_map(){
        this.w = 8;
        this.h = 8;
        this.block_w = this.map_width/this.w;
        this.block_h = this.map_height/this.h
        this.middle = [Math.floor(this.w/2),Math.floor(this.h/2)]
        fill(255);
        rect(this.map_start_x, this.map_start_y, this.map_width, this.map_height);
        for (let i = 0; i<this.map.length;i++){
            for (let j = 0; j<this.map[0].length; j++){
                if (this.map[i][j] == 1){
                    fill(0, 0, 255);
                    rect(this.map_start_x + j * this.block_w,this.map_start_y + i * this.block_h, this.block_w, this.block_h)
                }
            }
        }
    }

    draw_obj(obj){
        let obj_on_map_coords = this.from_coords(obj.position, width, height);
        if (obj instanceof Camera){
            fill(255,0,0);
            circle(obj_on_map_coords[0], obj_on_map_coords[1], 10);
        }
    }
}