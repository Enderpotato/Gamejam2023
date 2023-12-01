export default class Map{
    constructor(){ //map_start x and y will recieve the starting points of the topleft of the map
        //player starts in the middle
        this.map = [[0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0]];
    }

    draw(map_start_x, map_start_y,map_width, map_height){
        //player starts in the middle
        this.map_start_x = map_start_x;
        this.map_start_y = map_start_y;
        this.map_width = map_width;
        this.map_height = map_height;
        this.w = 8;
        this.h = 8;
        this.block_w = map_width/this.w;
        this.block_h = map_height/this.h
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


    
}