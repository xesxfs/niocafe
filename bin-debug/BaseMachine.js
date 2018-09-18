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
var BaseMachine = (function (_super) {
    __extends(BaseMachine, _super);
    function BaseMachine() {
        var _this = _super.call(this) || this;
        _this.status = MachineStatus.Free;
        return _this;
    }
    BaseMachine.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseMachine.prototype.canAddFood = function () {
        return this.status == MachineStatus.Free || this.status == MachineStatus.CanInput;
    };
    BaseMachine.prototype.init = function () {
        this.showFulls = [this.sfull, this.bfull];
        this.showDels = [this.sdel, this.bdel];
        this.cup.machine = this;
        this.statusFlag = [this.notImg, this.notImg, this.inputImg, this.delImg, this.packageImg];
        this.foodsImg = [this.fd1, this.fd2];
        this.resetWhater();
        this.changeStatus(this.status);
    };
    BaseMachine.prototype.resetWhater = function () {
        this.leftwhater.height = 0;
        this.rightwhater.height = 0;
    };
    BaseMachine.prototype.changeStatus = function (status) {
        this.status = status;
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
    BaseMachine.prototype.startCafe = function () {
        this.changeStatus(MachineStatus.Inputing);
        this.cup.setStatus(CupStatus.Geting);
        egret.Tween.removeTweens(this.leftwhater);
        egret.Tween.removeTweens(this.rightwhater);
        egret.Tween.get(this.leftwhater).to({ height: this.whaterHeight }, 1000);
        egret.Tween.get(this.rightwhater).to({ height: this.whaterHeight }, 1000).call(this.onCafeComplete, this);
    };
    BaseMachine.prototype.onOperation = function (e) {
        switch (this.status) {
            case MachineStatus.CanInput:
                this.startCafe();
                break;
            case MachineStatus.Failed:
                this.changeStatus(MachineStatus.Free);
                this.delFood();
                this.cup.reset();
                this.showDel();
                break;
            case MachineStatus.Free:
                break;
            case MachineStatus.Inputing:
                break;
            case MachineStatus.Package:
                if (this.onPackageCafe(this.cup.foods)) {
                    this.showFull();
                }
                else {
                    this.showDel();
                }
                this.cup.stop();
                this.resetWhater();
                this.delFood();
                this.changeStatus(MachineStatus.Free);
                this.cup.reset();
                break;
        }
    };
    BaseMachine.prototype.onCafeComplete = function () {
        this.cup.startWhater();
    };
    BaseMachine.prototype.getStatus = function () {
        return this.status;
    };
    BaseMachine.prototype.addFood = function (food) {
        if (this.status == MachineStatus.Free || this.status == MachineStatus.CanInput) {
            if (this.cup.getFoodNum() >= 2)
                return;
            this.cup.addFood(food);
            var foodImgSrc = Bottle.FoodResource[FoodType[food]];
            this.foodsImg[this.cup.getFoodNum() - 1].source = foodImgSrc;
            this.changeStatus(MachineStatus.CanInput);
        }
    };
    BaseMachine.prototype.delFood = function () {
        this.cup.delFood();
        for (var i = 0; i < this.foodsImg.length; i++) {
            this.foodsImg[i].source = "";
        }
    };
    BaseMachine.prototype.showFull = function () {
        var _this = this;
        this.cup.visible = false;
        var img = this.showFulls[this.cup.getType()];
        img.visible = true;
        egret.Tween.get(img).wait(400).call(function () { img.visible = false; _this.cup.visible = true; });
    };
    BaseMachine.prototype.showDel = function () {
        var _this = this;
        var img = this.showDels[this.cup.getType()];
        img.visible = true;
        this.cup.visible = false;
        this.xxx.visible = true;
        egret.Tween.get(img).wait(400).call(function () { img.visible = false; _this.xxx.visible = false; _this.cup.visible = true; });
    };
    return BaseMachine;
}(BaseUI));
__reflect(BaseMachine.prototype, "BaseMachine", ["eui.UIComponent", "egret.DisplayObject"]);
var MachineStatus;
(function (MachineStatus) {
    MachineStatus[MachineStatus["Free"] = 0] = "Free";
    MachineStatus[MachineStatus["Inputing"] = 1] = "Inputing";
    MachineStatus[MachineStatus["CanInput"] = 2] = "CanInput";
    MachineStatus[MachineStatus["Failed"] = 3] = "Failed";
    MachineStatus[MachineStatus["Package"] = 4] = "Package";
})(MachineStatus || (MachineStatus = {}));
//# sourceMappingURL=BaseMachine.js.map