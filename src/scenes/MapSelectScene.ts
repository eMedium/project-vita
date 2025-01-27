import { GameManager } from '../managers/GameManager';

export class MapSelectScene extends Phaser.Scene {
    private gameManager: GameManager;
    private selectedButton: Phaser.GameObjects.Text | null = null;
    private startButton: Phaser.GameObjects.Text | null = null;
    private selectedDescriptionText: Phaser.GameObjects.Text | null = null;
    private hoveredDescriptionText: Phaser.GameObjects.Text | null = null;


    constructor() {
        super({ key: 'MapSelectScene' });
        this.gameManager = GameManager.getInstance();
    }

    create(): void {
        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // Add title
        this.add.text(centerX, 100, 'Select Your Map', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        this.createMapButtons();

        // Add back button
        this.createMenuButton(centerX, height - 100, 'Back to Character Select', () => {
            this.scene.stop('MapSelectScene');
            this.scene.start('CharacterSelectScene');
        });
    }

    private createMapButtons(): void {
        const maps = [
            { 
                id: 'map1', 
                name: 'Forest Map', 
                x: 200, 
                y: 200,
                description: 'A dark forest filled with undead creatures'
            },
            { 
                id: 'map2', 
                name: 'Desert Map', 
                x: 200, 
                y: 300,
                description: 'Vast desert with ancient ruins and deadly creatures'
            }
        ];

        maps.forEach(map => {
            const button = this.add.text(map.x, map.y, map.name, {
                fontSize: '24px',
                color: '#fff',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.selectMap(map.id, button, map.description, map.x + 200, map.y);
            })
            .on('pointerover', () => {
                if (button !== this.selectedButton) {
                    button.setStyle({ color: '#ff0' });
                    this.showHoveredDescription(map.description, map.x + 200, map.y);
                }
            })
            .on('pointerout', () => {
                if (button !== this.selectedButton) {
                    button.setStyle({ color: '#fff' });
                }
                if (this.hoveredDescriptionText) {
                    this.hoveredDescriptionText.destroy();
                    this.hoveredDescriptionText = null;
                }
            });
        });
    }

    private showHoveredDescription(description: string, x: number, y: number): void {
        if (this.hoveredDescriptionText) {
            this.hoveredDescriptionText.destroy();
        }
        this.hoveredDescriptionText = this.add.text(x, y, description, {
            fontSize: '18px',
            color: '#fff'
        });
    }

    private selectMap(mapId: string, button: Phaser.GameObjects.Text, description: string, x: number, y: number): void {
        // Clear previous selection
        if (this.selectedButton) {
            this.selectedButton.setStyle({ color: '#fff' });
        }
        if (this.selectedDescriptionText) {
            this.selectedDescriptionText.destroy();
        }
        if (this.hoveredDescriptionText) {
            this.hoveredDescriptionText.destroy();
            this.hoveredDescriptionText = null;
        }

        // Set new selection
        this.selectedButton = button;
        this.selectedButton.setStyle({ color: '#ff0' });
        this.selectedDescriptionText = this.add.text(x, y, description, {
            fontSize: '18px',
            color: '#fff'
        });
        
        this.gameManager.setSelectedMap(mapId);
        this.showStartButton();
    }

    private createMenuButton(x: number, y: number, text: string, callback: () => void): Phaser.GameObjects.Text {
        const button = this.add.text(x, y, text, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ color: '#ff0' }))
        .on('pointerout', () => button.setStyle({ color: '#fff' }))
        .on('pointerdown', callback);
    
        return button;
    }

    private showStartButton(): void {
        // Cleanup existing button if exists
        if (this.startButton) {
            this.startButton.destroy();
        }
        const centerX = this.cameras.main.width / 2;
        this.startButton = this.add.text(centerX, 600, 'Start Game >', {
            fontSize: '32px',
            color: '#fff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.gameManager.loadSelectedMap();
        })
        .on('pointerover', () => {
            this.startButton?.setStyle({ color: '#ff0' });
        })
        .on('pointerout', () => {
            this.startButton?.setStyle({ color: '#fff' });
        })
    }
}

