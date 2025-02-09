
// You can write more code here

import OfficeSceneBase from "../base/OfficeSceneBase";
import Employee from "../prefabs/Employee";
import { initCameraWithBounds } from "../utils/cameraUtils";

/* START OF COMPILED CODE */

export default class Office2 extends OfficeSceneBase  {

	constructor() {
		super("Office2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// office_3_show_png
		const office_3_show_png = this.add.image(1530, 295, "offices-two-and-three", "office 3 show.png");
		office_3_show_png.scaleX = 2.5;
		office_3_show_png.scaleY = 2.5;

		// chief
		const chief = new Employee(this, 2134, -552);
		this.add.existing(chief);
		chief.scaleX = 0.25;
		chief.scaleY = 0.25;

		// employee
		const employee = new Employee(this, 1162, -603);
		this.add.existing(employee);
		employee.scaleX = 0.25;
		employee.scaleY = 0.25;

		// employee_1
		const employee_1 = new Employee(this, 1370, -486);
		this.add.existing(employee_1);
		employee_1.scaleX = 0.25;
		employee_1.scaleY = 0.25;

		// employee_2
		const employee_2 = new Employee(this, 1627, -354);
		this.add.existing(employee_2);
		employee_2.scaleX = 0.25;
		employee_2.scaleY = 0.25;

		// employee_3
		const employee_3 = new Employee(this, 1408, -228);
		this.add.existing(employee_3);
		employee_3.scaleX = 0.25;
		employee_3.scaleY = 0.25;

		// employee_4
		const employee_4 = new Employee(this, 1206, -346);
		this.add.existing(employee_4);
		employee_4.scaleX = 0.25;
		employee_4.scaleY = 0.25;

		// employee_5
		const employee_5 = new Employee(this, 961, -464);
		this.add.existing(employee_5);
		employee_5.scaleX = 0.25;
		employee_5.scaleY = 0.25;

		// employee_6
		const employee_6 = new Employee(this, 472, -283);
		this.add.existing(employee_6);
		employee_6.scaleX = 0.25;
		employee_6.scaleY = 0.25;

		// employee_7
		const employee_7 = new Employee(this, 205, -160);
		this.add.existing(employee_7);
		employee_7.scaleX = 0.25;
		employee_7.scaleY = 0.25;

		// employee_8
		const employee_8 = new Employee(this, -77, -18);
		this.add.existing(employee_8);
		employee_8.scaleX = 0.25;
		employee_8.scaleY = 0.25;

		// employee_9
		const employee_9 = new Employee(this, 717, -155);
		this.add.existing(employee_9);
		employee_9.scaleX = 0.25;
		employee_9.scaleY = 0.25;

		// employee_10
		const employee_10 = new Employee(this, 462, -14);
		this.add.existing(employee_10);
		employee_10.scaleX = 0.25;
		employee_10.scaleY = 0.25;

		this.events.emit("scene-awake");

		this.chief = chief;
		this.employeeObjects = [employee, employee_1, employee_2, employee_3, employee_4, employee_5, employee_6, employee_7, employee_8, employee_9, employee_10];
		this.initializeScene();
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		// Initialize the camera with the utility function
		initCameraWithBounds(this, 4100, 2600, -500, -1000);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
