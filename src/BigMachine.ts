class BigMachine extends BaseMachine {
	public constructor() {
		super();
		this.whaterHeight = 190;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.operationGroup.addEventListener("touchTap", this.onOperation, this);
		this.init();
	}
}