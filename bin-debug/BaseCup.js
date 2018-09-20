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
var BaseCup = (function (_super) {
    __extends(BaseCup, _super);
    function BaseCup() {
        var _this = _super.call(this) || this;
        _this.cupType = CupType.Small;
        _this.cupStatus = CupStatus.Free;
        _this.cafeTime = 7000;
        _this.cafeHeight = 120;
        _this.packageHeight = 100;
        _this.isSuccess = false;
        _this.foods = [];
        return _this;
    }
    BaseCup.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseCup.prototype.getFoodNum = function () {
        return this.foods.length;
    };
    BaseCup.prototype.init = function () {
        this.statusShow = [[], []];
        this.cupMask = [[], []];
        this.whaters = [this.swhater, this.bwhater];
        this.fwhaters = [this.sfullwhater, this.bfullwhater];
        this.cupMask[CupType.Small] = [this.scupingmk, this.smask];
        this.cupMask[CupType.Big] = [this.bcupingmk, this.bmask];
        this.statusShow[CupType.Small] = [this.sfree, this.scuping00, this.sfull];
        this.statusShow[CupType.Big] = [this.bfree, this.bcuping, this.bfull];
        this.setType(this.cupType);
        this.setStatus(this.cupStatus);
    };
    BaseCup.prototype.setMask = function () {
        this.bwhater.mask = this.bmask;
        this.bfullwhater.mask = this.bcupingmk;
        this.swhater.mask = this.smask;
        this.sfullwhater.mask = this.scupingmk;
    };
    BaseCup.prototype.startWhater = function () {
        egret.Tween.removeTweens(this.whaters[this.cupType]);
        egret.Tween.get(this.whaters[this.cupType]).to({ height: this.packageHeight }, this.cafeTime).call(this.onPackage, this)
            .to({ height: this.cafeHeight }, 4000).call(this.startFullWhater, this);
    };
    BaseCup.prototype.onPackage = function () {
        SoundManager.playEffect("onpackage_eff_mp3");
        this.setStatus(CupStatus.Fulling);
        this.machine.changeStatus(MachineStatus.Package);
    };
    BaseCup.prototype.startFullWhater = function () {
        egret.Tween.removeTweens(this.fwhaters[this.cupType]);
        this.onFaild();
        egret.Tween.get(this.fwhaters[this.cupType]).to({ height: 60 }, 2000);
    };
    BaseCup.prototype.stop = function () {
        egret.Tween.removeTweens(this.fwhaters[this.cupType]);
        egret.Tween.removeTweens(this.whaters[this.cupType]);
        for (var i = 0; i < this.whaters.length; i++) {
            this.whaters[i].height = 2;
        }
        for (var i = 0; i < this.fwhaters.length; i++) {
            this.fwhaters[i].height = 2;
        }
    };
    BaseCup.prototype.onFaild = function () {
        this.setStatus(CupStatus.Fulled);
        this.machine.changeStatus(MachineStatus.Failed);
    };
    BaseCup.prototype.switch2Big = function () {
        this.cafeTime = 10000;
        this.bcup.visible = true;
        this.scup.visible = false;
    };
    BaseCup.prototype.switch2Small = function () {
        this.cafeTime = 8000;
        this.bcup.visible = false;
        this.scup.visible = true;
    };
    BaseCup.prototype.setStatus = function (status) {
        this.cupStatus = status;
        // console.log("setStatus-:", status);
        if (status == CupStatus.Fulling || status == CupStatus.Fulled)
            return;
        var statusList = this.statusShow[this.cupType];
        for (var i = 0; i < statusList.length - 1; i++) {
            statusList[i].visible = false;
            if (i == status) {
                // console.log("setStatus:", i);
                // console.log(statusList[i] == this.scuping, this.scuping.visible);
                statusList[i].visible = true;
                // console.log(statusList[i] == this.scuping, this.scuping.visible);
            }
        }
        // console.log(this.scup.visible, this.scuping.visible);
    };
    BaseCup.prototype.getStatus = function () {
        return this.cupStatus;
    };
    BaseCup.prototype.setType = function (cupType) {
        this.cupType = cupType;
        if (this.cupType == CupType.Big) {
            this.switch2Big();
        }
        else {
            this.switch2Small();
        }
        this.setMask();
        this.setCafeHeight();
    };
    BaseCup.prototype.setCafeHeight = function () {
    };
    BaseCup.prototype.getType = function () {
        return this.cupType;
    };
    BaseCup.prototype.showMask = function (isShow) {
        if (isShow === void 0) { isShow = true; }
        for (var i = 0; i < this.cupMask[this.cupType].length; i++) {
            this.cupMask[this.cupType][i].visible = isShow;
        }
    };
    BaseCup.prototype.addFood = function (foodsType) {
        if (this.foods.length > 2) {
            return false;
        }
        this.foods.push(foodsType);
        App.useFoods.push(foodsType);
        if (this.foods.length >= 2) {
            this.setType(CupType.Big);
            this.setStatus(this.getStatus());
        }
        return true;
    };
    BaseCup.prototype.canAddFood = function (food) {
        if (this.foods.length == 1 && this.foods[0] != food) {
            return false;
        }
        return true;
    };
    BaseCup.prototype.delFood = function () {
        if (this.foods.length > 0) {
            this.foods = [];
        }
        this.setType(CupType.Small);
    };
    BaseCup.prototype.createFood = function (foodsType) {
        var foodImgSrc = Bottle.FoodResource[FoodType[foodsType]];
        var img = new eui.Image(foodImgSrc);
        return img;
    };
    BaseCup.prototype.reset = function () {
        this.stop();
        this.setStatus(CupStatus.Free);
        this.setType(CupType.Small);
    };
    return BaseCup;
}(eui.Component));
__reflect(BaseCup.prototype, "BaseCup", ["eui.UIComponent", "egret.DisplayObject"]);
var CupType;
(function (CupType) {
    CupType[CupType["Small"] = 0] = "Small";
    CupType[CupType["Big"] = 1] = "Big";
})(CupType || (CupType = {}));
var CupStatus;
(function (CupStatus) {
    CupStatus[CupStatus["Free"] = 0] = "Free";
    CupStatus[CupStatus["Geting"] = 1] = "Geting";
    CupStatus[CupStatus["Fulled"] = 2] = "Fulled";
    CupStatus[CupStatus["Fulling"] = 3] = "Fulling";
})(CupStatus || (CupStatus = {}));
window["BaseCup"] = BaseCup;
//# sourceMappingURL=BaseCup.js.map