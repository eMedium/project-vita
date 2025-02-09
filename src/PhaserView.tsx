import React, { useEffect, useRef } from 'react';
import { PhaserGameManager } from './PhaserMainManager';

const PhaserView: React.FC = () => {
    const gameManager = PhaserGameManager.getInstance();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize game only if not already initialized
        gameManager.initializeGame();

        const resizeGame = () => {
            const currentGame = gameManager.getGame();
            const container = containerRef.current;
            
            if (currentGame && container) {
                const scaleFactor = window.devicePixelRatio || 1;
                const width = container.clientWidth;
                const height = container.clientHeight;
                currentGame.scale.resize(width, height);
                console.log('Game resized to:', width, height);
            }
        };

        // Handle window resize
        const handleWindowResize = () => {
            resizeGame();
        };

        window.addEventListener('resize', handleWindowResize);

        // Create ResizeObserver for container
        const resizeObserver = new ResizeObserver(() => {
            resizeGame();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Handle screen resolution changes
        const handleResolutionChange = () => {
            resizeGame();
        };

        const mediaQueryList = window.matchMedia('(resolution: 1dppx)');
        mediaQueryList.addEventListener('change', handleResolutionChange);

        resizeGame();

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener('resize', handleWindowResize);
            resizeObserver.disconnect();
            mediaQueryList.removeEventListener('change', handleResolutionChange);
            PhaserGameManager.destroyInstance();

            //Dev purpose only
            // Ensure all children of phaser-container are removed
            const phaserContainer = document.getElementById('thegame');
            if (phaserContainer) {
                while (phaserContainer.firstChild) {
                    phaserContainer.removeChild(phaserContainer.firstChild);
                }
                // Optionally set display to none
                // phaserContainer.style.display = 'none';
            }

        };
    }, []);

    return (
        <div className='relative h-full w-full'>
            <div className='absolute inset-0 pointer-events-none'>
                <div ref={containerRef} className='w-full h-full' id="thegame"></div>
            </div>
            <div className='relative z-10 h-full w-full'>
                {/* Tu możesz umieścić inne elementy UI, które mają być nad grą */}
            </div>
        </div>
    );
};

export default PhaserView;
