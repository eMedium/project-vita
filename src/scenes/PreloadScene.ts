export class PreloadAssets extends Phaser.Scene {
    private progressBar!: Phaser.GameObjects.Graphics;
    private progressBox!: Phaser.GameObjects.Graphics;
    private loadingText!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'PreloadAssets' });
    }

    preload(): void {
        this.createProgressBar();

        // Add error handler for missing files
        this.load.on('loaderror', (fileObj: any) => {
            console.error(`Error loading asset: ${fileObj.key}`);
        });


        console.log('Preloading assets...');

        try {
            // Placeholders for players
            this.load.image('dino', 'assets/dino.png');
            this.load.image('guapen', 'assets/guapen.png');
            // Load map tiles
            this.load.image('background_grass', 'assets/background_grass.png');

            // Load enemy sprites
            //this.load.image('guapen', 'assets/guapen.png');
            //this.load.image('bat', 'assets/bat.png');

            // Load particle sprites
            //this.load.image('bomb', 'assets/weapons/bomb.png');

            // Load item sprites
            //this.load.image('star', 'assets/items/star.png');

            // Load player character sprites
            this.load.image('warrior', 'assets/characters/warrior.png');
            this.load.image('mage', 'assets/characters/mage.png');
            this.load.image('rogue', 'assets/characters/rogue.png');
            this.load.image('druid', 'assets/characters/druid.png');

            // Load UI elements
            this.load.image('button', 'assets/ui/button.png');
            this.load.image('health_bar', 'assets/ui/health_bar.png');

            // Load structure sprites
            this.load.image('house', 'assets/star.png');
            this.load.image('tree', 'assets/bomb.png');
        } catch (error) {
            console.error('Asset loading failed:', error);
            // Create a gray square texture as fallback
            const fallbackGraphics = this.add.graphics();
            fallbackGraphics.fillStyle(0x808080); // Gray color
            fallbackGraphics.fillRect(0, 0, 64, 64); // 64x64 pixel square

            // Generate texture from graphics
            fallbackGraphics.generateTexture('placeholder', 64, 64);
            fallbackGraphics.destroy();
        }

        this.load.on('progress', this.updateProgressBar, this);
        this.load.on('complete', this.onLoadComplete, this);
    }

    private createProgressBar(): void {
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            color: '#ffffff'
        });
        this.loadingText.setOrigin(0.5, 0.5);
    }

    private updateProgressBar(value: number): void {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(250, 280, 300 * value, 30);
    }

    private onLoadComplete(): void {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.scene.start('MenuScene');
        console.log('Scene started');
    }
}