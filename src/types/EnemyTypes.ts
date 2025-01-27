export interface IEnemyConfig {
    // Basic stats
    health: number;
    damage: number;
    speed: number;
    texture: string;
    
    // Additional properties
    type: EnemyType;
    vulnerabilities?: ElementType[];
    resistances?: ElementType[];
    
    // Behavior
    attackRange?: number;
    aggroRange?: number;
    attackSpeed?: number;
}

export enum EnemyType {
    ZOMBIE = 'zombie',
    SKELETON = 'skeleton',
    BAT = 'bat',
    // Add more enemy types as needed
}

export enum ElementType {
    PHYSICAL = 'physical',
    FIRE = 'fire',
    ICE = 'ice',
    POISON = 'poison',
    // Add more element types as needed
}