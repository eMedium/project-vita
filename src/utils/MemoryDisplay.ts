
export class MemoryDisplay {
    private text: Phaser.GameObjects.Text;
    private scene: Phaser.Scene;
    private updateInterval: number = 500; // Update every second

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.text = scene.add.text(10, 10, '', {
            fontSize: '16px',
            color: '#00ff00',
            backgroundColor: '#000000'
        });
        this.text.setScrollFactor(0, 0); // Fix to camera
        this.text.setDepth(999); // Always on top

        // Start updating
        scene.time.addEvent({
            delay: this.updateInterval,
            callback: this.updateMemoryInfo,
            callbackScope: this,
            loop: true
        });
    }

    private updateMemoryInfo(): void {
        const perf: any = performance;
        if (perf && perf.memory) {
            const memory = perf.memory;
            const usedHeapSize = (memory.usedJSHeapSize / 1048576).toFixed(2);
            const totalHeapSize = (memory.totalJSHeapSize / 1048576).toFixed(2);
            const heapLimit = (memory.jsHeapSizeLimit / 1048576).toFixed(2);
            
            this.text.setText(
                `Memory Usage (MB):\n` +
                `Used: ${usedHeapSize}\n` +
                `Total: ${totalHeapSize}\n` +
                `Limit: ${heapLimit}`
            );
        } else {
            this.text.setText('Memory info not available');
        }
    }

    destroy(): void {
        this.text.destroy();
    }
}