import { Player } from '../Player';

export class Druid extends Player {
    static readonly BASE_STATS = {
        HEALTH: 200,
        SPEED: 200,
        DAMAGE: 50
    };

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dino'); // Use dino texture
    
        this.setOrigin(0, 0);  
    
        this.setDisplaySize(100, 100);  // Visual size
        this.body?.setSize(150, 180);   // Collision size
        this.body?.setOffset(50, 50); // Offset to center collision box
    }

    initializeStats(): void {
        this.stats = {
            // Base stats (unchangeable)
            baseHealth: Druid.BASE_STATS.HEALTH,
            baseSpeed: Druid.BASE_STATS.SPEED,
            baseDamage: Druid.BASE_STATS.DAMAGE,
            
            // Current stats (start same as base)
            health: Druid.BASE_STATS.HEALTH,
            speed: Druid.BASE_STATS.SPEED,
            damage: Druid.BASE_STATS.DAMAGE,
            
            // Progress stats
            level: 1,
            experience: 0
        };
    }

    useAbility(): void {
        // Druid specific ability
    }
}