import Phaser from 'phaser';
import { PreloadAssets } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { CharacterSelectScene } from './scenes/CharacterSelectScene';
import { MapSelectScene } from './scenes/MapSelectScene';
import { GameManager } from './managers/GameManager';
import { EnemyManager } from './managers/EnemyManager';
import { InventoryManager } from './managers/InventoryManager';
import { Map1Scene } from './maps/map1/Map1Scene';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'thegame',
        width: window.innerWidth,
        height: window.innerHeight,
        expandParent: true,
        autoRound: true
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
    scene: [
        PreloadAssets,
        MenuScene,
        CharacterSelectScene,
        MapSelectScene,
        Map1Scene,
    ]
};

// Initialize game instance
const game = new Phaser.Game(config);

// Initialize managers with game instance
GameManager.initialize(game);
//EnemyManager.initialize(game);
//InventoryManager.initialize(game);

// Handle window resizing
const gameDiv = document.getElementById('thegame');
if (gameDiv) {
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            game.scale.resize(width, height);
        }
    });
    resizeObserver.observe(gameDiv);
}