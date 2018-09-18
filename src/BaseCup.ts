class BaseCup extends BaseUI implements eui.UIComponent {
	public cupType: CupType = CupType.Small;
	public cupStatus: CupStatus = CupStatus.Free;
	public foods: Array<FoodType>;
	public machine: BaseMachine;
	public scup: eui.Group;
	public sfull: eui.Image;
	public scuping: eui.Image;
	public scupingmk: eui.Image;
	public sfree: eui.Image;
	public smask: eui.Image;

	public bcup: eui.Group;
	public bfull: eui.Image;
	public bcuping: eui.Image;
	public bcupingmk: eui.Image;
	public bfree: eui.Image;
	public bmask: eui.Image;

	public sfullwhater: eui.Rect;
	public swhater: eui.Rect;

	public bfullwhater: eui.Rect;
	public bwhater: eui.Rect;

	public whaters: eui.Rect[];
	public fwhaters: eui.Rect[];


	public statusShow: Array<Array<eui.Image>>;
	public cupMask: Array<Array<eui.Image>>;
	public constructor() {
		super();
		this.foods = [];
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public getFoodNum(): number {
		return this.foods.length;
	}

	public init() {
		this.bwhater.mask = this.bmask;
		this.bfullwhater.mask = this.bcupingmk
		this.swhater.mask = this.smask;
		this.sfullwhater.mask = this.scupingmk;

		this.statusShow = [[], []];
		this.cupMask = [[], []];
		this.whaters = [this.swhater, this.bwhater];
		this.fwhaters = [this.sfullwhater, this.bfullwhater];
		this.cupMask[CupType.Small] = [this.scupingmk, this.smask]
		this.cupMask[CupType.Big] = [this.bcupingmk, this.bmask];

		this.statusShow[CupType.Small] = [this.sfree, this.scuping, this.sfull]
		this.statusShow[CupType.Big] = [this.bfree, this.bcuping, this.bfull];
		this.setType(this.cupType);
		this.setStatus(this.cupStatus);
	}

	public startWhater() {
		egret.Tween.removeTweens(this.whaters[this.cupType]);
		egret.Tween.get(this.whaters[this.cupType]).to({ height: 120 }, 5000).call(this.startFullWhater, this);
	}

	public startFullWhater() {
		this.setStatus(CupStatus.Fulling);
		(this.machine as BigMachine).changeStatus(MachineStatus.Package);
		egret.Tween.removeTweens(this.fwhaters[this.cupType]);
		egret.Tween.get(this.fwhaters[this.cupType]).to({ height: 60 }, 2000).call(this.onFaild, this);
	}

	public stop() {
		egret.Tween.removeTweens(this.fwhaters[this.cupType]);
		egret.Tween.removeTweens(this.whaters[this.cupType]);
		for (let i = 0; i < this.whaters.length; i++) {
			this.whaters[i].height = 0;
		}

		for (let i = 0; i < this.fwhaters.length; i++) {
			this.fwhaters[i].height = 0;
		}
	}

	public onFaild() {
		this.setStatus(CupStatus.Fulled);
		(this.machine as BigMachine).changeStatus(MachineStatus.Failed);
	}

	public switch2Big() {
		this.bcup.visible = true;
		this.scup.visible = false;
	}

	public switch2Small() {
		this.bcup.visible = false;
		this.scup.visible = true;
	}

	public setStatus(status: CupStatus) {
		this.cupStatus = status;
		if (status == CupStatus.Fulling || status == CupStatus.Fulled) return;
		let statusList = this.statusShow[this.cupType]
		for (let i = 0; i < statusList.length - 1; i++) {
			statusList[i].visible = false;
			if (i == status) {
				statusList[i].visible = true;
			}
		}
	}

	public getStatus(): CupStatus {
		return this.cupStatus;
	}

	public setType(cupType: CupType) {
		this.cupType = cupType;
		if (this.cupType == CupType.Big) {
			this.switch2Big();
		} else {
			this.switch2Small();
		}
	}

	public getType(): CupType {
		return this.cupType;
	}

	public showMask(isShow: boolean = true) {
		for (let i = 0; i < this.cupMask[this.cupType].length; i++) {
			this.cupMask[this.cupType][i].visible = isShow;
		}
	}

	public addFood(foodsType: FoodType): boolean {
		if (this.foods.length > 2) {
			return false;
		}
		this.foods.push(foodsType);
		App.useFoods.push(foodsType);
		if (this.foods.length >= 2) {
			this.setType(CupType.Big);
			this.setStatus(this.getStatus());
		}
		return true;
	}

	public delFood() {
		if (this.foods.length > 0) {
			this.foods = [];
		}
		this.setType(CupType.Small);
	}

	public createFood(foodsType: FoodType): eui.Image {
		let foodImgSrc = Bottle.FoodResource[FoodType[foodsType]];
		let img = new eui.Image(foodImgSrc);
		return img;
	}

	public reset() {
		this.stop();
		this.setStatus(CupStatus.Free);
		this.setType(CupType.Small);
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

