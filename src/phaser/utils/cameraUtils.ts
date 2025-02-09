// utils/cameraUtils.ts

export function initCameraWithBounds(
    scene: Phaser.Scene,
    worldWidth: number,
    worldHeight: number,
): void {
    const camera = scene.cameras.main;

    // Set the camera bounds
    camera.setBounds(worldWidth / -2, worldHeight / -2, worldWidth, worldHeight);
    camera.setZoom(1);

    // Calculate minZoom so that the camera cannot zoom out beyond the world bounds
    const minZoomX = camera.width / worldWidth;
    const minZoomY = camera.height / worldHeight;
    const minZoom = Math.max(minZoomX, minZoomY );

    // Initialize camera input
    reinitCameraInput(scene, camera, minZoom);
}

export function initCameraInput(scene: Phaser.Scene, camera: Phaser.Cameras.Scene2D.Camera, minZoom: number): void {
    let cameraDragStartX: number;
    let cameraDragStartY: number;

    // Enable dragging for camera
    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        cameraDragStartX = camera.scrollX;
        cameraDragStartY = camera.scrollY;
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
        if (pointer.isDown) {
            camera.scrollX = cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
            camera.scrollY = cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
        }
    });

    const maxZoom = 2; // Maximum zoom in level (adjust as needed)

    // Add zoom functionality that focuses on the camera's center
    scene.input.on('wheel', (pointer: Phaser.Input.Pointer, gameObjects: any, deltaX: number, deltaY: number) => {
        // Get the camera's current center point in world coordinates
        const mid = camera.midPoint;

        // Calculate the new zoom level
        let newZoom = camera.zoom - deltaY * 0.001; // Adjust zoom sensitivity as needed
        newZoom = Phaser.Math.Clamp(newZoom, minZoom, maxZoom);

        // Set the new zoom level
        camera.setZoom(newZoom);
        camera.centerOn(mid.x, mid.y); // Center the camera on the center point
    });
}

export function reinitCameraInput(scene: Phaser.Scene, camera: Phaser.Cameras.Scene2D.Camera, minZoom: number): void {
    // Remove existing input listeners
    scene.input.off('pointerdown');
    scene.input.off('pointermove');
    scene.input.off('wheel');
    
    // Reinitialize camera input
    initCameraInput(scene, camera, minZoom);
}