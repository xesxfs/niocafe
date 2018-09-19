class BigCup extends BaseCup {

	public constructor() {
		super();
		this.cafeTime = 7000;
		this.cafeHeight = 146;
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	public setCafeHeight() {
		if (this.cupType == CupType.Small) {
			this.packageHeight = 100;
			this.cafeHeight = 120;
		} else {
			this.packageHeight = 120;
			this.cafeHeight = 135;
		}
	}

}
window["BigCup"] = BigCup;