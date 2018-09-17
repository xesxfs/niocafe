class BigMachine extends BaseMachine {
	public constructor() {
		super();
	}
	private whaterHeight: number = 190;

	public notImg: eui.Image;
	public inputImg: eui.Image;
	public delImg: eui.Image;
	public packageImg: eui.Image;

	private statusFlag: Array<eui.Image>;

	public fd2: eui.Image;
	public fd1: eui.Image;
	public foodsImg: eui.Image[];


	protected childrenCreated(): void {
		super.childrenCreated();
		this.operationGroup.addEventListener("touchTap", this.onOperation, this);
		this.init();
	}

	public init() {
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
		super.changeStatus(status);
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
				(this.cup as BigCup).reset();
				break;
			case MachineStatus.Free:
				break;
			case MachineStatus.Inputing:
				break;
			case MachineStatus.Package:
				if (this.onPackageCafe(this.cup.foods)) {
					this.changeStatus(MachineStatus.Free);
					(this.cup as BigCup).stop();
					this.resetWhater();
					this.delFood();
				}

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
			(this.cup as BigCup).addFood(food);
			let foodImgSrc = Bottle.FoodResource[FoodType[food]];
			this.foodsImg[(this.cup as BigCup).getFoodNum() - 1].source = foodImgSrc;
			this.changeStatus(MachineStatus.CanInput);
		}
	}

	public delFood() {
		(this.cup as BigCup).delFood();
		for (let i = 0; i < this.foodsImg.length; i++) {
			this.foodsImg[i].source = "";
		}
	}



}