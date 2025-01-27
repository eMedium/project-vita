//Takes care of spawning enemies on maps and handling waves

import { Enemy } from '../entities/Enemy';
import { IEnemyConfig } from '../types/EnemyTypes';

type EnemyConstructor = new (scene: Phaser.Scene, x: number, y: number, config: IEnemyConfig) => Enemy;

export class EnemyManager {
    private static instance: EnemyManager;
    private scene: Phaser.Scene;
    private enemyGroups: Map<string, Phaser.GameObjects.Group>;
    private spawnModifiers: Map<string, (config: IEnemyConfig) => IEnemyConfig>;
    private enemyConfigs: Map<string, IEnemyConfig>;
    private enemyClasses: Map<string, EnemyConstructor>;
    
    private constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.enemyGroups = new Map();
        this.spawnModifiers = new Map();
        this.enemyConfigs = new Map();
        this.enemyClasses = new Map();
    }

    static getInstance(scene?: Phaser.Scene): EnemyManager {
        if (!EnemyManager.instance && scene) {
            EnemyManager.instance = new EnemyManager(scene);
        }
        return EnemyManager.instance;
    }

    
    // Register new enemy types with their spawn configurations
    registerEnemyType(type: string, config: IEnemyConfig, enemyClass: EnemyConstructor): void {
        const group = this.scene.add.group();
        this.enemyGroups.set(type, group);
        this.enemyConfigs.set(type, config);  // Store the config
        this.enemyClasses.set(type, enemyClass);
    }

    // Get EnemyConfigs by type
    private getEnemyConfig(type: string): IEnemyConfig {
        const config = this.enemyConfigs.get(type);
        if (!config) {
            throw new Error(`Enemy type '${type}' not registered`);
        }
        return config;
    }

    // Add spawn modifiers (from items, map objects, etc.)
    addSpawnModifier(id: string, modifier: (config: IEnemyConfig) => IEnemyConfig): void {
        this.spawnModifiers.set(id, modifier);
    }

    // Spawn enemy with all active modifiers applied
    spawnEnemy(type: string, x: number, y: number): void {
        const baseConfig = this.getEnemyConfig(type);
        const EnemyClass = this.enemyClasses.get(type);

        if (!EnemyClass) {
            throw new Error(`Enemy class for type '${type}' not registered`);
        }

        let finalConfig = { ...baseConfig };

        // Apply all active modifiers
        this.spawnModifiers.forEach(modifier => {
            finalConfig = modifier(finalConfig);
        });

        // Create specific enemy instance with modified config
        const enemy = new EnemyClass(this.scene, x, y, finalConfig);
        this.enemyGroups.get(type)?.add(enemy);
    }


    /*
    // Handle wave-based spawning
    startWave(waveConfig: IWaveConfig): void {
        // Wave spawning logic
    }
    */

    // Clean up when changing maps
    clearEnemies(): void {
        this.enemyGroups.forEach(group => group.clear(true, true));
    }
}