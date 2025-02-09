import logger from '@/logger/logger';
import { Furniture } from '@/store/officeSlice';
import Flower from '../Flower';
import BaseFurniture from './BaseFurniture';

export default class FlowerFurniture extends BaseFurniture {
    private flowerSprite: Flower;

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x, y);

        // Create flower sprite as a child
        this.flowerSprite = new Flower(scene, 0, 0);
        
        // Add animation if it doesn't exist
        if (!scene.anims.exists('flower001')) {
            scene.anims.create({
                key: 'flower001',
                frames: scene.anims.generateFrameNames('phaser-flower001', {
                    start: 1,
                    end: 70,
                    zeroPad: 4,
                    prefix: 'Kwiat_Frame',
                    suffix: '.png'
                }),
                frameRate: 24,
                repeat: -1,
                yoyo: true
            });
        }

        // Add sprite to container
        this.add(this.flowerSprite);
        
        // Initially hide the flower
        this.flowerSprite.setVisible(false);
        
        logger.debug(`FlowerFurniture created with UUID: ${this.uuid}`);
    }

    public setFurnitureData(data: Furniture): void {
        if (!data) {
            logger.error('No furniture data provided for flower');
            return;
        }

        logger.debug(`Setting furniture data for flower: ${JSON.stringify(data)}`);

        if (data.level > 0) {
            // Show and play animation if furniture is purchased/upgraded
            this.flowerSprite.setVisible(true);
        } else {
            // Hide if not purchased
            this.flowerSprite.setVisible(false);
        }
    }
}