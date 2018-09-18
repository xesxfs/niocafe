var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.selectCafePage = 1;
        _this.second = 0;
        _this.skinName = "GameSkin";
        return _this;
    }
    Game.prototype.childrenCreated = function () {
        this.leftBtn.addEventListener("touchTap", this.onLeftBtn, this);
        this.rightBtn.addEventListener("touchTap", this.onRightBtn, this);
        this.orderUI = [this.orderUI1, this.orderUI2];
        this.machines = [[this.sm1, this.sm2, this.sm3, this.sm4, this.sm5, this.sm6], [this.bigMachine], [this.sm7, this.sm8, this.sm9, this.sm10, this.sm11, this.sm12]];
        this.bottles = [this.bt1, this.bt2, this.bt3, this.bt4, this.bt5];
        this.initBottle();
        this.initMachines();
        // egret.Tween.get(this).wait(3000).call(this.startOrder, this);
        this.beginCD();
    };
    Game.prototype.initBottle = function () {
        for (var i = 0; i < this.bottles.length; i++) {
            this.bottles[i].setFoodType(i);
            this.bottles[i].addEventListener("touchTap", this.onBottle, this);
        }
    };
    Game.prototype.initMachines = function () {
        for (var i = 0; i < this.machines.length; i++) {
            var machinesi = this.machines[i];
            for (var j = 0; j < machinesi.length; j++) {
                var machine = machinesi[j];
                machine.onPackageCafe = this.onPackageCafe.bind(this);
            }
        }
    };
    Game.prototype.beginCD = function () {
        var _this = this;
        egret.Tween.get(this.cdGroup).to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.circInOut).call(function () { _this.cdGroup.visible = false; });
        egret.Tween.get(this.cdGroup0).wait(1000).to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.circInOut).call(function () { _this.cdGroup0.visible = false; });
        egret.Tween.get(this.cdGroup1).wait(2000).call(this.startOrder, this).to({ scaleX: 1, scaleY: 1 }, 900, egret.Ease.circInOut).call(function () { _this.cdGroup1.visible = false; });
    };
    Game.prototype.onLeftBtn = function (e) {
        egret.Tween.removeTweens(this.midGroup);
        var offx;
        if (this.midGroup.x == 0) {
            offx = 750;
            this.leftBtn.visible = false;
            this.selectCafePage = 0;
        }
        else {
            offx = 0;
            this.rightBtn.visible = true;
            this.leftBtn.visible = true;
            this.selectCafePage = 1;
        }
        egret.Tween.get(this.midGroup).to({ x: offx }, 300);
    };
    Game.prototype.onRightBtn = function (e) {
        egret.Tween.removeTweens(this.midGroup);
        var offx;
        if (this.midGroup.x == 0) {
            offx = -750;
            this.rightBtn.visible = false;
            this.selectCafePage = 2;
        }
        else {
            offx = 0;
            this.rightBtn.visible = true;
            this.leftBtn.visible = true;
            this.selectCafePage = 1;
        }
        egret.Tween.get(this.midGroup).to({ x: offx }, 300);
    };
    Game.prototype.onBottle = function (e) {
        var selMachine;
        var selMachineGroup = this.machines[this.selectCafePage];
        for (var i = 0; i < selMachineGroup.length; i++) {
            if (selMachineGroup[i].canAddFood()) {
                selMachine = selMachineGroup[i];
                break;
            }
        }
        if (selMachine) {
            selMachine.addFood(e.currentTarget.getFoodType());
        }
    };
    Game.prototype.onPackageCafe = function (foods) {
        var result = false;
        for (var i = 0; i < this.orderUI.length; i++) {
            var order = this.orderUI[i].checkOrderByFoods(foods);
            if (order) {
                result = true;
                this.orderUI[i].delOrder(order);
                this.addScore();
                break;
            }
        }
        return result;
    };
    Game.prototype.addScore = function (score) {
        if (score === void 0) { score = 1000; }
        App.score += score;
        this.scoreLab.text = App.score.toString();
    };
    Game.prototype.startOrder = function () {
        this.intKet = egret.setInterval(this.timeTick, this, 1000);
    };
    Game.prototype.timeTick = function () {
        this.createOrder();
        this.updateTime();
        this.second++;
        if (this.second > 120) {
            this.gameEnd();
            egret.clearInterval(this.intKet);
            this.intKet = null;
        }
    };
    Game.prototype.createOrder = function () {
        for (var i = 0; i < this.orderUI.length; i++) {
            var orderUI = this.orderUI[i];
            var order = orderUI.getEmptyOrder();
            if (order) {
                this.orderUI[i].generateOrder(order);
                break;
            }
        }
    };
    Game.prototype.updateTime = function () {
        var limeTime = 120 - this.second;
        var min = ~~(limeTime / 60);
        var second = limeTime % 60;
        var timeStr = "";
        if (min < 10) {
            timeStr += "0" + min;
        }
        else {
            timeStr += "" + min;
        }
        if (second < 10) {
            timeStr += ":" + "0" + second;
        }
        else {
            timeStr += ":" + second;
        }
        this.timeLab.text = timeStr;
    };
    Game.prototype.gameEnd = function () {
        egret.Tween.removeAllTweens();
        this.parent.addChild(new Result());
        this.parent.removeChild(this);
    };
    return Game;
}(BaseUI));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map