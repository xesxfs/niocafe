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
var SmallMachine = (function (_super) {
    __extends(SmallMachine, _super);
    function SmallMachine() {
        var _this = _super.call(this) || this;
        _this.whaterHeight = 112;
        return _this;
    }
    SmallMachine.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.operationGroup.addEventListener("touchTap", this.onOperation, this);
        this.init();
    };
    return SmallMachine;
}(BaseMachine));
__reflect(SmallMachine.prototype, "SmallMachine");
//# sourceMappingURL=SmallMachine.js.map