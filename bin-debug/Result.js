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
var Result = (function (_super) {
    __extends(Result, _super);
    function Result() {
        var _this = _super.call(this) || this;
        _this.skinName = "ResultSkin";
        return _this;
    }
    Result.prototype.childrenCreated = function () {
        this.cs = [this.c1, this.c2, this.c3, this.c4, this.c5];
        this.retryBtn.addEventListener("touchTap", this.onRetry, this);
        this.shareBtn.addEventListener("touchTap", this.onShare, this);
        this.c.text = App.score / 1000 + '';
        this.calc();
    };
    Result.prototype.onRetry = function () {
        this.parent.addChild(new Game());
        this.parent.removeChild(this);
    };
    Result.prototype.onShare = function () {
    };
    Result.prototype.calc = function () {
        var calcFods = [0, 0, 0, 0, 0];
        var list = App.useFoods;
        for (var i = 0; i < list.length; i++) {
            calcFods[list[i]]++;
        }
        for (var i = 0; i < calcFods.length; i++) {
            this.cs[i].text = calcFods[i].toString();
        }
    };
    return Result;
}(BaseUI));
__reflect(Result.prototype, "Result");
//# sourceMappingURL=Result.js.map