import { Inventory, Item } from '../types/ItemTypes';

export class InventoryManager {
    private static instance: InventoryManager;
    private characterInventories: Map<string, Inventory>;

    private constructor() {
        this.characterInventories = new Map();
    }

    static getInstance(): InventoryManager {
        if (!InventoryManager.instance) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }

    saveCharacterInventory(characterId: string, inventory: Inventory): void {
        this.characterInventories.set(characterId, inventory);
        localStorage.setItem(`inventory_${characterId}`, inventory.serialize());
    }

    loadCharacterInventory(characterId: string): Inventory {
        const savedData = localStorage.getItem(`inventory_${characterId}`);
        const inventory = new Inventory();
        if (savedData) {
            inventory.deserialize(savedData);
        }
        return inventory;
    }
}