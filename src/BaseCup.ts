class BaseCup extends BaseUI implements eui.UIComponent {
	public cupType: CupType = CupType.Small;
	public cupStatus: CupStatus = CupStatus.Free;
	public foods: Array<FoodType>;
	public machine: BaseMachine;
	public constructor() {
		super();
		this.foods = [];
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public setStatus(status: CupStatus) {
		this.cupStatus = status;
	}

	public setType(cupType: CupType) {
		this.cupType = cupType;
	}

	public getFoodNum(): number {
		return this.foods.length;
	}
}
enum CupType {
	Small,
	Big,
}

enum CupStatus {
	Free,
	Geting,
	Fulled,
	Fulling,
}

