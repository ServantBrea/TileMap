class Pnode {
//声明构造	
	public x:number;//格子x坐标
	public y:number;//格子y坐标
	public F:number;
	public G:number;
	public H:number;
	public walkable:Boolean = true;
	public parent:Pnode;//父节点
	public costMultipier:number = 1;//消耗

	public constructor(x:number,y:number) {
		this.x = x;
		this.y = y;
	}//构造函数
}