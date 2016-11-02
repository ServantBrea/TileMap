var Grid = (function () {
    function Grid(numCols, numRows, gX, gY) {
        this.gridX = gX;
        this.gridY = gY;
        this.numCols = numCols;
        this.numRows = numRows;
        this.nodes = new Array();
        for (var i = 0; i < this.numCols; i++) {
            this.nodes[i] = new Array();
            for (var j = 0; j < this.numRows; j++) {
                this.nodes[i][j] = new Pnode(i, j);
            }
        }
    } //构造网格
    var d = __define,c=Grid,p=c.prototype;
    //其他函数
    p.getGridX = function () {
        return this.gridX;
    }; //获得格子宽
    p.getGridY = function () {
        return this.gridY;
    }; //获得格子高
    p.getPnode = function (x, y) {
        return this.nodes[x][y];
    }; //获得网格中某个格子   
    p.getEndPnode = function () {
        return this.endPnode;
    }; //获得终点
    p.getStartPnode = function () {
        return this.startPnode;
    }; //获得起点
    p.getNumCols = function () {
        return this.numCols;
    }; //获得网格列数
    p.getNumRows = function () {
        return this.numRows;
    }; //获得网格行数
    p.setEndPnode = function (x, y) {
        this.endPnode = this.nodes[x][y];
    }; //设置终点
    p.setStartPnode = function (x, y) {
        this.startPnode = this.nodes[x][y];
    }; //设置起点
    p.setWalkable = function (x, y, value) {
        this.nodes[x][y].walkable = value;
    }; //设置障碍
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map