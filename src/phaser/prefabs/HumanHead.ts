
// You can write more code here

import { addHsvShader } from "../utils/shaderUtils";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class HumanHead extends Phaser.GameObjects.Container {
	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? -232);

		// human_man_hair1_png
		const human_man_hair1_png = scene.add.image(0, 0, "phaser-raw", "human/man_hair1.png");
		this.add(human_man_hair1_png);

		// human_man_hair2_png
		const human_man_hair2_png = scene.add.image(0, 0, "phaser-raw", "human/man_hair2.png");
		human_man_hair2_png.visible = false;
		this.add(human_man_hair2_png);

		// human_women_hair1_png
		const human_women_hair1_png = scene.add.image(0, 0, "phaser-raw", "human/women_hair1.png");
		human_women_hair1_png.visible = false;
		this.add(human_women_hair1_png);

		// human_women_hair2_png
		const human_women_hair2_png = scene.add.image(0, 0, "phaser-raw", "human/women_hair2.png");
		human_women_hair2_png.visible = false;
		this.add(human_women_hair2_png);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.hairImages = [human_man_hair1_png, human_man_hair2_png, human_women_hair1_png, human_women_hair2_png];
		/* END-USER-CTR-CODE */
	}

	public head_type: number = 0;

	/* START-USER-CODE */

	// Write your code here.
	private hairImages: Phaser.GameObjects.Image[];


	// Metoda do ustawienia head_type
	public setHeadType(headType: number, skinColor: string) {
		this.head_type = Phaser.Math.Clamp(headType, 0, 3); // Zabezpieczenie przed przekroczeniem zakresu
	
		// Ukryj wszystkie obrazy włosów
		this.hairImages.forEach(image => {
			image.visible = false;
		});
	
		// Pokaż odpowiedni obraz na podstawie head_type
		const selectHead = this.hairImages[this.head_type];
		selectHead.visible = true;
	
		// Połączona paleta kolorów dla włosów i brody
		const hairAndBeardColorPalette = ['#D93800', '#FF5733', '#C70039', '#900C3F', '#FFC300', '#DAF7A6', '#581845', '#1F618D'];
		// Oddzielna paleta kolorów dla kolczyków
		const earringColorPalette = ['#FFD700', '#C0C0C0', '#FF69B4', '#8B4513', '#CD853F', '#4682B4', '#00FA9A', '#FF4500'];
		// Oddzielna paleta kolorów dla frotek/gumek do włosów
		const hairBandColorPalette = ['#FF69B4', '#8A2BE2', '#32CD32', '#FF1493', '#FFD700', '#4B0082', '#FF6347', '#20B2AA'];
	
		// Wylosowanie kolorów dla poszczególnych elementów
		const selectedHairColor = Phaser.Math.RND.pick(hairAndBeardColorPalette);
		const selectedBeardColor = Phaser.Math.RND.pick(hairAndBeardColorPalette);
		const selectedEarringColor = Phaser.Math.RND.pick(earringColorPalette);
		const selectedHairBandColor = Phaser.Math.RND.pick(hairBandColorPalette);
	
	
		// Zastosowanie kolorów w mapowaniu
		const colorMappingsEmpleyee = [
			{ oldColorRange: { hue: [0, 2] as [number, number], tolerance: 1 }, newColor: selectedBeardColor }, // broda
			{ oldColorRange: { hue: [269, 269] as [number, number], tolerance: 1 }, newColor: selectedHairColor }, // włosy
			{ oldColorRange: { hue: [32, 32] as [number, number], tolerance: 1 }, newColor: selectedEarringColor }, // kolczyki
			{ oldColorRange: { hue: [156, 156] as [number, number], tolerance: 1 }, newColor: selectedHairBandColor }, // frotka/gumka do włosów
			{ oldColorRange: { hue: [203, 204] as [number, number], tolerance: 4 }, newColor: skinColor }, // cera
		];
	
		// Nałóż shader z odpowiednimi kolorami
		addHsvShader(selectHead, colorMappingsEmpleyee);
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
