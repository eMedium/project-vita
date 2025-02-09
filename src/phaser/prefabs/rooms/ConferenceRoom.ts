
// You can write more code here

import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class ConferenceRoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -4, y ?? -269);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_5
		const room_5 = scene.add.image(4, 269, "Room_5");
		this.add(room_5);

		// flower
		const flower = new Flower(scene, 24, -6);
		flower.scaleX = 0.25;
		flower.scaleY = 0.25;
		this.add(flower);

		// flower_1
		const flower_1 = new Flower(scene, 117, 42);
		flower_1.scaleX = 0.25;
		flower_1.scaleY = 0.25;
		this.add(flower_1);

		// flower_2
		const flower_2 = new Flower(scene, -96, 60);
		flower_2.scaleX = 0.25;
		flower_2.scaleY = 0.25;
		this.add(flower_2);

		// flower_3
		const flower_3 = new Flower(scene, 36, 243);
		flower_3.scaleX = 1;
		flower_3.scaleY = 1;
		this.add(flower_3);

		this.flower = flower;
		this.flower_1 = flower_1;
		this.flower_2 = flower_2;
		this.flower_3 = flower_3;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private flower: Flower;
	private flower_1: Flower;
	private flower_2: Flower;
	private flower_3: Flower;

	/* START-USER-CODE */

	// Write your code here.
	protected initializeEmployees(): void {
		// Conference room doesn't have employees
		this.employees = [];
	}

	protected initializeFurniture(): void {
		const furnitureSlots = [
			this.flower,
			this.flower_1,
			this.flower_2,
			this.flower_3
		];
		this.setFurniture(furnitureSlots);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
