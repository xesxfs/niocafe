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
        _this.renderTexture = new egret.RenderTexture();
        return _this;
    }
    // public caSaveLab: eui.Label;
    Result.prototype.childrenCreated = function () {
        // App.setFont([this.timeLab, this.scoreLab]);
        this.cs = [this.c1, this.c2, this.c3, this.c4, this.c5];
        this.ss = [this.s1, this.s2, this.s3, this.s4, this.s5];
        this.calc();
        this.retryBtn.addEventListener("touchTap", this.onRetry, this);
        this.shareBtn.addEventListener("touchTap", this.onShare, this);
        this.c.text = "*" + App.successCnt;
        this.s.text = App.successCnt * 100 + '';
        this.totallLab.text = App.score + "";
        this.noLab.text = "NO." + (new Date()).valueOf();
        window["title"] = "我在NIO House成功制作了" + App.successCnt + "中秋特饮，你呢？";
        // egret.setTimeout(this.onRenderCall, this, 100);
        // this.caSaveLab.visible = false;
    };
    Result.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance instanceof eui.Label) {
            App.setFont(instance);
        }
    };
    Result.prototype.onRetry = function () {
        this.qrCode && this.qrCode.destroy();
        this.parent.addChild(new Game());
        this.parent.removeChild(this);
        App.reset();
        // this.caSaveLab.visible = false;
    };
    Result.prototype.onRenderCall = function () {
        this.renderTexture.drawToTexture(this.renderGroup);
        // this.renderGroup.visible = false;
        this.qrCode = new QRCode(this.renderTexture.toDataURL("image/png"));
        this.qrCode.setPosition(this.renderGroup.x, this.renderGroup.y, this.renderGroup.width, this.renderGroup.height);
        this.qrCode.showHtmlCode();
        this.shareBg = new QRCode("resource/assets/bg/share_bg.png");
        this.shareBg.setPosition(0, this.renderGroup.height - 171, this.renderGroup.width, 171);
        this.shareBg.showHtmlCode();
    };
    Result.prototype.onShare = function () {
        // this.caSaveLab.visible = true;
        this.onRenderCall();
    };
    Result.prototype.calc = function () {
        var calcFods = [0, 0, 0, 0, 0];
        var list = App.useFoods;
        for (var i = 0; i < list.length; i++) {
            calcFods[list[i]]++;
        }
        var subFoodScore = 10;
        var subScore = 0;
        for (var i = 0; i < calcFods.length; i++) {
            this.cs[i].text = "*" + calcFods[i].toString();
            if (i == FoodType.Sugar || i == FoodType.Fragrans) {
                subFoodScore = 10;
            }
            else {
                subFoodScore = 15;
            }
            subScore += calcFods[i] * subFoodScore;
            this.ss[i].text = "-" + calcFods[i] * subFoodScore;
        }
    };
    return Result;
}(BaseUI));
__reflect(Result.prototype, "Result");
//# sourceMappingURL=Result.js.map