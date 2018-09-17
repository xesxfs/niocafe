class OrderUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();

	}
	public foodOrders: Array<FoodOrder>;
	public order1: FoodOrder;
	public order2: FoodOrder;
	public order3: FoodOrder;
	public order4: FoodOrder;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.foodOrders = [this.order1, this.order2, this.order3, this.order4];
	}

	public getEmptyOrder(): FoodOrder {
		let order: FoodOrder;
		for (let i = 0; i < this.foodOrders.length; i++) {
			if (!this.foodOrders[i].isEmpty()) {
				order = this.foodOrders[i];
				break;
			}
		}
		return order
	}

	public generateOrder(order: FoodOrder) {
		let count = order.generateCount();
		let foods = [];
		for (let i = 0; i < count; i++) {
			foods.push(order.generateFood());
		}
		order.setFoods(foods);
	}

	public delOrder(order:FoodOrder){
		if(this.foodOrders.indexOf(order)>=0){
			order.init();
		}
	}

	public checkOrderByFoods(foods: Array<FoodType>): FoodOrder {
		if (foods.length <= 0) return null;
		let result = null;
		let list = this.getOrderByLength(foods.length);
		for (let i = 0; i < list.length; i++) {
			if (foods.length == 1 && list[i].foods[0] == foods[0]) {
				result = list[i];
				break;
			} else if (foods.length == 2) {
				if (foods.indexOf(list[i].foods[0]) >= 0 && foods.indexOf(list[i].foods[1]) >= 0) {
					result = list[i];
					break;
				}
			}
		}
		return result;
	}

	private getOrderByLength(len: number = 1): FoodOrder[] {
		let list = [];
		for (let i = 0; i < this.foodOrders.length; i++) {
			if (this.foodOrders[i].foods.length == len) {
				list.push(this.foodOrders[i]);
			}
		}
		return list;
	}

}