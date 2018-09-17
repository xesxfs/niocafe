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
var BaseMachine = (function (_super) {
    __extends(BaseMachine, _super);
    function BaseMachine() {
        var _this = _super.call(this) || this;
        _this.status = MachineStatus.Free;
        return _this;
    }
    BaseMachine.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseMachine.prototype.changeStatus = function (status) {
        this.status = status;
    };
    BaseMachine.prototype.canAddFood = function () {
        return this.status == MachineStatus.Free || this.status == MachineStatus.CanInput;
    };
    BaseMachine.prototype.addFood = function (food) { };
    return BaseMachine;
}(BaseUI));
__reflect(BaseMachine.prototype, "BaseMachine", ["eui.UIComponent", "egret.DisplayObject"]);
var MachineStatus;
(function (MachineStatus) {
    MachineStatus[MachineStatus["Free"] = 0] = "Free";
    MachineStatus[MachineStatus["Inputing"] = 1] = "Inputing";
    MachineStatus[MachineStatus["CanInput"] = 2] = "CanInput";
    MachineStatus[MachineStatus["Failed"] = 3] = "Failed";
    MachineStatus[MachineStatus["Package"] = 4] = "Package";
})(MachineStatus || (MachineStatus = {}));
//# sourceMappingURL=BaseMachine.js.map