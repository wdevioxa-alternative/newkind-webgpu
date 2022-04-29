import { GObject } from './object.mjs';

export class GLabel extends GObject
{
    constructor( fontWeight, fontSize, fontFamily, x, y, width, height ) {        
        super( x, y, width, height );
        this.setFontWeight( fontWeight );
        this.setFontSize( fontSize );
        this.setFontFamily( fontFamily );
        this.setImageBitmap( null );
        this.setTextureImage( null );
    }  
    setTextureImage( texture )
    {
        this.textureImage = texture;
    }
    getTextureImage() 
    {
        return this.textureImage;
    }
    setImageBitmap( bitmap ) 
    {
        this.imageBitmap = bitmap;
    }
    getImageBitmap()
    {
        return this.imageBitmap;
    }
    setFontWeight( fontWeight ) {
        this.fontWeight = fontWeight;
    }
    getFontWeight() {
        return this.fontWeight;
    }
    setFontSize( fontSize ) {
        this.fontSize = fontSize;
    }
    getFontSize() {
        return this.fontSize;
    }
    setFontFamily( fontFamily ) {
        this.fontFamily = fontFamily;
    }
    getFontFamily() {
        return this.fontFamily;
    }    
    async draw( instance, textColor, backgroundColor, textOut, autoMeasure ) 
    {
        if ( this.setTextureImage() == null ) 
        {
            const cs = document.createElement('canvas');
            var ctx = cs.getContext('2d');
            ctx.font = this.getFontWeight().toString() +
                ' ' + this.getFontSize().toString() + 
                'px ' + this.getFontFamily();
            var fh = this.getHeight();
            var fw = this.getWidth();
            var fx = 0;
            var fy = 0;
            if ( autoMeasure == true ) {
                ////////////////////////////////////
                // автоматическая подгонка контура
                ////////////////////////////////////            
                let mesure = ctx.measureText( textOut );
                fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;
                fw = mesure.width;
                this.setWidth(Math.ceil(fw));
                this.setHeight(Math.ceil(fh)); 
                fh = this.getHeight();
                fw = this.getWidth();
                fx = 0;
                fy = this.getFontSize();
            } else {
                ////////////////////////////////////
                // по центру указанного контура
                ////////////////////////////////////
                let mesure = ctx.measureText( textOut );
                fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;
                fw = mesure.width;
                fx = ( this.getWidth() - fw ) / 2;
                fy = this.getHeight() - ( this.getHeight() - fh ) / 2;
            }
            cs.height = this.getHeight();
            cs.width = this.getWidth();
            ctx.font = this.getFontWeight().toString() + 
                ' ' + this.getFontSize().toString() + 
                'px ' + this.getFontFamily();

            ctx.fillStyle = backgroundColor;
            ctx.fillRect( 0, 0, this.getWidth(), this.getHeight() );
            ctx.fillStyle = textColor;
            let r = parseInt(ctx.fillStyle.substring(1,3), 16);
            let g = parseInt(ctx.fillStyle.substring(3,5), 16);
            let b = parseInt(ctx.fillStyle.substring(5,7), 16);
            let color = 'rgba(' + r + ',' + g + ',' + b + ',' + 1.0 + ')';
            ctx.fillStyle = color;
            ctx.fillText( textOut, fx, fy, fw );

            let imageBitmap = await createImageBitmap( cs );
            this.setImageBitmap( imageBitmap );

            let textureImage = instance.webGPUTextureFromImageBitmapOrCanvas( instance.device, this.getImageBitmap(), true );
            this.setTextureImage( textureImage );
        }

        let bindGroup = instance.device.createBindGroup({
            layout: instance.texturePipeline.getBindGroupLayout(0),
            entries: [
              {
                binding: 0,
                resource: instance.sampler,
              },
              {
                binding: 1,
                resource: this.getTextureImage().createView(),
              }
            ]
        });
        
        let positionBuffer = instance.createBuffer(this.getPositions(instance), GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push( positionBuffer );
        let i1 = instance.GPUbuffers.length - 1;        

        let fragUVBuffer = instance.createBuffer(this.getFragUV(instance), GPUBufferUsage.VERTEX, instance.device);
        instance.GPUbuffers.push( fragUVBuffer );
        let i2 = instance.GPUbuffers.length - 1;

        instance.passEncoder.setPipeline(instance.texturePipeline);

        instance.passEncoder.setBindGroup(0, bindGroup);
        instance.passEncoder.setVertexBuffer(0, instance.GPUbuffers[i1]);
        instance.passEncoder.setVertexBuffer(1, instance.GPUbuffers[i2]);

        instance.passEncoder.draw(6, 1, 0, 0);

        instance.passEncoder.setPipeline(instance.linePipeline);
    }
    getColors( instance )
    {
        return new Float32Array([
            1.0, 0.0, 0.0, 1.0, // 🔴
            0.0, 1.0, 0.0, 1.0, // 🟢
            0.0, 1.0, 0.0, 1.0, // 🟢
            0.0, 0.0, 1.0, 1.0, // 🔵
            0.0, 0.0, 1.0, 1.0, // 🔵
            0.0, 1.0, 0.0, 1.0, // 🟢
            0.0, 1.0, 0.0, 1.0, // 🟢
            1.0, 0.0, 0.0, 1.0  // 🔴
        ]);
    }    
    getFragUV( instance )
    {
        return new Float32Array([
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 0.0,
            0.0, 1.0
        ]);
    }    
    getPositions( instance )
    {
        let objectWidth = this.getWidth();
        let objectHeight = this.getHeight();
        let offsetX = this.getX() + 1;
        let offsetY = this.getY() + 1;
        return new Float32Array([
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY),
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY),
            instance.calcX(offsetX), instance.calcY(offsetY),
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY), 
            instance.calcX(offsetX), instance.calcY(offsetY), 
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY)
        ]);
    }
}