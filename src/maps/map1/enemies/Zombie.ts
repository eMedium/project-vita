import { Enemy } from '../../../entities/Enemy';
import { IEnemyConfig, EnemyType, ElementType } from '../../../types/EnemyTypes';
import { GameManager } from '../../../managers/GameManager';
import { Player } from '../../../entities/Player';

export class Zombie extends Enemy {

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
        const angle = this.calculateAngleToTarget(target);
        this.setVelocityTowardsAngle(angle);
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

export const zombieConfig: IEnemyConfig = {
    type: EnemyType.ZOMBIE,
    speed: 4,
    health: 100,
    damage: 15,
    vulnerabilities: [ElementType.FIRE],
    resistances: [ElementType.POISON],
    attackRange: 1,
    aggroRange: 5,
    attackSpeed: 1,
    texture: 'guapen'
};