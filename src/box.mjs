import { GObject } from './object.mjs';

export class GBox extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
    }  
    getColors( instance )
    {
        return new Float32Array([
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0
        ]);
    }
    getPositions( instance )
    {
        let objectwidth = this.getWidth();
        let objectheight = this.getHeight();
        let offsetx = this.getX() + 1;
        let offsety = this.getY() + 1;
        return new Float32Array([
            instance.calcX(offsetx-1), instance.calcY(offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(offsety), 0.0,

            instance.calcX(objectwidth+offsetx), instance.calcY(offsety), 0.0,
            instance.calcX(objectwidth+offsetx), instance.calcY(objectheight+offsety), 0.0,

            instance.calcX(objectwidth+offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(offsetx), instance.calcY(objectheight+offsety), 0.0,

            instance.calcX(offsetx), instance.calcY(objectheight+offsety), 0.0,
            instance.calcX(offsetx), instance.calcY(offsety), 0.0
        ]);
    }
    async draw( instance ) {
        instance.positionBuffer = instance.createBuffer(this.getPositions(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.colorBuffer = instance.createBuffer(this.getColors(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.passEncoder.setVertexBuffer(0, instance.positionBuffer);
        instance.passEncoder.setVertexBuffer(1, instance.colorBuffer);
        instance.passEncoder.draw( 8, 1, 0, 0 );
    }
};