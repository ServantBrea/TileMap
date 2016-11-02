class AStar extends egret.Sprite {
//声明构造	
	private  openList:Pnode[];//开放列表
	private  closedList:Pnode[];//封闭列表
	private  grid:Grid;//所要计算的网格
	private  endPNode:Pnode;//终点
	private  startPNode:Pnode;//起点
	private  path:Pnode[];//最终的路径节点
	private  straightCost = 1; //直线代价        
	private  diagCost = Math.SQRT2; //对角线代价
	private gridX:number;//格子宽
    private gridY:number;//格子高     
	  
	public constructor() {
	    super();
	}//构造函数	
	  
	public findPath(grid:Grid):Boolean {
	    this.grid = grid;
		this.gridX = this.grid.getGridX();
		this.gridY = this.grid.getGridY();
	    this.openList  = new Array();
	    this.closedList = new Array();
	    this.startPNode = this.grid.getStartPnode();
	    this.endPNode = this.grid.getEndPnode();	
	    this.startPNode.G = 0;
	    this.startPNode.H = this.manhattan(this.startPNode);
	    this.startPNode.F = this.startPNode.G + this.startPNode.H;
	    return this.searchPath();
	}//对指定的网络寻找路径
	          
//A星算法	
	public searchPath():Boolean {
	    var t = 1;
	    var node:Pnode = this.startPNode;
	    //如果当前节点不是终点
	    while(node != this.endPNode) {
	        //找出相邻节点的x,y范围
	        var startX = Math.max(0, node.x - 1);
	        var endX = Math.min(this.grid.getNumCols() - 1, node.x + 1);
	        var startY = Math.max(0, node.y - 1);
	        var endY = Math.min(this.grid.getNumRows() - 1, node.y + 1);                       
            //循环处理所有相邻节点
	        for(var i = startX; i <= endX; i++) {
	            for(var j = startY; j <= endY; j++) {
	                var test = this.grid.getPnode(i, j);                     
	                //如果是当前节点，或者是不可通过的，则跳过
	                if(test == node || !test.walkable) {
	                    continue;
	                }
	                          
	                var cost = this.straightCost;                      
	                //如果是对象线，则使用对角代价
	                if(!((node.x == test.x) || (node.y == test.y))) {
	                    //continue;
						cost = this.diagCost;
	                }                       
	                          
	                //计算test节点的总代价                      
	                var g = node.G + cost * test.costMultipier;
	                var h = this.manhattan(test);                      
	                var f = g + h;                 
	                          	                          
	                //如果该点在open或close列表中
	                if(this.isOpen(test) || this.isClosed(test)) {
	                    //如果本次计算的代价更小，则以本次计算为准
	                    if(f < test.F) {                              
	                        test.F = f;
	                        test.G = g;
	                        test.H = h;
							//重新指定该点的父节点为本轮计算中心点
	                        test.parent = node;
	                    }
	                }
	                else {
						//如果还不在open列表中，则除了更新代价以及设置父节点，还要加入open数组
	                    test.F = f;
	                    test.G = g;
	                    test.H = h;
	                    test.parent = node;
	                    this.openList.push(test);
	                }
                }
	        }
			//把处理过的本轮中心节点加入close节点               
	        this.closedList.push(node);               
			//按总代价从小到大排序
			this.sortStoB(this.openList);
			//从open数组中删除代价最小的结节，同时把该节点赋值为node，做为下次的中心点
	        node = this.openList.shift() as Pnode;
            t++;
	    }
	    //循环结束后，构建路径		
	    this.buildPath();
	    return true;
	}//计算周围节点代价的关键处理函数

//其他函数 
    public getPath():Pnode[] {
	    return this.path;
	}//获得路径

	private sortStoB(array:Pnode[]):void {
		var temp:Pnode;
		var l = array.length;
		for(var i = 0;i < l-1;i++){
		    for(var j = 0;j < l-1;j++){
                if(array[j].F > array[j+1].F) {
				    temp = array[j];
				    array[j] = array[j+1];
				    array[j+1] = temp; 
			    }
		    }
		}
	}//给数组排序：小到大
     	
	private isOpen(node:Pnode):Boolean {
	    for(var i = 0; i < this.openList.length; i++) {
	        if(this.openList[i] == node) {
                return true;
	        }
	    }
	    return false;
	}//判断节点是否开放列表
	          
	private isClosed(node:Pnode):Boolean {
	    for(var i = 0; i < this.closedList.length; i++) {
	        if(this.closedList[i] == node) {
                return true;
			}
	    }
        return false;
    }//判断节点是否封闭列表	  
	
	private buildPath():void {
	    this.path = new Array();	            
		var node = this.endPNode;
	    this.path.push(node);
	    while(node != this.startPNode) {
	        node = node.parent;
	        this.path.unshift(node);
	    }
		this.outPath();
	}//根据父节点指向，从终点反向连接到起点

	private outPath():void {	
		console.log("开始节点：" + this.startPNode.x + "-" + this.startPNode.y);
		console.log("目标节点：" + this.endPNode.x + "-" + this.endPNode.y);
		console.log("以下是这次路径节点");
		for(var i = 0;i < this.path.length;i++) {
			console.log(this.path[i].x + "-" + this.path[i].y + "/" + this.path[i].walkable + "\n");
		}
	}//输出结果路径
	  	
	private manhattan(node:Pnode):number{
	    return Math.abs(node.x - this.endPNode.x) * this.straightCost + Math.abs(node.y - this.endPNode.y) * this.straightCost;
	}//曼哈顿估价法

//部分调试函数//未用
	/*	
	public getvisited():_Node[] {
	    return this._closed.concat(this._open);
	}//返回所有被计算过的节点(辅助函数)
	          	
	public getopenArray():_Node[] {
	    return this._open;
	}//返回open数组

	public getclosedArray():_Node[] {
	    return this._closed;
	}//返回close数组
    */

//其他估价法//未用	
	/*  
	//几何估价法
	private euclidian(node:_Node):number {
	    var dx:number = node.x - this._end_Node.x;
	    var dy:number = node.y - this._end_Node.y;
	    return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
	}
	  
	//对角线估价法
	private diagonal(node:_Node):number {
	    var dx:number = Math.abs(node.x - this._end_Node.x);
	    var dy:number = Math.abs(node.y - this._end_Node.y);
	    var diag:number = Math.min(dx, dy);
	    var straight:number = dx + dy;
	     return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
	}
	*/  	
}