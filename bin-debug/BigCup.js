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
var BigCup = (function (_super) {
    __extends(BigCup, _super);
    function BigCup() {
        var _this = _super.call(this) || this;
        _this.cafeTime = 9000;
        _this.cafeHeight = 146;
        return _this;
    }
    BigCup.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    BigCup.prototype.setCafeHeight = function () {
        if (this.cupType == CupType.Small) {
            this.packageHeight = 100;
            this.cafeHeight = 120;
        }
        else {
            this.packageHeight = 120;
            this.cafeHeight = 135;
        }
    };
    return BigCup;
}(BaseCup));
__reflect(BigCup.prototype, "BigCup");
window["BigCup"] = BigCup;
//# sourceMappingURL=BigCup.js.map