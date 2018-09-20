class App {
	public constructor() {
	}
	public static stage: egret.Stage;
	public static reset() {
		this.score = 0;
		this.useFoods = [];
	}
	public static score: number = 0;
	public static successCnt: number = 0;
	public static useFoods: Array<FoodType> = [];
	public static scoreLab: eui.Label;
	public static updateScore() {
		this.scoreLab && (this.scoreLab.text = this.score.toString());
	}

	public static setFont(lab: eui.Label) {	
			lab.fontFamily = "BlueSkyStandardRegular";
	}
}