class CreateMap extends egret.DisplayObjectContainer {
//声明    
    private mapGrids:Grid;//地图格子化
    private gridX = 58;//格子宽
    private gridY = 81;//格子高
    private cols = 11;//格子列数
    private rows = 14;//格子行数
    private aStar:AStar = new AStar();//A星算法类

//地形配置文件
    private terrains = [
		{x:0,y:0,tex:0},
        {x:1,y:0,tex:0},
        {x:2,y:0,tex:0},
        {x:3,y:0,tex:0},
        {x:4,y:0,tex:0},
        {x:5,y:0,tex:0},
        {x:6,y:0,tex:0},
        {x:7,y:0,tex:0},
        {x:8,y:0,tex:0},
        {x:9,y:0,tex:0},
        {x:10,y:0,tex:0},
        {x:0,y:13,tex:0},
        {x:1,y:13,tex:0},
        {x:2,y:13,tex:0},
        {x:3,y:13,tex:0},
        {x:4,y:13,tex:0},
        {x:5,y:13,tex:0},
        {x:6,y:13,tex:0},
        {x:7,y:13,tex:0},
        {x:8,y:13,tex:0},
        {x:9,y:13,tex:0},
        {x:10,y:13,tex:0},
        {x:0,y:1,tex:0},
        {x:0,y:2,tex:0},
        {x:0,y:3,tex:0},
        {x:0,y:4,tex:0},
        {x:0,y:5,tex:0},
        {x:0,y:6,tex:0},
        {x:0,y:7,tex:0},
        {x:0,y:8,tex:0},
        {x:0,y:9,tex:0},
        {x:0,y:10,tex:0},
        {x:0,y:11,tex:0},
        {x:0,y:12,tex:0},
        {x:10,y:1,tex:0},
        {x:10,y:2,tex:0},
        {x:10,y:3,tex:0},
        {x:10,y:4,tex:0},
        {x:10,y:5,tex:0},
        {x:10,y:6,tex:0},
        {x:10,y:7,tex:0},
        {x:10,y:8,tex:0},
        {x:10,y:9,tex:0},
        {x:10,y:10,tex:0},
        {x:10,y:11,tex:0},
        {x:10,y:12,tex:0},

        {x:3,y:3,tex:1},
        {x:3,y:4,tex:1},
        {x:3,y:5,tex:1},
        {x:3,y:6,tex:1},
        {x:4,y:3,tex:1},
        {x:5,y:3,tex:1},
        {x:6,y:3,tex:1},
        {x:7,y:3,tex:1},
        {x:7,y:4,tex:1},
        {x:7,y:5,tex:1},
        {x:7,y:6,tex:1},

        {x:4,y:9,tex:2},
        {x:5,y:9,tex:2},
        {x:6,y:9,tex:2},
        {x:4,y:10,tex:2},
        {x:5,y:10,tex:2},
        {x:6,y:10,tex:2},
	];

//构造    
    public constructor() {
        super();
        this.createMap();
    }//构造函数

    private createMap():void {
        var map = this.createBitmapByName("ground_jpg");
        this.addChild(map);
        this.mapGrids = new Grid(this.cols,this.rows,this.gridX,this.gridY); 
        this.createTerrain();   
    }//加载地图，格子化

    private createTerrain():void {     
	    for(var i = 0 ;i < this.terrains.length;i++) {
            this.mapGrids.setWalkable(this.terrains[i].x,this.terrains[i].y,false);
            if(this.terrains[i].tex == 0) {
                var obstacles = this.createBitmapByName("grass_png");
                this.addChild(obstacles);
            }
            if(this.terrains[i].tex == 1) {
                var obstacles = this.createBitmapByName("wall_png");
                this.addChild(obstacles);
            }
            if(this.terrains[i].tex == 2) {
                var obstacles = this.createBitmapByName("water_png");
                this.addChild(obstacles);
            }
            obstacles.x = this.terrains[i].x * this.gridX;
            obstacles.y = this.terrains[i].y * this.gridY;
        }
	}

//计算路径
    public countPath(x1:number,y1:number,x2:number,y2:number):Pnode[] {
        this.mapGrids.setStartPnode(this.checkPointX(x1),this.checkPointY(y1));
        this.mapGrids.setEndPnode(this.checkPointX(x2),this.checkPointY(y2));
        this.aStar.findPath(this.mapGrids);
        return this.aStar.getPath();
    }//计算路径并返回结果路径

//其他函数    
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }//读入位图

    private checkPointX(x:number):number {
        return Math.floor(x / this.gridX);
    }//X像素坐标改为格子坐标

    private checkPointY(y:number):number {
        return Math.floor(y / this.gridY);
    }//Y像素坐标改为格子坐标

    public getGridX():number {
        return this.gridX;
    }//获得格子像素宽

    public getGridY():number {
        return this.gridY;
    }//获得格子像素高
}