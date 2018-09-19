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
    SmallCup.prototype.setCafeHeight = function () {
        if (this.cupType == CupType.Small) {
            this.packageHeight = 75;
            this.cafeHeight = 90;
        }
        else {
            this.packageHeight = 95;
            this.cafeHeight = 115;
        }
    };
    return SmallCup;
}(BaseCup));
__reflect(SmallCup.prototype, "SmallCup");
window["SmallCup"] = SmallCup;
//# sourceMappingURL=SmallCup.js.map