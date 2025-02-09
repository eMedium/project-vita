import { GameManager } from '../managers/GameManager';

export class MenuScene extends Phaser.Scene {
    /** GameManager instance for handling game state and settings */
    private gameManager: GameManager;

    constructor() {
        super({ key: 'MenuScene' });
        this.gameManager = GameManager.getInstance();
    }

    create(): void {
        this.layoutUI();
        this.scale.on('resize', this.handleResize, this);
    }

    private handleResize(): void {
        this.children.removeAll();
        this.layoutUI();
    }

    private layoutUI(): void {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // Add game title
        this.add.text(centerX, height * 0.2, 'Vampire Survivors', {
            fontSize: `${Math.max(32, width * 0.04)}px`,
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Create menu buttons
        this.createMenuButton(
            centerX, 
            height * 0.4, 
            'Start Game', 
            () => this.scene.start('CharacterSelectScene')
        );

        this.createMenuButton(
            centerX, 
            height * 0.5, 
            'Options', 
            () => this.scene.start('OptionsScene')
        );
    }

    private createMenuButton(x: number, y: number, text: string, callback: () => void): void {
        const { width, height } = this.cameras.main;
        const button = this.add.text(x, y, text, {
            fontSize: `${Math.max(24, width * 0.02)}px`,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: width * 0.02, y: height * 0.01 }
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