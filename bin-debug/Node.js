var Pnode = (function () {
    function Pnode(x, y) {
        this.walkable = true;
        this.costMultipier = 1; //消耗
        this.x = x;
        this.y = y;
    } //构造函数
    var d = __define,c=Pnode,p=c.prototype;
    return Pnode;
}());
egret.registerClass(Pnode,'Pnode');
//# sourceMappingURL=Node.js.map