class Game extends BaseUI {
	public constructor() {
		super();
		this.skinName = "GameSkin";

	}
	public leftBtn: eui.Button;
	public rightBtn: eui.Button;
	public midGroup: eui.Group;
	public bottomGroup: eui.Group;

	public bigMachine: BigMachine;


	public orderUI1: OrderUI;
	public orderUI2: OrderUI;

	private orderUI: Array<OrderUI>;

	private intKet: number;

	private selectCafePage: number = 1;


	public sm1: SmallMachine;
	public sm2: SmallMachine;
	public sm3: SmallMachine;
	public sm4: SmallMachine;
	public sm5: SmallMachine;
	public sm6: SmallMachine;

	public sm7: SmallMachine;
	public sm8: SmallMachine;
	public sm9: SmallMachine;
	public sm10: SmallMachine;
	public sm11: SmallMachine;
	public sm12: SmallMachine;

	private machines: Array<Array<BaseMachine>>;


	public bt1: Bottle;
	public bt2: Bottle;
	public bt3: Bottle;
	public bt4: Bottle;
	public bt5: Bottle;

	private bottles: Array<Bottle>;
	public scoreLab: eui.Label;



	protected childrenCreated() {
		this.leftBtn.addEventListener("touchTap", this.onLeftBtn, this);
		this.rightBtn.addEventListener("touchTap", this.onRightBtn, this);
		// this.nulBottle.addEventListener("touchTap", this.onBottle, this);
		this.orderUI = [this.orderUI1, this.orderUI2];
		this.machines = [[this.sm1, this.sm2, this.sm3, this.sm4, this.sm5, this.sm6], [this.bigMachine], [this.sm7, this.sm8, this.sm9, this.sm10, this.sm11, this.sm12]];
		this.bottles = [this.bt1, this.bt2, this.bt3, this.bt4, this.bt5];
		this.initBottle();
		this.initMachines();
		egret.Tween.get(this).wait(3000).call(this.startOrder, this);
	}

	public initBottle() {
		for (let i = 0; i < this.bottles.length; i++) {
			this.bottles[i].setFoodType(i);
			this.bottles[i].addEventListener("touchTap", this.onBottle, this);
		}
	}

	public initMachines() {
		for (let i = 0; i < this.machines.length; i++) {
			let machinesi = this.machines[i]
			for (let j = 0; j < machinesi.length; j++) {
				let machine = machinesi[j];
				machine.onPackageCafe = this.onPackageCafe.bind(this);
			}
		}
	}

	private onLeftBtn(e: egret.TouchEvent) {
		egret.Tween.removeTweens(this.midGroup);
		let offx;
		if (this.midGroup.x == 0) {
			offx = 750;
			this.leftBtn.visible = false;
			this.selectCafePage = 0;
		} else {
			offx = 0;
			this.rightBtn.visible = true;
			this.leftBtn.visible = true;
			this.selectCafePage = 1;
		}
		egret.Tween.get(this.midGroup).to({ x: offx }, 300);
	}

	private onRightBtn(e: egret.TouchEvent) {
		egret.Tween.removeTweens(this.midGroup);
		let offx;
		if (this.midGroup.x == 0) {
			offx = -750;
			this.rightBtn.visible = false;
			this.selectCafePage = 2;
		} else {
			offx = 0;
			this.rightBtn.visible = true;
			this.leftBtn.visible = true;
			this.selectCafePage = 1;
		}
		egret.Tween.get(this.midGroup).to({ x: offx }, 300);
	}

	private onBottle(e: egret.TouchEvent) {
		// this.smallMachine.addFood(this.nulBottle.getFoodType());
		let selMachine: BaseMachine;
		let selMachineGroup = this.machines[this.selectCafePage];
		for (let i = 0; i < selMachineGroup.length; i++) {
			if (selMachineGroup[i].canAddFood()) {
				selMachine = selMachineGroup[i];
				break;
			}
		}
		if (selMachine) {
			selMachine.addFood((e.currentTarget as Bottle).getFoodType())
		}
	}

	public onPackageCafe(foods: Array<FoodType>) {
		let result = false;
		for (let i = 0; i < this.orderUI.length; i++) {
			let order = this.orderUI[i].checkOrderByFoods(foods);
			if (order) {
				result = true;
				this.orderUI[i].delOrder(order);
				this.addScore();
				break;
			}
		}
		return result;
	}

	public addScore(score: number = 1000) {
		this.scoreLab.text = parseInt(this.scoreLab.text) + score + '';
	}

	private startOrder() {
		this.intKet = egret.setInterval(this.createOrder, this, 1000);
	}

	private createOrder() {
		for (let i = 0; i < this.orderUI.length; i++) {
			let orderUI = this.orderUI[i];
			let order = orderUI.getEmptyOrder();
			if (order) {
				this.orderUI[i].generateOrder(order);
				break;
			}
		}
	}
}