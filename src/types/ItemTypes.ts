export interface Item {
    id: string;
    name: string;
    description: string;
    type: ItemType;
    stats?: ItemStats;
}

export enum ItemType {
    WEAPON = 'weapon',
    ARMOR = 'armor',
    CONSUMABLE = 'consumable',
    QUEST = 'quest'
}

export interface ItemStats {
    speedBonus?: number;
    healthBonus?: number;
    damageBonus?: number;
    // Add other item stats as needed
}

export class Inventory {
    private items: Item[];
    private maxSize: number;
    
    constructor(maxSize: number = 20) {
        this.items = [];
        this.maxSize = maxSize;
    }

    addItem(item: Item): boolean {
        if (this.items.length >= this.maxSize) return false;
        this.items.push(item);
        return true;
    }

    removeItem(itemId: string): Item | undefined {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }

    getItems(): Item[] {
        return [...this.items];
    }

    serialize(): string {
        return JSON.stringify(this.items);
    }

    deserialize(data: string): void {
        this.items = JSON.parse(data);
    }
}