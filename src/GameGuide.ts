class GameGuide extends BaseUI implements eui.UIComponent {
	public constructor() {
		super();
	}

	public guid0: eui.Group;
	public guid1: eui.Group;
	public guid2: eui.Group;
	public guid3: eui.Group;
	public guid4: eui.Group;
	public guid5: eui.Group;

	public skipBtn: eui.Group;
	public gg: eui.Group;
	public sv: ScrollView;
	public guids: eui.Group[];
	public beginBtn: eui.Button;



	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.guids = [this.guid0, this.guid1, this.guid2, this.guid3, this.guid4, this.guid5];
		for (let i = 0; i < this.guids.length; i++) {
			this.guids[i].width = this.stage.stageWidth;
			this.gg.addChild(this.guids[i]);
			this.guids[i].visible = true;
		}
		this.sv.init();
		this.beginBtn.addEventListener("touchTap", this.onStartGame, this);
		this.skipBtn.addEventListener("touchTap", this.onStartGame, this);
		egret.localStorage.setItem("guide", "guide");
	}

	public onStartGame() {
		SoundManager.playEffect("begin_cd_mp3");
		this.parent.addChild(new Game());
		this.parent.removeChild(this);
	}

}