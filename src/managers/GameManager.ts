//Main game manager, takes care of game state, player instance creation, global modifiers
//and selection menus

import { IGlobalModifier } from '../types/GameTypes';
import { EnemyManager } from '../managers/EnemyManager';
import { Player } from '../entities/Player';
import { Warrior } from '../entities/characters/Warrior';
import { Mage } from '../entities/characters/Mage';
import { Rogue } from '../entities/characters/Rogue';
import { Druid } from '../entities/characters/Druid';
import { Barbarian } from '../entities/characters/Barbarian';

export class GameManager {
    private static instance: GameManager;
    private game: Phaser.Game;
    private selectedCharacterType: string | null = null;
    private selectedMapId: string | null = null;
    private currentPlayer: Player | null = null;
    private globalModifiers: IGlobalModifier[];

    private constructor(game: Phaser.Game) {
        this.game = game;
        this.globalModifiers = [];
        this.loadGameState();

    }
    getGlobalModifiers(): IGlobalModifier[] {
        return this.globalModifiers;
    }

    addGlobalModifier(modifier: IGlobalModifier): void {
        this.globalModifiers.push(modifier);
    }

    static initialize(game: Phaser.Game): void {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager(game);
        }
    }

    static getInstance(): GameManager {
        if (!GameManager.instance) {
            throw new Error('GameManager must be initialized with a game instance first');
        }
        return GameManager.instance;
    }

    setSelectedCharacter(characterType: string): void {
        this.selectedCharacterType = characterType;
    }

    getSelectedCharacter(): string | null {
        return this.selectedCharacterType;
    }

    setSelectedMap(mapId: string): void {
        this.selectedMapId = mapId;
    }

    getSelectedMap(): string | null {
        return this.selectedMapId;
    }

    applyGameModifier(modifier: string): void {
        const enemyManager = EnemyManager.getInstance();
        switch(modifier) {
            case 'hardcore':
                enemyManager.addSpawnModifier('hardcore', (config) => ({
                    ...config,
                    health: config.health * 2,
                    damage: config.damage * 1.5
                }));
                break;
        }
    }
    
    loadSelectedMap(): void {
        if (!this.selectedMapId) {
            throw new Error('No map selected');
        }
    
        // Stop all scenes properly
        this.game.scene.scenes.forEach(scene => {
            this.game.scene.stop(scene.scene.key);
        });
    
        // Start fresh with new map and refresh scale
        this.game.scene.start(this.selectedMapId);
        this.game.scale.refresh();
    }


    loadGameState(): void {
        // Load saved game state
    }

    saveGameState(): void {
        // Save current game state
    }

    createPlayer(scene: Phaser.Scene, x: number, y: number): Player {
        if (!this.selectedCharacterType) {
            throw new Error('Character type not selected');
        }

        let player: Player;
        switch (this.selectedCharacterType) {
            case 'warrior':
                player = new Warrior(scene, x, y);
                break;
            case 'mage':
                player = new Mage(scene, x, y);
                break;
            case 'rogue':
                player = new Rogue(scene, x, y);
                break;
            case 'druid':
                player = new Druid(scene, x, y);
                break;
            case 'barbarian':
                player = new Barbarian(scene, x, y);
                break;
            default:
                throw new Error(`Unknown character type: ${this.selectedCharacterType}`);
        }

        this.currentPlayer = player;
        return player;
    }

    getCurrentPlayer(): Player | null {
        return this.currentPlayer;
    }
}