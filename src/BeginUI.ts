class BeginUI extends BaseUI implements eui.UIComponent {
	public constructor() {
		super();
	}
	public beginBtn: eui.Button;


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.beginBtn.addEventListener("touchTap", this.onBegin, this);
	}

	public onBegin() {
		SoundManager.playEffect("begin_cd_mp3");
		this.parent.addChild(new Game());
		this.parent.removeChild(this);
	}

}