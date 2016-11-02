class Getto extends egret.Event {
//构造自定义到达目标事件
    public static getTo:string = "Get";

	public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false) {
		super(type,bubbles,cancelable);
	}
}