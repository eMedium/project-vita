import { RootState } from '../store/store';
import { isResearchDone } from './researchUtils';

interface PackageType {
    name: string;
    pinCount: number;
    level: number;
}

const packageTypeMapping: Record<number, PackageType> = {
    1: { name: 'DIP', pinCount: 14, level: 1 },
    3: { name: 'DIP', pinCount: 18, level: 2 },
    5: { name: 'DIP', pinCount: 24, level: 3 },
    6: { name: 'DIP', pinCount: 32, level: 4 },
    9: { name: 'DIP', pinCount: 48, level: 5 },
    14: { name: 'DIP', pinCount: 56, level: 6 },
    15: { name: 'DIP', pinCount: 64, level: 7 },
    20: { name: 'DIP', pinCount: 72, level: 8 },
    10: { name: 'PLCC', pinCount: 24, level: 9 },
    12: { name: 'PLCC', pinCount: 32, level: 10 },
    13: { name: 'PLCC', pinCount: 48, level: 11 },
    17: { name: 'PLCC', pinCount: 56, level: 12 },
    19: { name: 'PLCC', pinCount: 64, level: 13 },
    21: { name: 'PLCC', pinCount: 72, level: 14 },
    23: { name: 'PLCC', pinCount: 84, level: 15 },
    27: { name: 'PLCC', pinCount: 96, level: 16 },
    28: { name: 'PLCC', pinCount: 116, level: 17 },
    34: { name: 'PLCC', pinCount: 136, level: 18 },
    35: { name: 'PLCC', pinCount: 156, level: 19 },
    40: { name: 'PLCC', pinCount: 182, level: 20 },
    42: { name: 'PLCC', pinCount: 208, level: 21 },
    45: { name: 'PLCC', pinCount: 240, level: 22 },
    25: { name: 'PGA', pinCount: 48, level: 23 },
    26: { name: 'PGA', pinCount: 60, level: 24 },
    29: { name: 'PGA', pinCount: 78, level: 25 },
    31: { name: 'PGA', pinCount: 96, level: 26 },
    32: { name: 'PGA', pinCount: 112, level: 27 },
    33: { name: 'PGA', pinCount: 136, level: 28 },
    37: { name: 'PGA', pinCount: 152, level: 29 },
    39: { name: 'PGA', pinCount: 176, level: 30 },
    41: { name: 'PGA', pinCount: 200, level: 31 },
    44: { name: 'PGA', pinCount: 224, level: 32 },
    47: { name: 'PGA', pinCount: 248, level: 33 },
    50: { name: 'PGA', pinCount: 282, level: 34 },
    52: { name: 'PGA', pinCount: 320, level: 35 },
    54: { name: 'PGA', pinCount: 380, level: 36 },
    58: { name: 'PGA', pinCount: 456, level: 37 },
    61: { name: 'PGA', pinCount: 544, level: 38 },
    63: { name: 'PGA', pinCount: 618, level: 39 },
    69: { name: 'PGA', pinCount: 754, level: 40 },
    72: { name: 'PGA', pinCount: 870, level: 41 },
    77: { name: 'PGA', pinCount: 940, level: 42 },
    81: { name: 'PGA', pinCount: 1207, level: 43 },
    84: { name: 'PGA', pinCount: 1366, level: 44 },
    118: { name: 'LGA', pinCount: 775, level: 45 },
    119: { name: 'LGA', pinCount: 940, level: 46 },
    120: { name: 'LGA', pinCount: 1366, level: 47 },
    121: { name: 'LGA', pinCount: 1567, level: 48 },
    122: { name: 'LGA', pinCount: 2011, level: 49 },
    123: { name: 'LGA', pinCount: 2066, level: 50 },
    124: { name: 'LGA', pinCount: 3647, level: 51 },
    125: { name: 'LGA', pinCount: 4189, level: 52 },
    126: { name: 'LGA', pinCount: 4677, level: 53 },
    127: { name: 'LGA', pinCount: 5000, level: 54 },
};

export const getPackageTypes = (researchState: RootState['research']): Array<{ name: string, pinCount: number, level: number }> => {
    const startedResearch = researchState.completedResearch;
    const result = Object.entries(packageTypeMapping)
        .filter(([id, _]) => isResearchDone(startedResearch, parseInt(id)))
        .map(([_, pkg]) => pkg);

    if (result.length === 0) {
        result.push({ name: 'NONE', pinCount: 0, level: 0 });
    }

    return result;
};