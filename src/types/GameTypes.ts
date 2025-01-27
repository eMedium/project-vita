import { IPlayerStats } from './PlayerTypes';

export interface IGameSettings {
    goldDropRate: number;
    itemDropRate: number;
}

export interface IPowerUp {
    id: string;
    name: string;
    description: string;
    modifier: (stats: IPlayerStats) => void;
}

export interface IGlobalModifier {
    speedMultiplier: number;
    healthMultiplier: number;
    damageMultiplier: number;
}
