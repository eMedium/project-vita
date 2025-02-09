// shaderUtils.ts

import { ColorMapping, HsvColorReplacePipeline } from "../shaders/HsvColorReplacePipeline";


export function addHsvShader(
    object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image,
    colorMappings: ColorMapping[]
) {
    const maxMappings = HsvColorReplacePipeline.MAX_MAPPINGS;

    // Upewnij się, że `colorMappings` nie przekracza `MAX_MAPPINGS`
    if (colorMappings.length > maxMappings) {
        console.warn(`Ograniczono liczbę mapowań kolorów do ${maxMappings}.`);
        colorMappings = colorMappings.slice(0, maxMappings);
    }

    // Inicjalizacja uniformów
    const newColors: [number, number, number][] = [];
    const oldHues: [number, number][] = [];
    const tolerances: number[] = [];

    colorMappings.forEach(mapping => {
        const [newR, newG, newB] = hexToRgb(mapping.newColor);
        const [newH, newS, newV] = rgbToHsv(newR, newG, newB);

        newColors.push([newH, newS, newV]);
        oldHues.push([mapping.oldColorRange.hue[0], mapping.oldColorRange.hue[1]]);
        tolerances.push(mapping.oldColorRange.tolerance);
    });

    // Uzupełnienie tablic do długości MAX_MAPPINGS
    while (newColors.length < maxMappings) {
        newColors.push([0, 0, 0]);
        oldHues.push([0, 0]);
        tolerances.push(0);
    }

    object.setPipeline('HsvColorReplacePipeline');

    // Przechowywanie per-obiektowych uniformów
    const pipelineData = (object as any).pipelineData || {};
    pipelineData.hsvShader = {
        newColors,
        oldHues,
        tolerances,
    };
    (object as any).pipelineData = pipelineData;
}

// Funkcje pomocnicze

const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
};

const rgbToHsv = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    const s = max === 0 ? 0 : delta / max;
    const v = max;

    if (delta !== 0) {
        if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h *= 60;
        if (h < 0) h += 360;
    }

    return [h, s, v];
};
