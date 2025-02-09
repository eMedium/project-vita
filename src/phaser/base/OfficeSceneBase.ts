import { EventBus } from "../EventBus";
import Employee from "../prefabs/Employee";
import { Employee as EmployeeModel } from '@/store/employeeSlice';

export default class OfficeSceneBase extends Phaser.Scene {

    protected employeeObjects: Employee[];
    protected chief: Employee | null;
    protected models: EmployeeModel[];

    constructor(sceneKey: string) {
        super(sceneKey);
        this.employeeObjects = [];
        this.chief = null;
        this.models = [];
    }

    protected initializeScene(): void {
        // Zainicjuj słuchanie zdarzeń i aktualizację pracowników
        this.events.on('pause', this.onScenePause, this);
        this.events.on('resume', this.onSceneResume, this);
        this.events.on('shutdown', this.onSceneStop, this);

        this.events.once(Phaser.Scenes.Events.POST_UPDATE, () => {
            EventBus.on('employeesUpdated', this.updateEmployees, this);
            EventBus.on('chiefUpdated', this.updateChief, this);

            EventBus.emit('scene-awake', this.scene);
        });
    }

    onScenePause(): void {
        // Działania do podjęcia po wstrzymaniu sceny
    }

    onSceneResume(): void {
        // Działania do podjęcia po wznowieniu sceny
    }

    onSceneStop(): void {
        // Działania do podjęcia po zakończeniu sceny
        EventBus.off('employeesUpdated', this.updateEmployees, this);
        EventBus.off('chiefUpdated', this.updateChief, this);
    }

    // Aktualizacja pracowników
    updateEmployees(employees: EmployeeModel[]): void {
        this.models = employees;
        this.updateEmployeesOnScene(this.models);
    }

    // Aktualizacja szefa
    updateChief(seed: number): void {
        // Sprawdzenie, czy scena jest aktywna i załadowana
        if (!this.scene) {
            return;
        }

        if (!this.scene.manager || !this.scene.isActive()) {
            return;
        }

        if (this.chief) {
            this.chief.setSeed(seed);
        }
    }

    // Logika aktualizacji obiektów pracowników na scenie
    protected updateEmployeesOnScene(employees: EmployeeModel[]): void {
        // Sprawdzenie, czy scena jest aktywna i załadowana
        if (!this.scene) {
            return;
        }

        if (!this.scene.manager || !this.scene.isActive()) {
            return;
        }

        // Sprawdzenie, czy istnieją obiekty pracowników do aktualizacji
        if (!this.employeeObjects || this.employeeObjects.length === 0) {
            return;
        }

        this.employeeObjects.forEach(employee => employee.setVisible(false));

        const employeeCount = Math.min(employees.length, this.employeeObjects.length);

        for (let i = 0; i < employeeCount; i++) {
            const employeeData = employees[i];
            const employeeObject = this.employeeObjects[i];

            employeeObject.setVisible(true);
            employeeObject.setSeed(employeeData.id);
        }

    }
}
