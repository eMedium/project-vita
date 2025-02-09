import { Room } from "@/store/officeSlice";
import { v4 as uuidv4 } from 'uuid';
import logger
 from "@/logger/logger";
import Employee from "../Employee";
import BaseFurniture from "../furnitures/BaseFurniture";

export default abstract class BaseRoom extends Phaser.GameObjects.Container {
    protected roomData: Room | null = null;
    protected pendingRoomData: Room | null = null;
    public roomId: number = 0;
    public placementId: number = 0;
    public readonly uuid: string;
    protected employees: Employee[] = [];
    protected furnitures: BaseFurniture[] = [];

    constructor(scene: Phaser.Scene, x?: number, y?: number) {
        super(scene, x ?? 0, y ?? 0);
        this.uuid = uuidv4();
        logger.debug(`Room created with UUID: ${this.uuid}`);

        // Add refresh key listener
        if (this.scene?.input?.keyboard) {
            this.scene.input.keyboard.on('keydown-R', this.onRefreshKeyPressed);
        }

        // Wait for scene to be ready before initializing employees
        this.scene.events.once(Phaser.Scenes.Events.UPDATE, () => {
            logger.debug(`Initializing room ${this.uuid}`);
            this.initializeEmployees();
            this.initializeFurniture();
        });
    }

    public setRoomData(roomData: Room): void {
        if (!roomData) {
            logger.warn(`Room data is empty for room ${this.uuid}`);
            return;
        }

        logger.debug(`Setting room data for room ${this.uuid}`, roomData);
        this.roomData = roomData;
        this.refreshRoomData();
    }

    protected abstract initializeEmployees(): void;
    protected abstract initializeFurniture(): void;

    protected setEmployees(employeeSlots: Employee[]): void {
        // Store employee references
        this.employees = employeeSlots;

        // Initially hide all employees
        this.employees.forEach(employee => {
            if (employee) {
                employee.setVisible(false);
            }
        });

        logger.debug(`Set ${employeeSlots.length} employees for room ${this.uuid}`);
    }

    protected setFurniture(furnitureSlots: BaseFurniture[]): void {
        this.furnitures = furnitureSlots;
        this.furnitures.forEach(furniture => {
            if (furniture) {
                // furniture.setVisible(false);
            }
        });
        logger.debug(`Set ${furnitureSlots.length} furniture for room ${this.uuid}`);
    }

    protected refreshRoomData(): void {
        if (!this.roomData) return;

        logger.debug(`Refreshing room data: ${this.uuid}`, this.roomData);
        
        // First hide all employees
        this.employees.forEach(employee => {
            if (employee) {
                employee.setVisible(false);
            }
        });

        // Then show and update only the active ones
        if (this.roomData.employeesId && this.employees) {
            this.roomData.employeesId.forEach((empId, index) => {
                if (index < this.employees.length && this.employees[index]) {
                    const employee = this.employees[index];
                    employee.setVisible(true);
                    try {
                        employee.setSeed(empId);
                    } catch (error) {
                        logger.error(`Error setting seed for employee in room ${this.uuid}:`, error);
                    }
                }
            });
        }

        // Update furniture
        if (this.roomData.furnitures) {
            this.roomData.furnitures.forEach((furnitureData, index) => {
                if (index < this.furnitures.length && this.furnitures[index]) {
                    const furniture = this.furnitures[index];
                    furniture.setFurnitureData(furnitureData);
                }
            });
        }
    }

    private onRefreshKeyPressed = () => {
        if (this.roomData) {
            this.refreshRoomData();
        }
    };

    destroy(fromScene?: boolean): void {
        if (this.scene?.input?.keyboard) {
            this.scene.input.keyboard.off('keydown-R', this.onRefreshKeyPressed);
        }
        super.destroy(fromScene);
    }
}