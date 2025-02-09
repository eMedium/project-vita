import { IMapConfig } from '../../types/MapTypes';
import { Player } from '../../entities/Player';
import { EnemyType } from '../../types/EnemyTypes';
import { Zombie, zombieConfig } from './enemies/Zombie';
import { Bat, batConfig } from './enemies/Bat';
//import { MemoryDisplay } from '../../utils/MemoryDisplay';

export class Map1Scene extends Phaser.Scene {
    //private memoryDisplay: MemoryDisplay;
    private player: Player | null = null;
    private gameManager: GameManager;
    private chunkSize: number = 1024; // 16 tiles * 64px each
    private activeChunks: Map<string, Phaser.Tilemaps.TilemapLayer> = new Map();
    private structures: Map<string, Phaser.GameObjects.GameObject[]> = new Map();
    private seed: number;

    constructor() {
        super({ key: 'map1' });
        this.gameManager = GameManager.getInstance();
        this.seed = Date.now(); // Or use a fixed seed for consistent generation
    }

    private config: IMapConfig = {
        id: 'map1',
        name: 'Forest Map',
        tileSize: 64,
        width: 100,
        height: 100, 
        renderDistance: 3, // How many chunks to render around player
        enemyTypes: ['zombie', 'skeleton'],
        backgroundTile: 'background_grass',
        structures: [
            {
                type: 'house',
                x: 0,          // Add required IMapStructure properties
                y: 0,
                width: 64,
                height: 64,
                frequency: 0.1 // Chance per chunk
            },
            {
                type: 'tree',
                x: 0,
                y: 0,
                width: 32,
                height: 32,
                frequency: 0.1 // Chance per chunk
            }
        ]
    };

    create(): void {
        //this.memoryDisplay = new MemoryDisplay(this);
        this.createMap();
        this.createStructures();

        // Create player at origin
        this.player = this.gameManager.createPlayer(this, 0, 0);

        // Initial chunk generation
        this.updateChunks();
    
        // Set camera to follow player
        this.cameras.main.startFollow(this.player);

        // Set world bounds based on map size
        this.physics.world.setBounds(0, 0, 
            this.config.width * this.config.tileSize, 
            this.config.height * this.config.tileSize
        );

        const enemyManager = EnemyManager.getInstance(this);
        
        // Register enemies specific to this map with their classes
        enemyManager.registerEnemyType(
            EnemyType.ZOMBIE,
            zombieConfig,
            Zombie // Pass the actual class
        );
        
        enemyManager.registerEnemyType(
            EnemyType.BAT,
            batConfig,
            Bat // Pass the actual class
        );
           
    }

    update(): void {
        if (this.player) {
            this.player.update();
            this.updateChunks();
        }
    }

    private getChunkKey(x: number, y: number): string {
        // Convert coordinates to chunk indices and return as string key
        return `${Math.floor(x / this.chunkSize)},${Math.floor(y / this.chunkSize)}`;
    }

    private updateChunks(): void {
        if (!this.player) return;

        const playerChunkX = Math.floor(this.player.x / this.chunkSize);
        const playerChunkY = Math.floor(this.player.y / this.chunkSize);
        const renderDistance = this.config.renderDistance;

        // Track which chunks should remain active
        const neededChunks = new Set<string>();

        // Generate/load chunks around player
        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const chunkX = playerChunkX + x;
                const chunkY = playerChunkY + y;
                const key = this.getChunkKey(chunkX * this.chunkSize, chunkY * this.chunkSize);
                
                neededChunks.add(key);

                // Create chunk if it doesn't exist
                if (!this.activeChunks.has(key)) {
                    this.createChunk(chunkX, chunkY);
                }
            }
        }

        // Remove chunks too far from player
        for (const [key, chunk] of this.activeChunks) {
            if (!neededChunks.has(key)) {
                chunk.destroy();
                this.activeChunks.delete(key);
            }
        }
    }

    private createChunk(chunkX: number, chunkY: number): void {
        const key = this.getChunkKey(chunkX * this.chunkSize, chunkY * this.chunkSize);
        
        // Create tilemap for chunk
        const map = this.make.tilemap({
            tileWidth: this.config.tileSize,
            tileHeight: this.config.tileSize,
            width: this.chunkSize / this.config.tileSize,
            height: this.chunkSize / this.config.tileSize
        });

        const tileset = map.addTilesetImage(this.config.backgroundTile);
        if (!tileset) {
            throw new Error(`Failed to create tileset with ${this.config.backgroundTile}`);
        }

        const layer = map.createBlankLayer('ground', tileset);
        if (!layer) {
            throw new Error('Failed to create map layer');
        }
        
        layer.setPosition(chunkX * this.chunkSize, chunkY * this.chunkSize);
        layer.fill(0);
        this.activeChunks.set(key, layer);

        // Generate structures for this chunk
        this.generateStructures(chunkX, chunkY);
    }

    private generateStructures(chunkX: number, chunkY: number): void {
        const key = this.getChunkKey(chunkX, chunkY);
        
        // Convert numbers to string for the seed
        const seedString = `${this.seed}-${chunkX}-${chunkY}`;
        const random = new Phaser.Math.RandomDataGenerator([seedString]);

        this.config.structures.forEach(structure => {
            // Use structure properties from config
            const x = chunkX * this.chunkSize + random.integerInRange(0, this.chunkSize - structure.width);
            const y = chunkY * this.chunkSize + random.integerInRange(0, this.chunkSize - structure.height);
            
            // Create and store structure with proper positioning
            const structureObj = this.add.image(x + structure.width/2, y + structure.height/2, structure.type);
            structureObj.setOrigin(0.5, 0.5); // Center anchor point
            
            if (!this.structures.has(key)) {
                this.structures.set(key, []);
            }
            this.structures.get(key)?.push(structureObj);
        });
    }

    private createMap(): void {
        const { width, height, tileSize, backgroundTile } = this.config;
    
    // Create the tilemap
    const map = this.make.tilemap({ 
        tileWidth: tileSize, 
        tileHeight: tileSize, 
        width: width, 
        height: height 
    });

    // Add the tileset image
    const tileset = map.addTilesetImage(backgroundTile);
    if (!tileset) {
        throw new Error(`Tileset '${backgroundTile}' not found. Make sure 'background_grass' is loaded in the preload phase.`);
    }

    // Create a blank layer using the tileset
    const layer = map.createBlankLayer('ground', tileset);
    if (!layer) {
        throw new Error('Failed to create map layer');
    }

    // Fill the entire layer with grass tiles
    layer.fill(0);

    // Set the bounds of the world based on the map size
    this.physics.world.setBounds(0, 0, width * tileSize, height * tileSize);
    }

    private createStructures(): void {
        this.config.structures.forEach(structure => {
            // Structure creation
        });
    }

}