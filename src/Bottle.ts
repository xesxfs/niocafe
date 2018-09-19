class Bottle extends BaseUI implements eui.UIComponent {

	public static FoodResource = {
		Brioche: "brioche_png",
		Chestnut: "chestnut_png",
		Fragrans: "fragrans_png",
		Nut: "nut_png",
		Sugar: "sugar_png",
	}
	private foodType: FoodType = FoodType.Nut;
	private foodImg: eui.Image;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

	public init() {
		this.setFoodType(this.foodType);
	}

	public setFoodType(ftype: FoodType) {
		this.foodType = ftype;
		this.foodImg.source = Bottle.FoodResource[FoodType[ftype]];
	}

	public getFoodType(): FoodType {
		return this.foodType;
	}

}

enum FoodType {
	Brioche,// 奶油
	Chestnut,//栗子
	Fragrans,//挂花
	Nut,//坚果
	Sugar//糖
}
window["Bottle"] = Bottle;