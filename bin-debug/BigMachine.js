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
var BigMachine = (function (_super) {
    __extends(BigMachine, _super);
    function BigMachine() {
        var _this = _super.call(this) || this;
        _this.whaterHeight = 190;
        return _this;
    }
    BigMachine.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operationGroup.addEventListener("touchTap", this.onOperation, this);
        this.init();
    };
    return BigMachine;
}(BaseMachine));
__reflect(BigMachine.prototype, "BigMachine");
//# sourceMappingURL=BigMachine.js.map