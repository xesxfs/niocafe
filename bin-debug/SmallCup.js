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
var SmallCup = (function (_super) {
    __extends(SmallCup, _super);
    function SmallCup() {
        return _super.call(this) || this;
    }
    SmallCup.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    SmallCup.prototype.init = function () {
        this.bwhater.mask = this.bmask;
        this.bfullwhater.mask = this.bcupingmk;
        this.swhater.mask = this.smask;
        this.sfullwhater.mask = this.scupingmk;
        this.statusShow = [[], []];
        this.cupMask = [[], []];
        this.whaters = [this.swhater, this.bwhater];
        this.fwhaters = [this.sfullwhater, this.bfullwhater];
        this.cupMask[CupType.Small] = [this.scupingmk, this.smask];
        this.cupMask[CupType.Big] = [this.bcupingmk, this.bmask];
        this.statusShow[CupType.Small] = [this.sfree, this.scuping, this.sfull];
        this.statusShow[CupType.Big] = [this.bfree, this.bcuping, this.bfull];
        this.setType(this.cupType);
        this.setStatus(this.cupStatus);
    };
    SmallCup.prototype.startWhater = function () {
        egret.Tween.removeTweens(this.whaters[this.cupType]);
        egret.Tween.get(this.whaters[this.cupType]).to({ height: 120 }, 5000).call(this.startFullWhater, this);
    };
    SmallCup.prototype.startFullWhater = function () {
        this.setStatus(CupStatus.Fulling);
        this.machine.changeStatus(MachineStatus.Package);
        egret.Tween.removeTweens(this.fwhaters[this.cupType]);
        egret.Tween.get(this.fwhaters[this.cupType]).to({ height: 60 }, 2000).call(this.onFaild, this);
    };
    SmallCup.prototype.stop = function () {
        egret.Tween.removeTweens(this.fwhaters[this.cupType]);
        egret.Tween.removeTweens(this.whaters[this.cupType]);
        for (var i = 0; i < this.whaters.length; i++) {
            this.whaters[i].height = 0;
        }
        for (var i = 0; i < this.fwhaters.length; i++) {
            this.fwhaters[i].height = 0;
        }
    };
    SmallCup.prototype.onFaild = function () {
        this.setStatus(CupStatus.Fulled);
        this.machine.changeStatus(MachineStatus.Failed);
    };
    SmallCup.prototype.switch2Big = function () {
        this.bcup.visible = true;
        this.scup.visible = false;
    };
    SmallCup.prototype.switch2Small = function () {
        this.bcup.visible = false;
        this.scup.visible = true;
    };
    SmallCup.prototype.setStatus = function (status) {
        _super.prototype.setStatus.call(this, status);
        if (status == CupStatus.Fulling || status == CupStatus.Fulled)
            return;
        var statusList = this.statusShow[this.cupType];
        for (var i = 0; i < statusList.length - 1; i++) {
            statusList[i].visible = false;
            if (i == status) {
                statusList[i].visible = true;
            }
        }
    };
    SmallCup.prototype.getStatus = function () {
        return this.cupStatus;
    };
    SmallCup.prototype.setType = function (cupType) {
        _super.prototype.setType.call(this, cupType);
        if (this.cupType == CupType.Big) {
            this.switch2Big();
        }
        else {
            this.switch2Small();
        }
    };
    SmallCup.prototype.getType = function () {
        return this.cupType;
    };
    SmallCup.prototype.showMask = function (isShow) {
        if (isShow === void 0) { isShow = true; }
        for (var i = 0; i < this.cupMask[this.cupType].length; i++) {
            this.cupMask[this.cupType][i].visible = isShow;
        }
    };
    SmallCup.prototype.addFood = function (foodsType) {
        if (this.foods.length > 2) {
            return false;
        }
        this.foods.push(foodsType);
        // let food = this.createFood(foodsType);
        if (this.foods.length >= 2) {
            this.setType(CupType.Big);
            this.setStatus(this.getStatus());
        }
        return true;
    };
    SmallCup.prototype.delFood = function () {
        if (this.foods.length > 0) {
            this.foods = [];
        }
        this.setType(CupType.Small);
    };
    SmallCup.prototype.createFood = function (foodsType) {
        var foodImgSrc = Bottle.FoodResource[FoodType[foodsType]];
        var img = new eui.Image(foodImgSrc);
        return img;
    };
    SmallCup.prototype.reset = function () {
        this.stop();
        this.setStatus(CupStatus.Free);
        this.setType(CupType.Small);
    };
    return SmallCup;
}(BaseCup));
__reflect(SmallCup.prototype, "SmallCup");
//# sourceMappingURL=SmallCup.js.map