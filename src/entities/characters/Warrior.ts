import { Player } from '../Player';

export class Warrior extends Player {
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
            baseHealth: Warrior.BASE_STATS.HEALTH,
            baseSpeed: Warrior.BASE_STATS.SPEED,
            baseDamage: Warrior.BASE_STATS.DAMAGE,
            
            // Current stats (start same as base)
            health: Warrior.BASE_STATS.HEALTH,
            speed: Warrior.BASE_STATS.SPEED,
            damage: Warrior.BASE_STATS.DAMAGE,
            
            // Progress stats
            level: 1,
            experience: 0
        };
    }

    useAbility(): void {
        // Warrior specific ability
    }
}