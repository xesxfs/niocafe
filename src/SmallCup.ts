class SmallCup extends BaseCup {

	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

	public setCafeHeight() {
		if (this.cupType == CupType.Small) {
			this.packageHeight = 75;
			this.cafeHeight = 90;
		} else {
			this.packageHeight = 95;
			this.cafeHeight = 115;
		}
	}

}
window["SmallCup"] = SmallCup;