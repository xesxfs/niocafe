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

	public whaterHeight: number;

	public notImg: eui.Image;
	public inputImg: eui.Image;
	public delImg: eui.Image;
	public packageImg: eui.Image;

	public statusFlag: Array<eui.Image>;

	public fd2: eui.Image;
	public fd1: eui.Image;
	public foodsImg: eui.Image[];

	public sfull: eui.Image;
	public bfull: eui.Image;
	public showFulls: Array<eui.Image>;

	public sdel: eui.Image;
	public bdel: eui.Image;
	public showDels: Array<eui.Image>;

	public xxx: eui.Image;



	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	public canAddFood(): boolean {
		return this.status == MachineStatus.Free || this.status == MachineStatus.CanInput;
	}

	public init() {
		this.showFulls = [this.sfull, this.bfull];
		this.showDels = [this.sdel, this.bdel]
		this.cup.machine = this;
		this.statusFlag = [this.notImg, this.notImg, this.inputImg, this.delImg, this.packageImg];
		this.foodsImg = [this.fd1, this.fd2];
		this.resetWhater();
		this.changeStatus(this.status);
	}

	public resetWhater() {
		this.leftwhater.height = 0;
		this.rightwhater.height = 0;
	}


	public changeStatus(status: MachineStatus) {
		this.status = status;
		/****空闲或者加注中 */
		if (status == MachineStatus.Free || status == MachineStatus.Inputing) {
			this.statusFlag[status].visible = true;
		}
		if ((status != MachineStatus.Free) && (status != MachineStatus.Inputing)) {
			this.statusFlag[status].visible = false;
		}

		for (let i = 2; i < this.statusFlag.length; i++) {
			if (i == status) {
				this.statusFlag[i].visible = true;
			} else {
				this.statusFlag[i].visible = false;
			}
		}
		if (status == MachineStatus.Failed) {
			this.resetWhater();
		}
	}

	public startCafe() {
		this.changeStatus(MachineStatus.Inputing);
		(this.cup as BigCup).setStatus(CupStatus.Geting);
		egret.Tween.removeTweens(this.leftwhater);
		egret.Tween.removeTweens(this.rightwhater);
		egret.Tween.get(this.leftwhater).to({ height: this.whaterHeight }, 1000);
		egret.Tween.get(this.rightwhater).to({ height: this.whaterHeight }, 1000).call(this.onCafeComplete, this);

	}

	public onOperation(e: egret.TouchEvent) {
		switch (this.status) {
			case MachineStatus.CanInput:
				this.startCafe();
				break;
			case MachineStatus.Failed:
				this.changeStatus(MachineStatus.Free);
				this.delFood();
				this.cup.reset();
				this.showDel();
				break;
			case MachineStatus.Free:
				break;
			case MachineStatus.Inputing:
				break;
			case MachineStatus.Package:
				if (this.onPackageCafe(this.cup.foods)) {
					this.showFull();
				} else {
					this.showDel();
				}
				this.cup.stop();
				this.resetWhater();
				this.delFood();
				this.changeStatus(MachineStatus.Free);
				this.cup.reset();
				break;
		}
	}

	public onCafeComplete() {
		(this.cup as BigCup).startWhater();
	}

	public getStatus(): MachineStatus {
		return this.status;
	}

	public addFood(food: FoodType) {
		if (this.status == MachineStatus.Free || this.status == MachineStatus.CanInput) {
			if ((this.cup as BigCup).getFoodNum() >= 2) return;
			this.cup.addFood(food);
			let foodImgSrc = Bottle.FoodResource[FoodType[food]];
			this.foodsImg[(this.cup as BigCup).getFoodNum() - 1].source = foodImgSrc;
			this.changeStatus(MachineStatus.CanInput);
		}
	}

	public delFood() {
		this.cup.delFood();
		for (let i = 0; i < this.foodsImg.length; i++) {
			this.foodsImg[i].source = "";
		}
	}

	public showFull() {
		this.cup.visible = false;
		let img = this.showFulls[this.cup.getType()];
		img.visible = true;
		egret.Tween.get(img).wait(400).call(() => { img.visible = false; this.cup.visible = true; });
	}

	public showDel() {
		let img = this.showDels[this.cup.getType()];
		img.visible = true;
		this.cup.visible = false;
		this.xxx.visible = true;
		egret.Tween.get(img).wait(400).call(() => { img.visible = false; this.xxx.visible = false; this.cup.visible = true; });
	}
}

enum MachineStatus {
	Free,	//空闲
	Inputing, //加注中
	CanInput,//可以加注
	Failed,//失败
	Package, //打包
}