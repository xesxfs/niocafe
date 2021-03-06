class Result extends BaseUI {
	public constructor() {
		super();
		this.skinName = "ResultSkin";
		this.renderTexture = new egret.RenderTexture();
	}
	public retryBtn: eui.Button;
	public shareBtn: eui.Button;

	public noLab: eui.Label;

	public c: eui.Label;
	public c1: eui.Label;
	public c2: eui.Label;
	public c3: eui.Label;
	public c4: eui.Label;
	public c5: eui.Label;
	public cs: Array<eui.Label>;

	public s: eui.Label;
	public s1: eui.Label;
	public s2: eui.Label;
	public s3: eui.Label;
	public s4: eui.Label;
	public s5: eui.Label;
	public totallLab: eui.Label;
	public ss: Array<eui.Label>;
	public renderTexture: egret.RenderTexture;
	public renderGroup: eui.Group;
	public obg: eui.Image;
	public qrCode: QRCode;
	public shareBg: QRCode;

	// public caSaveLab: eui.Label;

	public childrenCreated() {
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

	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		if (instance instanceof eui.Label) {
			App.setFont(instance);
		}
	}

	private onRetry() {
		this.qrCode && this.qrCode.destroy();
		this.parent.addChild(new Game());
		this.parent.removeChild(this);
		App.reset();
		// this.caSaveLab.visible = false;
	}

	public onRenderCall() {
		this.renderTexture.drawToTexture(this.renderGroup);
		// this.renderGroup.visible = false;


		this.qrCode = new QRCode(this.renderTexture.toDataURL("image/png"));
		this.qrCode.setPosition(this.renderGroup.x, this.renderGroup.y, this.renderGroup.width, this.renderGroup.height);
		this.qrCode.showHtmlCode();

		this.shareBg = new QRCode("resource/assets/bg/share_bg.png")
		this.shareBg.setPosition(0, this.renderGroup.height - 171, this.renderGroup.width, 171);
		this.shareBg.showHtmlCode();



	}

	private onShare() {
		// this.caSaveLab.visible = true;
		this.onRenderCall();
	}

	public calc() {
		let calcFods = [0, 0, 0, 0, 0];
		let list = App.useFoods;
		for (let i = 0; i < list.length; i++) {
			calcFods[list[i]]++;
		}
		let subFoodScore = 10;
		let subScore = 0;
		for (let i = 0; i < calcFods.length; i++) {
			this.cs[i].text = "*" + calcFods[i].toString();
			if (i == FoodType.Sugar || i == FoodType.Fragrans) {
				subFoodScore = 10;
			} else {
				subFoodScore = 15;
			}
			subScore += calcFods[i] * subFoodScore;
			this.ss[i].text = "-" + calcFods[i] * subFoodScore;
		}
	}



}