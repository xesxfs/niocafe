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
	public timeLab: eui.Label;
	public second: number = 0;

	public cdGroup: eui.Group;
	public cdGroup0: eui.Group;
	public cdGroup1: eui.Group;




	protected childrenCreated() {

		for (let i = 0; i < 3; i++) {
			(this.midGroup.getChildAt(i) as eui.Group).width = this.stage.stageWidth;
		}
		this.midGroup.left = -this.stage.stageWidth;

		this.leftBtn.addEventListener("touchTap", this.onLeftBtn, this);
		this.rightBtn.addEventListener("touchTap", this.onRightBtn, this);
		this.orderUI = [this.orderUI1, this.orderUI2];
		this.machines = [[this.sm1, this.sm2, this.sm3, this.sm4, this.sm5, this.sm6], [this.bigMachine], [this.sm7, this.sm8, this.sm9, this.sm10, this.sm11, this.sm12]];
		this.bottles = [this.bt1, this.bt2, this.bt3, this.bt4, this.bt5];
		this.initBottle();
		this.initMachines();
		// egret.Tween.get(this).wait(3000).call(this.startOrder, this);
		this.beginCD();
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

	public beginCD() {
		egret.Tween.get(this.cdGroup).to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.circInOut).call(() => { this.cdGroup.visible = false; });
		egret.Tween.get(this.cdGroup0).wait(1000).to({ scaleX: 1, scaleY: 1 }, 1000, egret.Ease.circInOut).call(() => { this.cdGroup0.visible = false; });
		egret.Tween.get(this.cdGroup1).wait(2000).to({ scaleX: 1, scaleY: 1 }, 900, egret.Ease.circInOut).call(() => { this.cdGroup1.visible = false; this.midGroup.visible = true;this.startOrder(); });
	}

	private onLeftBtn(e: egret.TouchEvent) {
		egret.Tween.removeTweens(this.midGroup);
		let offx;
		if (this.midGroup.left == -this.stage.stageWidth) {
			offx = 0;
			this.leftBtn.visible = false;
			this.selectCafePage = 0;
		} else {
			offx = -this.stage.stageWidth;
			this.rightBtn.visible = true;
			this.leftBtn.visible = true;
			this.selectCafePage = 1;
		}
		egret.Tween.get(this.midGroup).to({ left: offx }, 300);
	}

	private onRightBtn(e: egret.TouchEvent) {
		egret.Tween.removeTweens(this.midGroup);
		let offx;
		if (this.midGroup.left == -this.stage.stageWidth) {
			offx = -this.stage.stageWidth * 2;
			this.rightBtn.visible = false;
			this.selectCafePage = 2;
		} else {
			offx = -this.stage.stageWidth;
			this.rightBtn.visible = true;
			this.leftBtn.visible = true;
			this.selectCafePage = 1;
		}
		egret.Tween.get(this.midGroup).to({ left: offx }, 300);
	}

	private onBottle(e: egret.TouchEvent) {
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

	public addScore(score: number = 100) {
		App.score += score;
		this.scoreLab.text = App.score.toString();
	}

	private startOrder() {
		this.intKet = egret.setInterval(this.timeTick, this, 1000);
	}

	private timeTick() {
		this.createOrder();
		this.updateTime();
		this.second++;
		if (this.second > 120) {
			this.gameEnd();
			egret.clearInterval(this.intKet);
			this.intKet = null;
		}
	}

	public createOrder() {
		for (let i = 0; i < this.orderUI.length; i++) {
			let orderUI = this.orderUI[i];
			let order = orderUI.getEmptyOrder();
			if (order) {
				this.orderUI[i].generateOrder(order);
				break;
			}
		}
	}

	public updateTime() {
		let limeTime = 120 - this.second;
		let min = ~~(limeTime / 60);
		let second = limeTime % 60
		let timeStr = "";
		if (min < 10) {
			timeStr += "0" + min;
		} else {
			timeStr += "" + min;
		}
		if (second < 10) {
			timeStr += ":" + "0" + second;
		} else {
			timeStr += ":" + second;
		}
		this.timeLab.text = timeStr;
	}

	public gameEnd() {
		egret.Tween.removeAllTweens();
		this.parent.addChild(new Result());
		this.parent.removeChild(this);
	}
}