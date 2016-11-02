var Getto = (function (_super) {
    __extends(Getto, _super);
    function Getto(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=Getto,p=c.prototype;
    //构造自定义到达目标事件
    Getto.getTo = "Get";
    return Getto;
}(egret.Event));
egret.registerClass(Getto,'Getto');
//# sourceMappingURL=Getto.js.map