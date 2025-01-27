import { GameManager } from '../managers/GameManager';

export class MenuScene extends Phaser.Scene {
    /** GameManager instance for handling game state and settings */
    private gameManager: GameManager;

    constructor() {
        super({ key: 'MenuScene' });
        this.gameManager = GameManager.getInstance();
    }

    create(): void {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // Add game title
        this.add.text(centerX, 100, 'Vampire Survivors', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Create menu buttons
        this.createMenuButton(centerX, height / 2 - 50, 'Start Game', () => {
            this.scene.start('CharacterSelectScene');
        });

        this.createMenuButton(centerX, height / 2 + 50, 'Options', () => {
            this.scene.start('OptionsScene');
        });
    }

    private createMenuButton(x: number, y: number, text: string, callback: () => void): void {
        const button = this.add.text(x, y, text, {
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            button.setStyle({ color: '#ff0000' });
        })
        .on('pointerout', () => {
            button.setStyle({ color: '#ffffff' });
        })
        .on('pointerdown', () => {
            button.setStyle({ color: '#ff8800' });
            this.scene.stop('MenuScene');
            callback();
        });
    }
}