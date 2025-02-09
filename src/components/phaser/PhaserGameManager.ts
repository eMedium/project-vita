import Phaser from 'phaser';
import logger from '@/logger/logger';
import MainOfficeScene from '@/phaser/scenes/MainOfficeScene';
import { HsvColorReplacePipeline } from '@/phaser/shaders/HsvColorReplacePipeline';
import { Capacitor } from '@capacitor/core';
import { Map1Scene } from '@/maps/map1/Map1Scene';
import { CharacterSelectScene } from '@/scenes/CharacterSelectScene';
import { MapSelectScene } from '@/scenes/MapSelectScene';
import { MenuScene } from '@/scenes/MenuScene';
import { PreloadAssets } from '@/scenes/PreloadScene';

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
            logger.warn('Phaser game already initialized or in the process of initializing');
            return this.game;
        }

        // Set the initializing flag
        PhaserGameManager.isInitializing = true;
        logger.debug('[Phaser] Initializing Phaser game...');

        try {
            // Game configuration and creation
            class PreloadScene extends Phaser.Scene {
                constructor() {
                    super({ key: 'PreloadScene' });
                }

                preload() {
                    this.load.pack('asset-pack', 'assets/asset-pack.json');
                }

                create() {
                    const renderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
                    if (!renderer.pipelines.get('HsvColorReplacePipeline')) {
                        renderer.pipelines.add('HsvColorReplacePipeline', new HsvColorReplacePipeline(this.game));
                    }

                    this.events.once(Phaser.Scenes.Events.POST_UPDATE, () => {
                        logger.info('Starting MainOfficeScene');
                        this.scene.start('MainOfficeScene');
                    });
                }
            }

            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                parent: 'phaser-container',
                backgroundColor: '#282c34',
                scale: {
                    mode: Phaser.Scale.NONE,
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0, x: 0 },
                        debug: false
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
            return this.game;
        } catch (error) {
            // Reset the flags in case of an error
            PhaserGameManager.initialized = false;
            PhaserGameManager.isInitializing = false;
            this.game = null;
            logger.error('Failed to initialize Phaser game:', error);
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
                    logger.warn('Phaser game destroyed');
                });
                PhaserGameManager.instance.game.destroy(true);
            }
            PhaserGameManager.instance = null;
            PhaserGameManager.initialized = false;
        }
    }
}