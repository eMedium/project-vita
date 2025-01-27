export interface IMapConfig {
    id: string;
    name: string;
    tileSize: number;
    width: number;
    height: number;
    renderDistance: number;
    enemyTypes: string[];
    backgroundTile: string;
    structures: IMapStructure[];
}

export interface IMapStructure {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    frequency: number;
}