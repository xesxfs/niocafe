class BaseMachine extends BaseUI implements eui.UIComponent {
	public constructor() {
		super();
	}
	protected status: MachineStatus = MachineStatus.Free;
	public operationGroup: eui.Group;
	public cup: BaseCup;
	public leftwhater: eui.Image;
	public rightwhater: eui.Image;
	public onPackageCafe: Function;


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected changeStatus(status: MachineStatus) {
		this.status = status;
	}

	public canAddFood(): boolean {
		return this.status == MachineStatus.Free || this.status == MachineStatus.CanInput;
	}
	public addFood(food: FoodType) { }
}

enum MachineStatus {
	Free,	//空闲
	Inputing, //加注中
	CanInput,//可以加注
	Failed,//失败
	Package, //打包
}