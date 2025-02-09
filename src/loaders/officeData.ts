import logger from '@/logger/logger';
import officeData from '../data/office_data.json';
import officeTemplate from '../data/office_template.json';
import { Floor, Furniture, Room, RoomType } from '../store/officeSlice';

interface OfficeDataRaw {
    floors: {
        id: number;
        name: string;
        rooms: {
            id: number;
            placementId: number;
            name: string;
            employeesId: number[];
            furnitures: any[];
            isBuild: boolean;
            buildCost: number;
            roomType: string;
        }[];
    }[];
}

export const loadOffices = (): Floor[] => {
    const data: OfficeDataRaw = officeData;
    const floors: Floor[] = [];

    data.floors.forEach(floorData => {
        const rooms: Room[] = floorData.rooms.map(roomData => {
            // Find matching template for this room
            const roomTemplate = officeTemplate.floorTemplate.find(
                t => t.placementId === roomData.placementId
            );

            // Initialize furniture from template with level 0
            const initialFurniture: Furniture[] = roomTemplate?.furnitures.map(f => ({
                id: f.id,
                name: f.name,
                type: f.bonusType,
                level: 0 // All furniture starts at level 0
            })) || [];

            return {
                id: roomData.id,
                placementId: roomData.placementId,
                name: roomData.name,
                employeesId: roomData.employeesId,
                furnitures: initialFurniture, // Use template-based furniture
                isBuild: roomData.isBuild,
                buildCost: roomData.buildCost,
                maxEmployees: roomTemplate?.maxEmployees || 0,
                roomType: RoomType[roomData.roomType as keyof typeof RoomType] // Convert string to RoomType enum
            };
        });

        floors.push({
            id: floorData.id,
            name: floorData.name,
            rooms
        });
    });

    logger.info("load floors", floors);
    return floors;
};
