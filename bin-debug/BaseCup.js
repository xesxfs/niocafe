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
        _this.foods = [];
        return _this;
    }
    BaseCup.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseCup.prototype.setStatus = function (status) {
        this.cupStatus = status;
    };
    BaseCup.prototype.setType = function (cupType) {
        this.cupType = cupType;
    };
    BaseCup.prototype.getFoodNum = function () {
        return this.foods.length;
    };
    return BaseCup;
}(BaseUI));
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
//# sourceMappingURL=BaseCup.js.map