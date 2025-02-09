
// You can write more code here

import Employee from "../Employee";
import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class DevelopmentRoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -109, y ?? -92);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_3
		const room_3 = scene.add.image(109, 92, "Room_3");
		this.add(room_3);

		// employee
		const employee = new Employee(scene, 0, -199);
		employee.scaleX = 0.25;
		employee.scaleY = 0.25;
		this.add(employee);

		// employee_1
		const employee_1 = new Employee(scene, 197, -64);
		employee_1.scaleX = 0.25;
		employee_1.scaleY = 0.25;
		this.add(employee_1);

		// employee_2
		const employee_2 = new Employee(scene, 386, 75);
		employee_2.scaleX = 0.25;
		employee_2.scaleY = 0.25;
		this.add(employee_2);

		// employee_3
		const employee_3 = new Employee(scene, 561, 185);
		employee_3.scaleX = 0.25;
		employee_3.scaleY = 0.25;
		this.add(employee_3);

		// employee_4
		const employee_4 = new Employee(scene, 340, 285);
		employee_4.scaleX = 0.25;
		employee_4.scaleY = 0.25;
		this.add(employee_4);

		// flower
		const flower = new Flower(scene, -349, 20);
		flower.scaleX = 0.5;
		flower.scaleY = 0.5;
		this.add(flower);

		this.employee = employee;
		this.employee_1 = employee_1;
		this.employee_2 = employee_2;
		this.employee_3 = employee_3;
		this.employee_4 = employee_4;
		this.flower = flower;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private employee: Employee;
	private employee_1: Employee;
	private employee_2: Employee;
	private employee_3: Employee;
	private employee_4: Employee;
	private flower: Flower;

	/* START-USER-CODE */

	// Write your code here.
	protected initializeEmployees(): void {
		const employeeSlots = [
			this.employee,
			this.employee_1,
			this.employee_2,
			this.employee_3,
			this.employee_4
		];
		this.setEmployees(employeeSlots);
	}

	protected initializeFurniture(): void {
		const furnitureSlots = [
			this.flower
		];
		this.setFurniture(furnitureSlots);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
