class SmallMachine extends BaseMachine {
	public constructor() {
		super();
		this.whaterHeight = 112;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.operationGroup.addEventListener("touchTap", this.onOperation, this);
		this.init();
	}

}