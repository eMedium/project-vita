import { addHsvShader } from "../utils/shaderUtils";
import HumanHead from "./HumanHead";
import { v4 as uuidv4 } from 'uuid';
import logger from '@/logger/logger';

/* START OF COMPILED CODE */

export default class Employee extends Phaser.GameObjects.Container {

	public seed: number = 0;
	public skin_color: string = "#D93800";
	public readonly uuid: string;

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 442, y ?? -57);
		this.uuid = uuidv4();
		logger.debug(`Employee created with UUID: ${this.uuid}`);

		// human_siedzenie_krzes_a_png
		const human_siedzenie_krzes_a_png = scene.add.image(-188, 323, "phaser-raw", "human/siedzenie_krzesła.png");
		this.add(human_siedzenie_krzes_a_png);

		// human_table_png
		const human_table_png = scene.add.image(-240, 370, "phaser-raw", "human/table.png");
		human_table_png.scaleX = 2;
		human_table_png.scaleY = 2;
		this.add(human_table_png);

		// human_papers_png
		const human_papers_png = scene.add.image(-224, 168, "phaser-raw", "human/papers.png");
		human_papers_png.scaleX = 2;
		human_papers_png.scaleY = 2;
		this.add(human_papers_png);

		// human_man_pants1_png
		const human_man_pants1_png = scene.add.image(-171, 326, "phaser-raw", "human/man_pants1.png");
		this.add(human_man_pants1_png);

		// human_women_skirt1_png
		const human_women_skirt1_png = scene.add.image(-171, 326, "phaser-raw", "human/women_skirt1.png");
		this.add(human_women_skirt1_png);

		// humanHead
		const humanHead = new HumanHead(scene, -175, 328);
		this.add(humanHead);

		// human_work001
		const human_work001 = scene.add.sprite(-184, 333, "phaser-raw", "animation_human/animation_human0001.png");
		human_work001.scaleX = 2;
		human_work001.scaleY = 2;
		human_work001.play("human_work001");
		this.add(human_work001);

		// human_oparcie_krzes_a_png
		const human_oparcie_krzes_a_png = scene.add.image(-192, 296, "phaser-raw", "human/oparcie_krzesła.png");
		this.add(human_oparcie_krzes_a_png);

		// humanHead (prefab fields)
		humanHead.head_type = 1;

		/* START-USER-CTR-CODE */
		this.human_siedzenie_krzes_a_png = human_siedzenie_krzes_a_png;
		this.human_oparcie_krzes_a_png = human_oparcie_krzes_a_png;
		this.human_man_pants1_png = human_man_pants1_png;
		this.human_women_skirt1_png = human_women_skirt1_png;
		this.human_work001 = human_work001;
		this.humanHead = humanHead;
		/* END-USER-CTR-CODE */

		// this.visible = false;
	}

	/* START-USER-CODE */

	// Deklaracja właściwości
	private human_siedzenie_krzes_a_png: Phaser.GameObjects.Image;
	private human_oparcie_krzes_a_png: Phaser.GameObjects.Image;
	private human_man_pants1_png: Phaser.GameObjects.Image;
	private human_women_skirt1_png: Phaser.GameObjects.Image;
	private human_work001: Phaser.GameObjects.Sprite;
	private humanHead: HumanHead;

	setSeed(seed: number) {
		this.seed = seed;
		logger.debug(`Setting seed for Employee ${this.uuid}: ${seed}`);
		
		// Check if scene and required objects are ready
		if (!this.scene?.sys?.settings?.active) {
			logger.warn(`Scene not ready for Employee ${this.uuid}, skipping setSeed`);
			return;
		}

		// Check if all required textures are loaded
		if (!this.human_siedzenie_krzes_a_png?.scene ||
			!this.human_oparcie_krzes_a_png?.scene ||
			!this.human_man_pants1_png?.scene ||
			!this.human_women_skirt1_png?.scene ||
			!this.human_work001?.scene ||
			!this.humanHead?.scene) {
			console.warn('Required textures not ready, skipping setSeed');
			return;
		}

		try {
			Phaser.Math.RND.sow([seed.toString()]);

			// Losowanie płci
			const isMale = Phaser.Math.RND.between(0, 1) === 0;

			// Losowanie typu głowy na podstawie płci
			const headType = isMale ? Phaser.Math.RND.between(0, 1) : Phaser.Math.RND.between(2, 3);

			// Ukrywanie i pokazywanie odpowiedniego stroju
			this.human_man_pants1_png.setVisible(isMale); // Jeśli male, pokaż spodnie
			this.human_women_skirt1_png.setVisible(!isMale); // Jeśli female, pokaż sukienkę

			// Palety kolorów dla elementów
			const pantsPalette = ['#D93800', '#003F7D', '#28A745'];
			const shirtPalette = ['#0094FF', '#FF0000', '#FFD700'];
			const chairPalette = ['#D93800', '#8B4513', '#4682B4'];
			const shoesPalette = ['#D93800', '#000000', '#654321'];
			const skinPalette = ['#D93800', '#F4A460', '#FFE4C4'];

			// Losowanie kolorów
			const pantsColor = Phaser.Math.RND.pick(pantsPalette);
			const shirtColor = Phaser.Math.RND.pick(shirtPalette);
			const chairColor = Phaser.Math.RND.pick(chairPalette);
			const shoesColor = Phaser.Math.RND.pick(shoesPalette);
			const skinColor = Phaser.Math.RND.pick(skinPalette);

			// Mapowanie kolorów
			const colorMappingsEmployee = [
				{ oldColorRange: { hue: [80, 90] as [number, number], tolerance: 1 }, newColor: pantsColor }, // spodnie
				{ oldColorRange: { hue: [0, 5] as [number, number], tolerance: 1 }, newColor: shirtColor },  // bluza
				{ oldColorRange: { hue: [138, 140] as [number, number], tolerance: 1 }, newColor: chairColor }, // krzesło
				{ oldColorRange: { hue: [56, 59] as [number, number], tolerance: 1 }, newColor: shoesColor },  // buty
				{ oldColorRange: { hue: [203, 204] as [number, number], tolerance: 4 }, newColor: skinColor },  // cera
			];

			// Aplikowanie shaderów
			addHsvShader(this.human_siedzenie_krzes_a_png, colorMappingsEmployee);
			addHsvShader(this.human_oparcie_krzes_a_png, colorMappingsEmployee);
			addHsvShader(this.human_man_pants1_png, colorMappingsEmployee);
			addHsvShader(this.human_women_skirt1_png, colorMappingsEmployee);
			addHsvShader(this.human_work001, colorMappingsEmployee);

			this.humanHead.setHeadType(headType, skinColor);

			const totalFrames = this.human_work001.anims.currentAnim?.getTotalFrames() ?? 0;
			const randomFrame = Phaser.Math.RND.between(0, totalFrames);
			const animationTimeScale = Phaser.Math.RND.realInRange(0.75, 1.25); // Skala animacji losowa (0.5-1.5)

			const randomDelay = Phaser.Math.RND.between(0, 2000); // Opóźnienie losowe w milisekundach (0-2 sekundy)
			this.human_work001.stop(); // Zatrzymanie animacji
			this.human_work001.play({
				key: 'human_work001',
				delay: randomDelay,
				startFrame: randomFrame, // Ustawienie losowego startu klatki
				timeScale: animationTimeScale
			});
		} catch (error) {
			console.error('Error in setSeed:', error);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
