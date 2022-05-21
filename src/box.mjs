import { GObject } from './object.mjs';

export class GBox extends GObject
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
        this.setColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setDuty( false );
    }
    destroy()
    {
        this.setColorsBuffer( null );
        this.setPositionsBuffer( null );
        this.setDuty( true );
    }
    setPositionsBuffer( positions )
    {
        if ( positions == null )
            if ( this.positionsBuffer != null )
                this.positionsBuffer.destroy();
        this.positionsBuffer = positions;
    }
    getPositionsBuffer()
    {
        return this.positionsBuffer;
    }
    setColorsBuffer( colors )
    {
        if ( colors == null )
            if ( this.colorsBuffer != null )
                this.colorsBuffer.destroy();
        this.colorsBuffer = colors;
    }
    getColorsBuffer()
    {
        return this.colorsBuffer;
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
        let colorsBuffer = new Float32Array( 32 );
        let objectIndex = 0;

        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];
        for ( let i = 0; i < 4; i++ ) colorsBuffer[objectIndex++] = color[i];

        return colorsBuffer;
    }
    getPositions( instance )
    {
        let objectWidth = this.getWidth();
        let objectHeight = this.getHeight();
        let offsetX = this.getX() + 1;
        let offsetY = this.getY() + 1;
        return new Float32Array([
            instance.calcX(offsetX-1), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY), 0.0,
            instance.calcX(offsetX), instance.calcY(offsetY), 0.0
        ]);
    }
    async draw( instance, color )
    {
        let objectRedraw = this.isDuty();
        if ( objectRedraw == true ) {
            this.setPositionsBuffer( null );
            this.setColorsBuffer( null );
            this.setDuty( false );
        }
        let positionsBuffer = this.getPositionsBuffer();
        if ( positionsBuffer == null ) {
            positionsBuffer = instance.createBuffer(this.getPositions(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setPositionsBuffer( positionsBuffer );
        }
        let colorsBuffer = this.getColorsBuffer();
        if ( colorsBuffer == null ) {
            colorsBuffer = instance.createBuffer(this.getColors(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setColorsBuffer( colorsBuffer );
        }
        instance.passEncoder.setPipeline(instance.linePipeline);
        instance.passEncoder.setVertexBuffer(0, positionsBuffer);
        instance.passEncoder.setVertexBuffer(1, colorsBuffer);
        instance.passEncoder.draw( 8, 1, 0, 0 );
    }
};