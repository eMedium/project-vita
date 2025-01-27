import { Enemy } from '../../../entities/Enemy';
import { IEnemyConfig, EnemyType, ElementType } from '../../../types/EnemyTypes';
import { GameManager } from '../../../managers/GameManager';
import { Player } from '../../../entities/Player';

export class Bat extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number, config: IEnemyConfig) {
        super(scene, x, y, config);
    }

    update(): void {
        // Get the current player instance from GameManager
        const player = GameManager.getInstance().getCurrentPlayer();
        
        if (player && player instanceof Player) {
            const distance = Phaser.Math.Distance.Between(
                this.x, 
                this.y, 
                player.x, 
                player.y
            );
            
            if (distance <= this.config.attackRange! * 32) {
                if (this.canAttack()) {
                    this.attack();
                }
            } else if (distance <= this.config.aggroRange! * 32) {
                this.moveToward(player);
            }
        }
    }

    moveToward(target: Player): void {
        // Bats move in a more erratic pattern
        const angle = this.calculateAngleToTarget(target);
        // Add slight randomness to movement
        const randomOffset = Phaser.Math.FloatBetween(-0.5, 0.5);
        this.setVelocityTowardsAngle(angle + randomOffset);
    }

    attack(): void {
        // Zombie specific attack logic
        // For example, slow but powerful melee attack
    }

    die(): void {
        // Zombie specific death effects
        // Maybe spawn some loot
        this.destroy();
    }
}

export const batConfig: IEnemyConfig = {
    type: EnemyType.BAT,
    speed: 10,
    health: 50,
    damage: 10,
    vulnerabilities: [ElementType.ICE],
    resistances: [ElementType.PHYSICAL],
    attackRange: 1,
    aggroRange: 8,
    attackSpeed: 2,
    texture: 'bat'
};