
// You can write more code here

import OfficeSceneBase from "../base/OfficeSceneBase";
import Employee from "../prefabs/Employee";
import { initCameraWithBounds } from "../utils/cameraUtils";

/* START OF COMPILED CODE */

export default class Office1 extends OfficeSceneBase {


	constructor() {
		super("Office1");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// office_2_show_png
		const office_2_show_png = this.add.image(1542, 798, "offices-two-and-three", "office 2 show.png");
		office_2_show_png.scaleX = 2.5;
		office_2_show_png.scaleY = 2.5;
		// office_2_show_png.setVisible(false);

		// employee
		const employee = new Employee(this, 1960, 77);
		this.add.existing(employee);
		employee.scaleX = -0.25;
		employee.scaleY = 0.25;

		// employee_1
		const employee_1 = new Employee(this, 2263, 217);
		this.add.existing(employee_1);
		employee_1.scaleX = -0.25;
		employee_1.scaleY = 0.25;

		// employee_2
		const employee_2 = new Employee(this, 2044, 331);
		this.add.existing(employee_2);
		employee_2.scaleX = -0.25;
		employee_2.scaleY = 0.25;

		// employee_3
		const employee_3 = new Employee(this, 1737, 196);
		this.add.existing(employee_3);
		employee_3.scaleX = -0.25;
		employee_3.scaleY = 0.25;

		// employee_4
		const employee_4 = new Employee(this, 1477, 309);
		this.add.existing(employee_4);
		employee_4.scaleX = -0.25;
		employee_4.scaleY = 0.25;

		// employee_5
		const employee_5 = new Employee(this, 1755, 472);
		this.add.existing(employee_5);
		employee_5.scaleX = -0.25;
		employee_5.scaleY = 0.25;

		// chief
		const chief = new Employee(this, 1162, 166);
		this.add.existing(chief);
		chief.scaleX = 0.25;
		chief.scaleY = 0.25;

		this.events.emit("scene-awake");

		/* START-USER-ADD-TO-LIST */
		// Dodanie pracowników do listy po utworzeniu
		this.chief = chief;
		this.employeeObjects = [employee, employee_1, employee_2, employee_3, employee_4, employee_5];
		this.initializeScene();

		/* END-USER-ADD-TO-LIST */
	}

	/* START-USER-CODE */
	// Write your code here

	create() {
		this.editorCreate();

		// Initialize the camera with the utility function
		initCameraWithBounds(this, 4100, 2200, -500, -300);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
