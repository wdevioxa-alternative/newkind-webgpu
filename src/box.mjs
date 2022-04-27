import { GObject } from './object.mjs';

export class GBox extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
    }  
    getColors( instance, color )
    {
        const now = Date.now();
        let g1 = Math.cos( now / 1000 );
        let g2 = Math.cos( now / 1000 + Math.PI / 2.0 );
        let g3 = Math.cos( now / 1000 + Math.PI );
        let g4 = Math.cos( now / 1000 + 3.0 * Math.PI / 2.0 );
        let defaultColor1 = [ ( g1 + 1.0 ) * 0.5, 0.0, 0.0, 1.0 ];
        let defaultColor2 = [ 0.0, ( g2 + 1.0 ) * 0.5, 0.0, 1.0 ];
        let defaultColor3 = [ 0.0, 0.0, ( g3 + 1.0 ) * 0.5, 1.0 ];
        let defaultColor4 = [ 0.0, ( g4 + 1.0 ) * 0.5, 0.0, 1.0 ];   
        let colors = new Float32Array( 32 );
        let index = 0;
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];            
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        for ( let i = 0; i < 4; i++ )
            colors[index++] = color[i];
        return colors;
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
    async draw( instance, color ) {
        this.rnd = Math.random() * 2.0 * Math.PI;
        instance.positionBuffer = instance.createBuffer(this.getPositions(instance), GPUBufferUsage.VERTEX,instance.device);
        instance.colorBuffer = instance.createBuffer(this.getColors(instance, color), GPUBufferUsage.VERTEX,instance.device);
        instance.passEncoder.setVertexBuffer(0, instance.positionBuffer);
        instance.passEncoder.setVertexBuffer(1, instance.colorBuffer);
        instance.passEncoder.draw( 8, 1, 0, 0 );
    }
};