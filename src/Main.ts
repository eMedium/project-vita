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
        width: '100%',
        height: '100%',
        expandParent: false,
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
//const game = new Phaser.Game(config);

// Initialize managers with game instance
//GameManager.initialize(game);
//EnemyManager.initialize(game);
//InventoryManager.initialize(game);

// Handle window resizing
const gameDiv = document.getElementById('thegame');
const contentDiv = document.getElementById('content'); // Get the content div

if (gameDiv && contentDiv) {
    const setGameSize = () => {
        const contentRect = contentDiv.getBoundingClientRect();
        //game.scale.resize(contentRect.width, contentRect.height);
        //game.scale.refresh();
        console.log('Resized game to: ' + contentRect.width + 'x' + contentRect.height);
    };

    // Set initial game size
    setGameSize();

    // Observe content div for size changes
    const resizeObserver = new ResizeObserver(() => {
        //setGameSize();
    });
    resizeObserver.observe(contentDiv);

    // Also call setGameSize on window resize
    window.addEventListener('resize', () => {
        setGameSize();
    });
}