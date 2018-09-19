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
var FoodOrder = (function (_super) {
    __extends(FoodOrder, _super);
    function FoodOrder() {
        return _super.call(this) || this;
    }
    FoodOrder.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    FoodOrder.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FoodOrder.prototype.init = function () {
        this.hide();
        this.foods = [];
        this.one.visible = false;
        this.two.visible = false;
    };
    FoodOrder.prototype.show = function () {
        this.visible = true;
    };
    FoodOrder.prototype.hide = function () {
        this.visible = false;
    };
    FoodOrder.prototype.setFoods = function (foods) {
        if (!foods || foods.length <= 0)
            return;
        this.init();
        this.foods = foods;
        if (foods.length == 1) {
            this.one.visible = true;
            this.o1.source = Bottle.FoodResource[FoodType[foods[0]]];
        }
        else if (foods.length == 2) {
            this.two.visible = true;
            this.t1.source = Bottle.FoodResource[FoodType[foods[0]]];
            this.t2.source = Bottle.FoodResource[FoodType[foods[1]]];
        }
        this.show();
    };
    FoodOrder.prototype.isEmpty = function () {
        if (this.foods.length > 0)
            return true;
        return false;
    };
    FoodOrder.prototype.generateFood = function () {
        var food = Math.random() * 4;
        return Math.round(food);
    };
    FoodOrder.prototype.generateCount = function () {
        var count = Math.random() + 1;
        return Math.round(count);
    };
    return FoodOrder;
}(BaseUI));
__reflect(FoodOrder.prototype, "FoodOrder", ["eui.UIComponent", "egret.DisplayObject"]);
window["FoodOrder"] = FoodOrder;
//# sourceMappingURL=FoodOrder.js.map