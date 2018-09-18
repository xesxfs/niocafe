class Result extends BaseUI {
	public constructor() {
		super();
		this.skinName = "ResultSkin";
	}
	public retryBtn: eui.Button;
	public shareBtn: eui.Button;

	public c: eui.Label;
	public c1: eui.Label;
	public c2: eui.Label;
	public c3: eui.Label;
	public c4: eui.Label;
	public c5: eui.Label;
	public cs: Array<eui.Label>;

	public childrenCreated() {
		this.cs = [this.c1, this.c2, this.c3, this.c4, this.c5];
		this.retryBtn.addEventListener("touchTap", this.onRetry, this);
		this.shareBtn.addEventListener("touchTap", this.onShare, this);
		this.c.text = App.score / 1000 + '';
		this.calc();
	}

	private onRetry() {
		this.parent.addChild(new Game());
		this.parent.removeChild(this);
	}

	private onShare() {

	}

	public calc() {
		let calcFods = [0, 0, 0, 0, 0];
		let list = App.useFoods;
		for (let i = 0; i < list.length; i++) {
			calcFods[list[i]]++;
		}
		for (let i = 0; i < calcFods.length; i++) {
			this.cs[i].text = calcFods[i].toString();
		}
	}

}