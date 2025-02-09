
// You can write more code here

import Flower from "../Flower";
import BaseRoom from "./BaseRoom";

/* START OF COMPILED CODE */

export default class ToiletRoom extends BaseRoom {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? -136);

		this.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// room_Toilet
		const room_Toilet = scene.add.image(0, 136, "Room_Toilet");
		this.add(room_Toilet);

		// flower
		const flower = new Flower(scene, 110, -41);
		flower.scaleX = 0.25;
		flower.scaleY = 0.25;
		this.add(flower);

		// flower_1
		const flower_1 = new Flower(scene, 251, 46);
		flower_1.scaleX = 0.25;
		flower_1.scaleY = 0.25;
		this.add(flower_1);

		// flower_2
		const flower_2 = new Flower(scene, 373, 106);
		flower_2.scaleX = 0.25;
		flower_2.scaleY = 0.25;
		this.add(flower_2);

		// flower_3
		const flower_3 = new Flower(scene, 30, -86);
		flower_3.scaleX = 0.25;
		flower_3.scaleY = 0.25;
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
		// Toilet room doesn't have employees
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
