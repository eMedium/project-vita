// HsvColorReplacePipeline.ts

import * as Phaser from 'phaser';


export interface ColorMapping {
    oldColorRange: { hue: [number, number], tolerance: number };
    newColor: string;
}


export class HsvColorReplacePipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline {
    public static readonly MAX_MAPPINGS = 5;

    constructor(game: Phaser.Game) {
        const maxMappings = HsvColorReplacePipeline.MAX_MAPPINGS;
        const shaderCode = `
        precision mediump float;
  
        uniform sampler2D uMainSampler;
        varying vec2 outTexCoord;
  
        uniform vec3 newColors[${maxMappings}];
        uniform vec2 oldHues[${maxMappings}];
        uniform float tolerances[${maxMappings}];
  
        vec3 rgb2hsv(vec3 c) {
          vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
          vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
          vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
          float d = q.x - min(q.w, q.y);
          float e = 1.0e-10;
          return vec3(abs((q.z + (q.w - q.y)/(6.0*d + e))), d/(q.x + e), q.x);
        }
  
        vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x*6.0 + vec3(0.0,4.0,2.0),
                                   6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
        }
  
        void main(void) {
          vec4 color = texture2D(uMainSampler, outTexCoord);
          vec3 hsv = rgb2hsv(color.rgb);
  
          if (hsv.y < 0.1) {
            gl_FragColor = color;
            return;
          }
  
          float hue = hsv.x * 360.0;
  
          for (int i = 0; i < ${maxMappings}; i++) {
            if (hue >= oldHues[i].x - tolerances[i] && hue <= oldHues[i].y + tolerances[i]) {
              hsv.x = newColors[i].x / 360.0;
              hsv.y = newColors[i].y;
              hsv.z = hsv.z * newColors[i].z;
              vec3 newRgb = hsv2rgb(hsv);
              gl_FragColor = vec4(newRgb, color.a);
              return;
            }
          }
  
          gl_FragColor = color;
        }
      `;

        super({
            game,
            fragShader: shaderCode,
        });
    }

    onBind(gameObject?: Phaser.GameObjects.GameObject): void {
        if (gameObject) {
            const pipelineData = (gameObject as any).pipelineData;
            if (pipelineData && pipelineData.hsvShader) {
                const { newColors, oldHues, tolerances } = pipelineData.hsvShader;

                // Spłaszczenie tablic
                const newColorsFlat = newColors.flat();
                const oldHuesFlat = oldHues.flat();

                // Ustawienie uniformów tablicowych
                this.set3fv('newColors', newColorsFlat);
                this.set2fv('oldHues', oldHuesFlat);
                this.set1fv('tolerances', tolerances);
            }
        }

        super.onBind(gameObject);
    }

    onBatch(gameObject: Phaser.GameObjects.GameObject) {
      if (gameObject) {
          this.flush();
      }
  }
}
