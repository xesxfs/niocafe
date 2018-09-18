class App {
	public constructor() {
	}
	public static reset() {
		this.score = 0;
		this.useFoods = [];
	}
	public static score: number = 0;
	public static useFoods: Array<FoodType> = [];
}