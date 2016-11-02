var CharacterStand = (function (_super) {
    __extends(CharacterStand, _super);
    function CharacterStand() {
        _super.call(this);
        //构造声明    
        this.animate = new egret.DisplayObjectContainer();
        //状态改变    
        this.animationMode = 0;
        //设置动画
        this.frameRate = 200;
        this.ifLeftRight = 0;
        this.timeOnEnterFrame = 0;
        this.speed = 0.15; //像素每毫秒
        this.getMoveDown();
    }
    var d = __define,c=CharacterStand,p=c.prototype;
    p.setAnimationMode = function (n) {
        this.animationMode = n;
        switch (this.animationMode) {
            case 0:
                this.getMoveUp();
                break;
            case 1:
                this.getMoveDown();
                break;
            case 2:
                this.getMoveLeft();
                break;
            case 3:
                this.getMoveRight();
                break;
        }
    };
    p.getMoveUp = function () {
        var str = ["u1_png", "u2_png", "u3_png", "u4_png", "u5_png", "u6_png"];
        var up = this.createBitmapByName("u1_png");
        this.animate.removeChildren();
        this.animate.addChild(up);
        this.playAnimation(up, str, this.frameRate);
    }; //站右
    p.getMoveDown = function () {
        var str = ["d1_png", "d2_png", "d3_png", "d4_png", "d5_png", "d6_png"];
        var down = this.createBitmapByName("d1_png");
        this.animate.removeChildren();
        this.animate.addChild(down);
        this.playAnimation(down, str, this.frameRate);
    }; //站左
    p.getMoveRight = function () {
        var str = ["r1_png", "r2_png", "r3_png", "r4_png", "r5_png", "r6_png"];
        var right = this.createBitmapByName("r1_png");
        this.animate.removeChildren();
        this.animate.addChild(right);
        this.playAnimation(right, str, this.frameRate);
    }; //跑右
    p.getMoveLeft = function () {
        var str = ["l1_png", "l2_png", "l3_png", "l4_png", "l5_png", "l6_png"];
        var left = this.createBitmapByName("l1_png");
        this.animate.removeChildren();
        this.animate.addChild(left);
        this.playAnimation(left, str, this.frameRate);
    }; //跑左
    p.playAnimation = function (bit, s, t) {
        var i = 1;
        var change = function () {
            var tw = egret.Tween.get(bit);
            tw.wait(t);
            tw.call(function changetex() {
                bit.texture = RES.getRes(s[i]);
            }, this);
            i++;
            if (i == s.length) {
                i = 1;
            }
            tw.call(change);
        };
        change();
    }; //播放帧动画
    p.moveTo = function (x, y) {
        this.targetX = x;
        this.targetY = y;
        var lengthX = this.targetX - this.animate.x;
        var lengthY = this.targetY - this.animate.y;
        if (lengthX >= 0) {
            if (lengthX >= Math.abs(lengthY)) {
                this.setAnimationMode(3);
            }
            else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                }
                else {
                    this.setAnimationMode(0);
                }
            }
        }
        else {
            if (Math.abs(lengthX) >= Math.abs(lengthY)) {
                this.setAnimationMode(2);
            }
            else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                }
                else {
                    this.setAnimationMode(0);
                }
            }
        } //人物朝向判断
        var pathLength = 0;
        pathLength = Math.pow(lengthX * lengthX + lengthY * lengthY, 1 / 2);
        this.xMove = lengthX / pathLength;
        this.yMove = lengthY / pathLength; //帧位移量
        this.addEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        this.timeOnEnterFrame = egret.getTimer();
    }; //移动调用
    p.onMove = function (e) {
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        var getToTarget = new Getto(Getto.getTo);
        this.animate.x += this.speed * pass * this.xMove;
        this.animate.y += this.speed * pass * this.yMove;
        this.timeOnEnterFrame = egret.getTimer();
        if (this.animate.x - this.targetX < 3 && this.animate.x - this.targetX > -3 &&
            this.animate.y - this.targetY < 3 && this.animate.y - this.targetY > -3) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
            this.animate.dispatchEvent(getToTarget);
        } //!!!!!!!!!!!!!!!!该停止移动方法存在可能溢出问题，根本停不下来......
    }; //位移计算
    //读取图片
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    }; //读入位图文件
    return CharacterStand;
}(egret.DisplayObjectContainer));
egret.registerClass(CharacterStand,'CharacterStand');
//# sourceMappingURL=CharactorStand.js.map