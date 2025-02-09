import { v4 as uuidv4 } from 'uuid';
import logger from '@/logger/logger';
import { Furniture } from '@/store/officeSlice';

export default abstract class BaseFurniture extends Phaser.GameObjects.Container {
    public readonly uuid: string;
    
    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);
        this.uuid = uuidv4();
        logger.debug(`Furniture created with UUID: ${this.uuid}`);
    }

    public abstract setFurnitureData(data: Furniture): void;
}