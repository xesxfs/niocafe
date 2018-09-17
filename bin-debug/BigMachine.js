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
var BigMachine = (function (_super) {
    __extends(BigMachine, _super);
    function BigMachine() {
        var _this = _super.call(this) || this;
        _this.whaterHeight = 190;
        return _this;
    }
    BigMachine.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operationGroup.addEventListener("touchTap", this.onOperation, this);
        this.init();
    };
    BigMachine.prototype.init = function () {
        this.cup.machine = this;
        this.statusFlag = [this.notImg, this.notImg, this.inputImg, this.delImg, this.packageImg];
        this.foodsImg = [this.fd1, this.fd2];
        this.resetWhater();
        this.changeStatus(this.status);
    };
    BigMachine.prototype.resetWhater = function () {
        this.leftwhater.height = 0;
        this.rightwhater.height = 0;
    };
    BigMachine.prototype.changeStatus = function (status) {
        _super.prototype.changeStatus.call(this, status);
        /****空闲或者加注中 */
        if (status == MachineStatus.Free || status == MachineStatus.Inputing) {
            this.statusFlag[status].visible = true;
        }
        if ((status != MachineStatus.Free) && (status != MachineStatus.Inputing)) {
            this.statusFlag[status].visible = false;
        }
        for (var i = 2; i < this.statusFlag.length; i++) {
            if (i == status) {
                this.statusFlag[i].visible = true;
            }
            else {
                this.statusFlag[i].visible = false;
            }
        }
        if (status == MachineStatus.Failed) {
            this.resetWhater();
        }
    };
    BigMachine.prototype.startCafe = function () {
        this.changeStatus(MachineStatus.Inputing);
        this.cup.setStatus(CupStatus.Geting);
        egret.Tween.removeTweens(this.leftwhater);
        egret.Tween.removeTweens(this.rightwhater);
        egret.Tween.get(this.leftwhater).to({ height: this.whaterHeight }, 1000);
        egret.Tween.get(this.rightwhater).to({ height: this.whaterHeight }, 1000).call(this.onCafeComplete, this);
    };
    BigMachine.prototype.onOperation = function (e) {
        switch (this.status) {
            case MachineStatus.CanInput:
                this.startCafe();
                break;
            case MachineStatus.Failed:
                this.changeStatus(MachineStatus.Free);
                this.delFood();
                this.cup.reset();
                break;
            case MachineStatus.Free:
                break;
            case MachineStatus.Inputing:
                break;
            case MachineStatus.Package:
                if (this.onPackageCafe(this.cup.foods)) {
                    this.changeStatus(MachineStatus.Free);
                    this.cup.stop();
                    this.resetWhater();
                    this.delFood();
                }
                break;
        }
    };
    BigMachine.prototype.onCafeComplete = function () {
        this.cup.startWhater();
    };
    BigMachine.prototype.getStatus = function () {
        return this.status;
    };
    BigMachine.prototype.addFood = function (food) {
        if (this.status == MachineStatus.Free || this.status == MachineStatus.CanInput) {
            if (this.cup.getFoodNum() >= 2)
                return;
            this.cup.addFood(food);
            var foodImgSrc = Bottle.FoodResource[FoodType[food]];
            this.foodsImg[this.cup.getFoodNum() - 1].source = foodImgSrc;
            this.changeStatus(MachineStatus.CanInput);
        }
    };
    BigMachine.prototype.delFood = function () {
        this.cup.delFood();
        for (var i = 0; i < this.foodsImg.length; i++) {
            this.foodsImg[i].source = "";
        }
    };
    return BigMachine;
}(BaseMachine));
__reflect(BigMachine.prototype, "BigMachine");
//# sourceMappingURL=BigMachine.js.map