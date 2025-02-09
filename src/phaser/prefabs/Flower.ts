import logger from '@/logger/logger';
import BaseFurniture from './furnitures/BaseFurniture';
import { Furniture } from '@/store/officeSlice';

// You can write more code here

/* START OF COMPILED CODE */

export default class Flower extends BaseFurniture {
    private flowerSprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);
        
        // Create flower sprite
        this.flowerSprite = scene.add.sprite(0, 0, "phaser-flower001", "Kwiat_Frame0001.png");
        this.add(this.flowerSprite);

        // Play animation
        this.flowerSprite.play("flower001");

        logger.debug(`Flower created with UUID: ${this.uuid}`);

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    public setFurnitureData(data: Furniture): void {

        if(!data) {
           logger.error('No data provided for flower');
        }
        // Implement furniture data handling if needed
        if (data.level > 0) {
            this.flowerSprite.setVisible(true);
        }else{
            this.flowerSprite.setVisible(false);
        }
    }

    destroy(fromScene?: boolean) {
        if (this.flowerSprite) {
            this.flowerSprite.destroy();
        }
        super.destroy(fromScene);
    }

    /* START-USER-CODE */

    // Write your code here.

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
