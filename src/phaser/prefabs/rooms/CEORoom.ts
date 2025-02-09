// You can write more code here

import Employee from "../Employee";
import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class CEORoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -87, y ?? 0);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_1
		const room_1 = scene.add.image(87, 0, "Room_1");
		this.add(room_1);

		// employee
		const employee = new Employee(scene, -172, -207);
		employee.scaleX = 0.25;
		employee.scaleY = 0.25;
		this.add(employee);

		// flower
		const flower = new Flower(scene, -53, -257);
		flower.scaleX = 0.562456705516718;
		flower.scaleY = 0.5857079585925713;
		this.add(flower);

		this.employee = employee;
		this.flower = flower;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private employee: Employee;
	private flower: Flower;

	protected initializeEmployees(): void {
		const employeeSlots = [
			this.employee
		];
		this.setEmployees(employeeSlots);
	}

	protected initializeFurniture(): void {
		const furnitureSlots = [
            this.flower
        ];
        this.setFurniture(furnitureSlots);
	}
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
