// You can write more code here

import Employee from "../Employee";
import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class SalesRoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? -90);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_2
		const room_2 = scene.add.image(0, 90, "Room_2");
		this.add(room_2);

		// employee_1
		const employee_1 = new Employee(scene, 217, -252);
		employee_1.scaleX = 0.25;
		employee_1.scaleY = 0.25;
		this.add(employee_1);

		// employee_2
		const employee_2 = new Employee(scene, 370, -156);
		employee_2.scaleX = 0.25;
		employee_2.scaleY = 0.25;
		this.add(employee_2);

		// employee
		const employee = new Employee(scene, 536, -62);
		employee.scaleX = 0.25;
		employee.scaleY = 0.25;
		this.add(employee);

		// employee_3
		const employee_3 = new Employee(scene, 16, -139);
		employee_3.scaleX = 0.25;
		employee_3.scaleY = 0.25;
		this.add(employee_3);

		// employee_5
		const employee_5 = new Employee(scene, 335, 51);
		employee_5.scaleX = 0.25;
		employee_5.scaleY = 0.25;
		this.add(employee_5);

		// employee_4
		const employee_4 = new Employee(scene, -182, -20);
		employee_4.scaleX = 0.25;
		employee_4.scaleY = 0.25;
		this.add(employee_4);

		// employee_6
		const employee_6 = new Employee(scene, 137, 170);
		employee_6.scaleX = 0.25;
		employee_6.scaleY = 0.25;
		this.add(employee_6);

		// employee_7
		const employee_7 = new Employee(scene, -416, 108);
		employee_7.scaleX = 0.25;
		employee_7.scaleY = 0.25;
		this.add(employee_7);

		// employee_8
		const employee_8 = new Employee(scene, -97, 298);
		employee_8.scaleX = 0.25;
		employee_8.scaleY = 0.25;
		this.add(employee_8);

		// flower
		const flower = new Flower(scene, -15, 101);
		flower.scaleX = 0.5;
		flower.scaleY = 0.5;
		this.add(flower);

		// flower_1
		const flower_1 = new Flower(scene, -140, 188);
		flower_1.scaleX = 0.5;
		flower_1.scaleY = 0.5;
		this.add(flower_1);

		this.employee_1 = employee_1;
		this.employee_2 = employee_2;
		this.employee = employee;
		this.employee_3 = employee_3;
		this.employee_5 = employee_5;
		this.employee_4 = employee_4;
		this.employee_6 = employee_6;
		this.employee_7 = employee_7;
		this.employee_8 = employee_8;
		this.flower = flower;
		this.flower_1 = flower_1;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private employee_1: Employee;
	private employee_2: Employee;
	private employee: Employee;
	private employee_3: Employee;
	private employee_5: Employee;
	private employee_4: Employee;
	private employee_6: Employee;
	private employee_7: Employee;
	private employee_8: Employee;
	private flower: Flower;
	private flower_1: Flower;
	public roomId: number = 0;

	/* START-USER-CODE */

	// Write your code here.
	protected initializeEmployees(): void {
		const employeeSlots = [
			this.employee_1,
			this.employee_2,
			this.employee,
			this.employee_3,
			this.employee_4,
			this.employee_5,
			this.employee_6,
			this.employee_7,
			this.employee_8
		];
		this.setEmployees(employeeSlots);
	}
	protected initializeFurniture(): void {
		const furnitureSlots = [
			this.flower,
			this.flower_1
		];
		this.setFurniture(furnitureSlots);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
