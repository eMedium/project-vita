import { IEnemyConfig, ElementType } from '../types/EnemyTypes';
import { Player } from './Player';

export abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
    protected config: IEnemyConfig;
    protected currentHealth: number;
    protected isStunned: boolean = false;
    protected canMove: boolean = true;
    protected lastAttackTime: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, config: IEnemyConfig) {
        super(scene, x, y, config.type.toLowerCase());
        this.config = config;
        this.currentHealth = config.health;

        // Enable physics
        scene.physics.add.existing(this);

        if (!this.body) {
            throw new Error('Physics body not created for enemy');
        }
        
        // Set collision bounds
        this.setSize(32, 32); // Adjust based on sprite size
        
        // Initialize movement
        this.setVelocity(0, 0);
    }

    // Abstract methods that specific enemies must implement
    abstract update(): void;
    abstract attack(): void;
    abstract die(): void;
    abstract moveToward(target: Player): void;

    // Shared methods all enemies can use
    takeDamage(amount: number, type: ElementType): void {
        let finalDamage = amount;

        // Apply vulnerabilities (more damage)
        if (this.config.vulnerabilities?.includes(type)) {
            finalDamage *= 1.5;
        }

        // Apply resistances (less damage)
        if (this.config.resistances?.includes(type)) {
            finalDamage *= 0.5;
        }

        this.currentHealth -= finalDamage;

        if (this.currentHealth <= 0) {
            this.die();
        }
    }

    // Helper methods for common movement patterns
    protected calculateAngleToTarget(target: Player): number {
        return Phaser.Math.Angle.Between(
            this.x, 
            this.y, 
            target.x, 
            target.y
        );
    }

    protected setVelocityTowardsAngle(angle: number, speed?: number): void {
        if (this.isStunned || !this.canMove) return;
        
        if (this.body) {  // Add null check for physics body
            this.scene.physics.velocityFromRotation(
                angle,
                speed || this.config.speed,
                this.body.velocity
            );
        }
    }

    protected stopMovement(): void {
        this.setVelocity(0, 0);
    }

    canAttack(): boolean {
        const now = Date.now();
        if (now - this.lastAttackTime >= (this.config.attackSpeed || 1000)) {
            this.lastAttackTime = now;
            return true;
        }
        return false;
    }


    stun(duration: number): void {
        this.isStunned = true;
        this.setVelocity(0, 0);
        
        this.scene.time.delayedCall(duration, () => {
            this.isStunned = false;
        });
    }

    getConfig(): IEnemyConfig {
        return { ...this.config };
    }

    getCurrentHealth(): number {
        return this.currentHealth;
    }
}