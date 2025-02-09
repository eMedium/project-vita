// You can write more code here

import logger from "@/logger/logger";
import { Floor, Room } from "@/store/officeSlice";
import store from "@/store/store";
import { EventBus } from "../EventBus";
import SalesRoom from "../prefabs/rooms/SalesRoom";
import { initCameraWithBounds } from '../utils/cameraUtils';
import { v4 as uuidv4 } from 'uuid';
import CEORoom from "../prefabs/rooms/CEORoom";
import ConferenceRoom from "../prefabs/rooms/ConferenceRoom";
import DevelopmentRoom from "../prefabs/rooms/DevelopmentRoom";
import ToiletRoom from "../prefabs/rooms/ToiletRoom";
import ResearchRoom from "../prefabs/rooms/ResearchRoom";
import BaseRoom from "../prefabs/rooms/BaseRoom";
import Phaser from 'phaser';

/* START OF COMPILED CODE */

export default class MainOfficeScene extends Phaser.Scene {

    constructor() {
        super({ key: 'MainOfficeScene' });

        /* START-USER-CTR-CODE */
        // Write your code here.
        this.sceneUUID = uuidv4();
        logger.debug(`[Phaser] MainOfficeScene created with UUID: ${this.sceneUUID}`);
        /* END-USER-CTR-CODE */
    }

    editorCreate(): void {

        // pokoje_podgl_d
        this.add.image(0, 144, "pokoje podgląd");

        // toiletRoom
        const toiletRoom = new ToiletRoom(this, -391, 250);
        this.add.existing(toiletRoom);

        // conferenceRoom
        const conferenceRoom = new ConferenceRoom(this, 154, 428);
        this.add.existing(conferenceRoom);

        // researchRoom
        const researchRoom = new ResearchRoom(this, -638, -437);
        this.add.existing(researchRoom);

        // developmentRoom
        const developmentRoom = new DevelopmentRoom(this, 326, -353);
        this.add.existing(developmentRoom);

        // salesRoom
        const salesRoom = new SalesRoom(this, 1071, 20);
        this.add.existing(salesRoom);

        // cEORoom
        const cEORoom = new CEORoom(this, -965, -5);
        this.add.existing(cEORoom);

        this.toiletRoom = toiletRoom;
        this.conferenceRoom = conferenceRoom;
        this.researchRoom = researchRoom;
        this.developmentRoom = developmentRoom;
        this.salesRoom = salesRoom;
        this.cEORoom = cEORoom;

        this.events.emit("scene-awake");
    }

    private toiletRoom!: ToiletRoom;
    private conferenceRoom!: ConferenceRoom;
    private researchRoom!: ResearchRoom;
    private developmentRoom!: DevelopmentRoom;
    private salesRoom!: SalesRoom;
    private cEORoom!: CEORoom;

    /* START-USER-CODE */
    // Write your code here
    private roomsMap = new Map<number, BaseRoom>();
    private roomDataMap = new Map<number, Room>();
    private currentFloor = 0;
    private sceneReady = false;
    private sceneUUID: string;


    create() {
        // Wait for scene to be ready b
        // efore initializing rooms
        this.events.once(Phaser.Scenes.Events.UPDATE, () => {
            this.sceneReady = true;
            // Add floor change listener
            EventBus.on('floor-changed', this.handleFloorChange, this);

            // EventBus.emit('request-floor-data');
            // Add 5 second delay before requesting floor data
            this.time.delayedCall(100, () => {
                // Request initial floor data after delay
                logger.debug("MainOfficeScene requesting floor data after 5s delay");
                EventBus.emit('request-floor-data');
            });

        });

        this.editorCreate();

        // Initialize camera with world bounds
        const scaleFactor = window.devicePixelRatio || 1;
        this.initCamera(scaleFactor);

        this.cEORoom.placementId = 1;
        this.salesRoom.placementId = 2;
        this.developmentRoom.placementId = 3;
        this.researchRoom.placementId = 6;
        this.conferenceRoom.placementId = 4;
        this.toiletRoom.placementId = 5;

        // Initialize room mapping
        this.initializeRoomMap();

        // Wait for scene to be fully loaded
        this.events.once(Phaser.Scenes.Events.READY, () => {
            this.sceneReady = true;
            // Request initial floor data only after scene is ready
            EventBus.emit('request-floor-data');
        });

        // Listen for game-resize event
        EventBus.on('game-resize', this.handleGameResize, this);
    }

    initCamera(scaleFactor: number = 1, worldWidth: number = 4000, worldHeight: number = 2100) {
        console.log('[Phaser] Initializing camera with bounds', worldWidth, worldHeight, scaleFactor, this.sceneUUID);
        // Initialize camera with bounds and enable dragging/zooming
        initCameraWithBounds(this, worldWidth, worldHeight);
    }

    handleGameResize(event: { scaleFactor: number }) {
        logger.debug('[Phaser] Handling game resize', this.sceneUUID);
        this.initCamera(event.scaleFactor);
        this.cameras.main.setSize(window.innerWidth, window.innerHeight);

    }

    private initializeRoomMap(): void {
        // Create a map to store rooms by their placementId
        this.roomsMap = new Map();

        // List of all room prefabs in the scene
        const roomPrefabs = [
            {
                prefab: this.cEORoom,
                placementId: 1,  // From office_template.json
                type: 'CEO'
            },
            {
                prefab: this.salesRoom,
                placementId: 2,  // From office_template.json
                type: 'Sales'
            },
            {
                prefab: this.developmentRoom,
                placementId: 3,  // From office_template.json
                type: 'Blueprint'
            },
            {
                prefab: this.conferenceRoom,
                placementId: 4,  // From office_template.json
                type: 'Conference'
            },
            {
                prefab: this.toiletRoom,
                placementId: 5,  // From office_template.json
                type: 'Toilets'
            },
            {
                prefab: this.researchRoom,
                placementId: 6,  // From office_template.json
                type: 'Research'
            }
        ];

        // Initialize each room with its placementId and add to map
        roomPrefabs.forEach(({ prefab, placementId, type }) => {
            if (prefab) {
                prefab.placementId = placementId;
                this.roomsMap.set(placementId, prefab);
            }
        });

        // Subscribe to room data updates
        EventBus.on('room-data-updated', this.updateRoomData, this);
        EventBus.on('game-resize', this.gameResize, this);
        EventBus.on('game-destroy', this.handleDestroy, this);

        // Listen for scene shutdown and destroy events
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, this.handleShutdown, this);
        this.events.on(Phaser.Scenes.Events.DESTROY, this.handleDestroy, this);
        this.events.on('destroy', this.handleDestroy)

    }

    private gameResize = () => {
        console.log('[Phaser] Resizing game to', window.innerWidth, window.innerHeight, this.sceneUUID);
        this.initCamera();
    }

    private updateRoomData = (data: { floorId: number; rooms: Room[] }) => {
        const { rooms } = data;

        // Update each room with its corresponding data
        rooms.forEach(roomData => {
            const room = this.roomsMap.get(roomData.placementId);
            if (room) {
                room.setRoomData(roomData);
            }
        });
    };

    // Update the type definition to match the emitted data
    private handleFloorChange = (data: { floor: number, rooms: Room[] }) => {
        if (!this.sceneReady) {
            logger.warn(`Scene ${this.sceneUUID} not ready, queueing floor change`);
            this.events.once(Phaser.Scenes.Events.READY, () => {
                this.handleFloorChange(data);
            });
            return;
        }

        this.currentFloor = data.floor;
        logger.debug(`Floor changed to: ${this.currentFloor} on scene`, data, this.sceneUUID);

        // Clear previous room data
        this.roomDataMap.clear();

        // Update rooms with the received data
        if (data.rooms && Array.isArray(data.rooms)) {
            data.rooms.forEach(roomData => {
                const roomObject = this.roomsMap.get(roomData.id) as SalesRoom;
                if (roomObject) {
                    this.roomDataMap.set(roomData.id, roomData);
                    roomObject.setVisible(roomData.isBuild);
                    roomObject.setRoomData(roomData);

                }
            });
        }
    }

    handleShutdown() {
        logger.debug('[Phaser] Shutting down MainOfficeScene', this.sceneUUID);
        // Clean up listeners
        EventBus.off('game-resize', this.handleGameResize, this);
    }

    handleDestroy() {
        if(!this.sceneUUID) {
            logger.warn('MainOfficeScene already destroyed');
            return;
        }
        logger.debug('[Phaser] Destroying MainOfficeScene', this.sceneUUID);
        // Clean up listeners and other resources
        EventBus.off('floor-changed', this.handleFloorChange, this);
        EventBus.off('game-resize', this.handleGameResize, this);
        EventBus.off('game-destroy', this.handleDestroy, this);
        this.roomsMap.clear();
        this.roomDataMap.clear();
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
