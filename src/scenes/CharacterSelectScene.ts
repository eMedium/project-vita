import { GameManager } from "../managers/GameManager";

export class CharacterSelectScene extends Phaser.Scene {
    private gameManager: GameManager;
    private selectedButton: Phaser.GameObjects.Text | null = null;
    private nextButton: Phaser.GameObjects.Text | null = null;
    private selectedStatsText: Phaser.GameObjects.Text | null = null;
    private hoveredStatsText: Phaser.GameObjects.Text | null = null;

    constructor() {
        super({ key: 'CharacterSelectScene' });
        this.gameManager = GameManager.getInstance();
    }

    create(): void {

        // Reset selection state
        this.selectedButton = null;
        this.nextButton = null;

        const { width, height } = this.cameras.main;
        const centerX = width / 2;

        // Add title
        this.add.text(centerX, 100, 'Select Your Character', { 
            fontSize: '32px',
            color: '#fff' 
        }).setOrigin(0.5);

        this.createCharacterButtons();

        // Add back button
        this.add.text(centerX, height - 50, 'Back to Menu', { 
            fontSize: '24px',
            color: '#fff' 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop('CharacterSelectScene');
            this.scene.start('MenuScene');
        });
    }

    private createCharacterButtons(): void {
        const characters = [
            { id: 'warrior', name: 'Warrior', x: 200, y: 200, stats: 'High HP, Strong Melee' },
            { id: 'mage', name: 'Mage', x: 200, y: 300, stats: 'Low HP, Powerful Spells' },
            { id: 'rogue', name: 'Rogue', x: 200, y: 400, stats: 'Medium HP, High Speed' },
            { id: 'druid', name: 'Druid', x: 200, y: 500, stats: 'Medium HP, Nature Magic' },
            { id: 'barbarian', name: 'Barbarian', x: 200, y: 600, stats: 'High HP, Strong Melee' }
        ];

        characters.forEach(char => {
            const button = this.add.text(char.x, char.y, char.name, { 
                fontSize: '24px',
                color: '#fff',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.selectCharacter(char.id, button, char.stats, char.x + 200, char.y);
            })
            .on('pointerover', () => {
                if (button !== this.selectedButton) {
                    button.setStyle({ color: '#ff0' });
                    this.showHoveredStats(char.stats, char.x + 200, char.y);
                }
            })
            .on('pointerout', () => {
                if (button !== this.selectedButton) {
                    button.setStyle({ color: '#fff' });
                }
                if (this.hoveredStatsText) {
                    this.hoveredStatsText.destroy();
                    this.hoveredStatsText = null;
                }
            });
        });
    }

    private showHoveredStats(stats: string, x: number, y: number): void {
        if (this.hoveredStatsText) {
            this.hoveredStatsText.destroy();
        }
        this.hoveredStatsText = this.add.text(x, y, stats, {
            fontSize: '18px',
            color: '#fff'
        });
    }

    private selectCharacter(characterId: string, button: Phaser.GameObjects.Text, stats: string, x: number, y: number): void {
        // Clear previous selection
        if (this.selectedButton) {
            this.selectedButton.setStyle({ color: '#fff' });
        }
        if (this.selectedStatsText) {
            this.selectedStatsText.destroy();
        }
        if (this.hoveredStatsText) {
            this.hoveredStatsText.destroy();
            this.hoveredStatsText = null;
        }

        // Set new selection
        this.selectedButton = button;
        this.selectedButton.setStyle({ color: '#ff0' });
        this.selectedStatsText = this.add.text(x, y, stats, {
            fontSize: '18px',
            color: '#fff'
        });
        
        this.gameManager.setSelectedCharacter(characterId);
        this.showNextButton();
    }

    private showNextButton(): void {
        // Cleanup existing button if exists
        if (this.nextButton) {
            this.nextButton.destroy();
        }

        // Create new button
        const centerX = this.cameras.main.width / 2;
        this.nextButton = this.add.text(centerX, 600, 'Select Map >', {
            fontSize: '32px',
            color: '#fff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop('CharacterSelectScene');
            this.scene.start('MapSelectScene');
        })
        .on('pointerover', () => {
            this.nextButton?.setStyle({ color: '#ff0' });
        })
        .on('pointerout', () => {
            this.nextButton?.setStyle({ color: '#fff' });
        });
    }
}