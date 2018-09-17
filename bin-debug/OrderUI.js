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
var OrderUI = (function (_super) {
    __extends(OrderUI, _super);
    function OrderUI() {
        return _super.call(this) || this;
    }
    OrderUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    OrderUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.foodOrders = [this.order1, this.order2, this.order3, this.order4];
    };
    OrderUI.prototype.getEmptyOrder = function () {
        var order;
        for (var i = 0; i < this.foodOrders.length; i++) {
            if (!this.foodOrders[i].isEmpty()) {
                order = this.foodOrders[i];
                break;
            }
        }
        return order;
    };
    OrderUI.prototype.generateOrder = function (order) {
        var count = order.generateCount();
        var foods = [];
        for (var i = 0; i < count; i++) {
            foods.push(order.generateFood());
        }
        order.setFoods(foods);
    };
    OrderUI.prototype.delOrder = function (order) {
        if (this.foodOrders.indexOf(order) >= 0) {
            order.init();
        }
    };
    OrderUI.prototype.checkOrderByFoods = function (foods) {
        if (foods.length <= 0)
            return null;
        var result = null;
        var list = this.getOrderByLength(foods.length);
        for (var i = 0; i < list.length; i++) {
            if (foods.length == 1 && list[i].foods[0] == foods[0]) {
                result = list[i];
                break;
            }
            else if (foods.length == 2) {
                if (foods.indexOf(list[i].foods[0]) >= 0 && foods.indexOf(list[i].foods[1]) >= 0) {
                    result = list[i];
                    break;
                }
            }
        }
        return result;
    };
    OrderUI.prototype.getOrderByLength = function (len) {
        if (len === void 0) { len = 1; }
        var list = [];
        for (var i = 0; i < this.foodOrders.length; i++) {
            if (this.foodOrders[i].foods.length == len) {
                list.push(this.foodOrders[i]);
            }
        }
        return list;
    };
    return OrderUI;
}(eui.Component));
__reflect(OrderUI.prototype, "OrderUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=OrderUI.js.map