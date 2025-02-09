
// You can write more code here

import Employee from "../Employee";
import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class ResearchRoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_4
		const room_4 = scene.add.image(267, 22, "Room_4");
		this.add(room_4);

		// employee
		const employee = new Employee(scene, -129, -25);
		employee.scaleX = 0.25;
		employee.scaleY = 0.25;
		this.add(employee);

		// employee_1
		const employee_1 = new Employee(scene, 102, -150);
		employee_1.scaleX = 0.25;
		employee_1.scaleY = 0.25;
		this.add(employee_1);

		// employee_2
		const employee_2 = new Employee(scene, 373, -298);
		employee_2.scaleX = 0.25;
		employee_2.scaleY = 0.25;
		this.add(employee_2);

		// flower
		const flower = new Flower(scene, 554, -219);
		flower.scaleX = 0.5;
		flower.scaleY = 0.5;
		this.add(flower);

		// flower_1
		const flower_1 = new Flower(scene, 650, -172);
		flower_1.scaleX = 0.5;
		flower_1.scaleY = 0.5;
		this.add(flower_1);

		this.employee = employee;
		this.employee_1 = employee_1;
		this.employee_2 = employee_2;
		this.flower = flower;
		this.flower_1 = flower_1;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private employee: Employee;
	private employee_1: Employee;
	private employee_2: Employee;
	private flower: Flower;
	private flower_1: Flower;

	/* START-USER-CODE */
	protected initializeEmployees(): void {
		const employeeSlots = [
			this.employee,
			this.employee_1,
			this.employee_2,
		];

		this.setEmployees(employeeSlots);
	}
	
	protected initializeFurniture(): void {
		const furnitureSlots = [
			this.flower,
			this.flower_1,
		];

		this.setFurniture(furnitureSlots);
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
