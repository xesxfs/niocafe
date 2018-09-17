class Loading extends BaseUI implements RES.PromiseTaskReporter {
	public constructor() {
		super();
		this.skinName = "LoadingSkin";
	}
	public onProgress(current: number, total: number): void {

	}
}