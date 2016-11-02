class Grid {
//声明构造
    private startPnode:Pnode;//开始节点 
    private endPnode:Pnode;//目标节点
    private nodes:Pnode[][];//节点数组
    private numCols:number;//格子列数
    private numRows:number;//格子行数
    private gridX:number;//格子像素宽
    private gridY:number;//格子像素高

    public constructor(numCols:number,numRows:number,gX:number,gY:number) {
        this.gridX = gX;
        this.gridY = gY;
        this.numCols = numCols;
	    this.numRows = numRows;
	    this.nodes = new Array();
	    for(var i = 0;i < this.numCols;i++) {
	        this.nodes[i] = new Array();
	        for(var j = 0;j < this.numRows;j++){
	            this.nodes[i][j] = new Pnode(i,j);            
	        }
	    } 
    }//构造网格

//其他函数
    public getGridX():number {
        return this.gridX;
    }//获得格子宽

    public getGridY():number {
        return this.gridY;
    }//获得格子高

    public getPnode(x:number,y:number):Pnode{
	    return this.nodes[x][y];
    }//获得网格中某个格子   

    public getEndPnode():Pnode {
        return this.endPnode;
    }//获得终点

    public getStartPnode():Pnode {
        return this.startPnode;
    }//获得起点

    public getNumCols():number {
        return this.numCols;
    }//获得网格列数

    public getNumRows():number {
        return this.numRows;
    }//获得网格行数

    public setEndPnode(x:number,y:number):void {
	    this.endPnode = this.nodes[x][y];
    }//设置终点

    public setStartPnode(x:number,y:number):void {
	    this.startPnode = this.nodes[x][y];
    }//设置起点

    public setWalkable(x:number,y:number,value:Boolean):void {
        this.nodes[x][y].walkable = value;
    }//设置障碍
}