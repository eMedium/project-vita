import { Player } from '../Player';

export class Rogue extends Player {
    static readonly BASE_STATS = {
        HEALTH: 150,
        SPEED: 200,
        DAMAGE: 40
    };

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'guapen'); // Use guapen texture
    }

    initializeStats(): void {
        this.stats = {
            // Base stats (unchangeable)
            baseHealth: Rogue.BASE_STATS.HEALTH,
            baseSpeed: Rogue.BASE_STATS.SPEED,
            baseDamage: Rogue.BASE_STATS.DAMAGE,
            
            // Current stats (start same as base)
            health: Rogue.BASE_STATS.HEALTH,
            speed: Rogue.BASE_STATS.SPEED,
            damage: Rogue.BASE_STATS.DAMAGE,
            
            // Progress stats
            level: 1,
            experience: 0
        };
    }

    useAbility(): void {
        // Rogue specific ability
    }
}