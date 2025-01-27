export interface IPlayerStats {
    // Base stats that come from specific classes
    baseHealth: number;
    baseSpeed: number;
    baseDamage: number;
    
    // Current stats (affected by modifiers)
    health: number;
    speed: number;
    damage: number;
    
    // Progress stats
    level: number;    
    experience: number;
}