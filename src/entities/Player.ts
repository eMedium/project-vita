import { IPlayerStats } from '../types/PlayerTypes';
import { IGlobalModifier } from '../types/GameTypes';
import { ItemStats } from '../types/ItemTypes';
import { Inventory } from '../types/ItemTypes';
import { GameManager } from '../managers/GameManager';

export abstract class Player extends Phaser.Physics.Arcade.Sprite {
    protected stats: IPlayerStats;
    protected inventory: Inventory;
    protected modifiers: Map<string, (stats: IPlayerStats) => void>;
    protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    protected wasdKeys: {
        W: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.modifiers = new Map();
        this.inventory = new Inventory();

        // Enable physics and make sprite visible
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setDepth(1); // Set depth to appear above background
    
        if (!this.body) {
            throw new Error('Physics body not created for player');
        }

        // Initialize base stats from specific class
        this.initializeStats();
        
        // Apply global modifiers from GameManager
        this.applyGlobalModifiers();
        
        // Apply inventory item modifiers
        this.applyInventoryModifiers();

        // Check if input manager exists
        if (!scene.input?.keyboard) {
            throw new Error('Keyboard input manager not available');
        }

        // Initialize movement controls
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasdKeys = {
            W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
    }

    // Handle movement in update
    update(): void {
        // Reset velocity
        let moveX = 0;
        let moveY = 0;

        // Check arrow keys
        if (this.cursors.left.isDown || this.wasdKeys.A.isDown) {
            moveX = -1;
        } else if (this.cursors.right.isDown || this.wasdKeys.D.isDown) {
            moveX = 1;
        }

        if (this.cursors.up.isDown || this.wasdKeys.W.isDown) {
            moveY = -1;
        } else if (this.cursors.down.isDown || this.wasdKeys.S.isDown) {
            moveY = 1;
        }

        // Normalize diagonal movement
        if (moveX !== 0 && moveY !== 0) {
            const normalize = Math.SQRT1_2; // 1/√2
            moveX *= normalize;
            moveY *= normalize;
        }

        // Apply movement
        if (moveX !== 0 || moveY !== 0) {
            this.setMovementVelocity(moveX, moveY);
        } else {
            this.stopMovement();
        }
    }

    abstract initializeStats(): void;
    abstract useAbility(): void;

    getInventory(): Inventory {
        return this.inventory;
    }

    protected setMovementVelocity(x: number, y: number): void {
        if (this.body) {
            // Use current speed that includes all modifiers
            const currentSpeed = this.getCurrentSpeed();
            this.setVelocity(
                x * currentSpeed,
                y * currentSpeed
            );
        }
    }

    protected getCurrentSpeed(): number {
        // Start with current speed (already includes base + global mods)
        let speed = this.stats.speed;
        
        // Apply any temporary modifiers
        this.modifiers.forEach(modifier => {
            const currentStats = { ...this.stats };
            modifier(currentStats);
            speed = currentStats.speed;
        });

        return speed;
    }

    protected applyGlobalModifiers(): void {
        const gameManager = GameManager.getInstance();
        const globalModifiers: IGlobalModifier[] = gameManager.getGlobalModifiers();
        
        globalModifiers.forEach((modifier: IGlobalModifier) => {
            this.stats.speed = this.stats.baseSpeed * modifier.speedMultiplier;
            this.stats.health = this.stats.baseHealth * modifier.healthMultiplier;
            this.stats.damage = this.stats.baseDamage * modifier.damageMultiplier;
        });
    }

    protected applyInventoryModifiers(): void {
        if (this.inventory) {
            this.inventory.getItems().forEach(item => {
                if (item.stats) {
                    const itemStats = item.stats as ItemStats;
                    this.stats.speed += itemStats.speedBonus || 0;
                    this.stats.health += itemStats.healthBonus || 0;
                    this.stats.damage += itemStats.damageBonus || 0;
                }
            });
        }
    }

    // Add/remove modifiers
    addModifier(id: string, modifier: (stats: IPlayerStats) => void): void {
        this.modifiers.set(id, modifier);
        this.updateStats();
    }

    removeModifier(id: string): void {
        this.modifiers.delete(id);
        this.updateStats();
    }

    // Update all stats based on modifiers
    protected updateStats(): void {
        // Reset current stats to base values
        this.stats.speed = this.stats.baseSpeed;
        this.stats.health = this.stats.baseHealth;
        this.stats.damage = this.stats.baseDamage;
        
        // Apply global modifiers first
        this.applyGlobalModifiers();
        
        // Apply inventory modifiers next
        this.applyInventoryModifiers();
        
        // Apply temporary modifiers last
        this.modifiers.forEach(modifier => {
            modifier(this.stats);
        });
    }

    protected stopMovement(): void {
        this.setVelocity(0, 0);
    }
}