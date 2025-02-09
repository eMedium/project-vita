import Phaser from 'phaser';
import { Map1Scene } from '@/maps/map1/Map1Scene';
import { CharacterSelectScene } from '@/scenes/CharacterSelectScene';
import { MapSelectScene } from '@/scenes/MapSelectScene';
import { MenuScene } from '@/scenes/MenuScene';
import { PreloadAssets } from '@/scenes/PreloadScene';
import { GameManager } from '@/managers/GameManager';

export class PhaserGameManager {
    private static instance: PhaserGameManager | null = null;
    private static initialized: boolean = false;
    private static isInitializing: boolean = false;
    private game: Phaser.Game | null = null;

    private constructor() {
        if (PhaserGameManager.instance) {
            throw new Error('Use PhaserGameManager.getInstance()');
        }
        console.log('PhaserGameManager instance created');
    }

    public static getInstance(): PhaserGameManager {
        if (!PhaserGameManager.instance) {
            PhaserGameManager.instance = new PhaserGameManager();
        }
        return PhaserGameManager.instance;
    }

    public initializeGame(): Phaser.Game | null {
        // Check if already initialized or in the process of initializing
        if (PhaserGameManager.initialized || PhaserGameManager.isInitializing) {
            return this.game;
        }

        // Set the initializing flag
        PhaserGameManager.isInitializing = true;

        try {
            // Game configuration and creation

            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                parent: 'thegame',
                scale: {
                    mode: Phaser.Scale.NONE,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                physics: {
                    default: 'arcade',
                    arcade: {
                        debug: true,
                        debugShowBody: true,                         // show body debug
                        debugShowStaticBody: true,                   // show static body debug
                        debugShowVelocity: true,                     // show velocity debug 
                        gravity: { x: 0, y: 0 }
                    }
                },
                scene: [PreloadAssets,
                        MenuScene,
                        CharacterSelectScene,
                        MapSelectScene,
                        Map1Scene,]
            };

            this.game = new Phaser.Game(config);
            PhaserGameManager.initialized = true;
            GameManager.initialize(this.game);
            return this.game;
        } catch (error) {
            // Reset the flags in case of an error
            PhaserGameManager.initialized = false;
            PhaserGameManager.isInitializing = false;
            this.game = null;
            throw error;
        } finally {
            // Ensure the initializing flag is reset
            PhaserGameManager.isInitializing = false;
        }
    }

    public getGame(): Phaser.Game | null {
        return this.game;
    }

    public static destroyInstance(): void {
        if (PhaserGameManager.instance) {
            if (PhaserGameManager.instance.game) {
                PhaserGameManager.instance.game.events.on(Phaser.Core.Events.DESTROY, () => {
                });
                PhaserGameManager.instance.game.destroy(true);
            }
            PhaserGameManager.instance = null;
            PhaserGameManager.initialized = false;
        }
    }
}