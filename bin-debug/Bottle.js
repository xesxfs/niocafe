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
var Bottle = (function (_super) {
    __extends(Bottle, _super);
    function Bottle() {
        var _this = _super.call(this) || this;
        _this.foodType = FoodType.Nut;
        return _this;
    }
    Bottle.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Bottle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    Bottle.prototype.init = function () {
        this.setFoodType(this.foodType);
    };
    Bottle.prototype.setFoodType = function (ftype) {
        this.foodType = ftype;
        this.foodImg.source = Bottle.FoodResource[FoodType[ftype]];
    };
    Bottle.prototype.getFoodType = function () {
        return this.foodType;
    };
    Bottle.FoodResource = {
        Brioche: "brioche_png",
        Chestnut: "chestnut_png",
        Fragrans: "fragrans_png",
        Nut: "nut_png",
        Sugar: "sugar_png",
    };
    return Bottle;
}(BaseUI));
__reflect(Bottle.prototype, "Bottle", ["eui.UIComponent", "egret.DisplayObject"]);
var FoodType;
(function (FoodType) {
    FoodType[FoodType["Brioche"] = 0] = "Brioche";
    FoodType[FoodType["Chestnut"] = 1] = "Chestnut";
    FoodType[FoodType["Fragrans"] = 2] = "Fragrans";
    FoodType[FoodType["Nut"] = 3] = "Nut";
    FoodType[FoodType["Sugar"] = 4] = "Sugar"; //糖
})(FoodType || (FoodType = {}));
//# sourceMappingURL=Bottle.js.map