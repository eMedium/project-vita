import OfficeSceneBase from "../base/OfficeSceneBase";
import Employee from "../prefabs/Employee";
import Flower from "../prefabs/Flower";
import { initCameraWithBounds } from "../utils/cameraUtils";  // Import the utility function

/* START OF COMPILED CODE */

export default class MainScene extends OfficeSceneBase  {

	constructor() {
		super("MainScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// offices_room_house_png
		const offices_room_house_png = this.add.image(1615, 807, "phaser-raw", "offices/room_house.png");
		offices_room_house_png.scaleX = 2.5;
		offices_room_house_png.scaleY = 2.5;

		// furniture_desk_lvl2_png
		this.add.image(1685, 852, "phaser-raw", "furniture/desk_lvl2.png");

		// employee
		const employee = new Employee(this, 1761, 1183);
		this.add.existing(employee);
		employee.scaleX = 0.5;
		employee.scaleY = 0.5;

		// furniture_CPU_maker_png
		const furniture_CPU_maker_png = this.add.image(2263, 996, "phaser-raw", "furniture/CPU_maker.png");
		furniture_CPU_maker_png.flipX = true;

		// furniture_monitor70s_png
		this.add.image(1513, 726, "phaser-raw", "furniture/monitor70s.png");

		// furniture_board_png
		this.add.image(1255, 527, "phaser-raw", "furniture/board.png");

		// human_chair_png
		this.add.image(1650, 948, "phaser-raw", "human/chair.png");

		// flower
		const flower = new Flower(this, 1250, 933);
		this.add.existing(flower);

		this.events.emit("scene-awake");

		this.chief = employee;
		this.initializeScene();
	
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		// Initialize the camera with the utility function
		initCameraWithBounds(this, 3400, 1600);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
