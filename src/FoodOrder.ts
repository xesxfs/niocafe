class FoodOrder extends BaseUI implements eui.UIComponent {
	public constructor() {
		super();
	}
	public foods: Array<FoodType>;
	public one: eui.Group;
	public o1: eui.Image;
	public two: eui.Group;
	public t1: eui.Image;
	public t2: eui.Image;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	public init() {
		this.hide();
		this.foods = [];
		this.one.visible = false;
		this.two.visible = false;
	}

	public show() {
		this.visible = true;
	}

	public hide() {
		this.visible = false;
	}

	public setFoods(foods: Array<FoodType>) {
		if (!foods || foods.length <= 0) return;
		this.init();
		this.foods = foods;
		if (foods.length == 1) {
			this.one.visible = true;
			this.o1.source = Bottle.FoodResource[FoodType[foods[0]]]
		} else if (foods.length == 2) {
			this.two.visible = true;
			this.t1.source = Bottle.FoodResource[FoodType[foods[0]]];
			this.t2.source = Bottle.FoodResource[FoodType[foods[1]]]
		}
		this.show();
	}

	public isEmpty(): boolean {
		if (this.foods.length > 0) return true;
		return false;
	}

	public generateFood(): FoodType {
		let food = Math.random() * 4;
		return Math.round(food);
	}

	public generateCount(): number {
		let count = Math.random() + 1;
		return Math.round(count);
	}

}