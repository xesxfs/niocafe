class SmallCup extends BaseCup {

	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

}