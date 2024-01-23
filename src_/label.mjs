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
        this.setPositionsBuffer( null );
        this.setFragUVBuffer( null );
        this.setTextureBindGroup( null );
        this.setDuty( false );
    }  
    destroy()
    {
        this.setImageBitmap( null );
        this.setTextureImage( null );
        this.setPositionsBuffer( null );
        this.setFragUVBuffer( null );
        this.setTextureBindGroup( null );
        this.setDuty( true );
    }
    setTextureBindGroup( group )
    {
        this.textureBindGroup = group;
    }
    getTextureBindGroup() 
    {
        return this.textureBindGroup;
    }    
    setTextureImage( texture )
    {
        this.textureImage = texture;
    }
    getTextureImage() 
    {
        return this.textureImage;
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
    getFragUVBuffer() 
    {
        return this.fragUVBuffer;
    }
    setFragUVBuffer( fragUV )
    {
        if ( fragUV == null )
            if ( this.fragUVBuffer != null )
                this.fragUVBuffer.destroy();
        this.fragUVBuffer = fragUV;
    }
    setImageBitmap( bitmap ) 
    {
        this.imageBitmap = bitmap;
    }
    getImageBitmap()
    {
        return this.imageBitmap;
    }
    setFontWeight( fontWeight ) 
    {
        this.fontWeight = fontWeight;
    }
    getFontWeight() 
    {
        return this.fontWeight;
    }
    setFontSize( fontSize ) 
    {
        this.fontSize = fontSize;
    }
    getFontSize() 
    {
        return this.fontSize;
    }
    setFontFamily( fontFamily ) 
    {
        this.fontFamily = fontFamily;
    }
    getFontFamily() 
    {
        return this.fontFamily;
    }    
    async draw( instance, textColor, backgroundColor, textOut, autoMeasure, calculate = false ) 
    {
        const objectRedraw = this.isDuty();
        if ( objectRedraw == true ) {
            this.setTextureImage( null );
            this.setImageBitmap( null );
            this.setTextureBindGroup( null );
            this.setPositionsBuffer( null );
            this.setFragUVBuffer( null );
            this.setDuty( false );
        }
        var textureImage = this.getTextureImage();
        if ( textureImage == null ) 
        {
            const cs = document.createElement('canvas');
            var ctx = cs.getContext('2d');
            ctx.font = this.getFontWeight().toString() + ' ' + this.getFontSize().toString() + 'pt ' + this.getFontFamily();
            var fh = this.getHeight();
            var fw = this.getWidth();
            var fx = 0;
            var fy = 0;
            if ( autoMeasure == true ) {
                ////////////////////////////////////
                // автоматическая подгонка контура
                ////////////////////////////////////            
                var mesure = ctx.measureText( textOut );

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
                var mesure = ctx.measureText( textOut );

                fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;
                fw = mesure.width;

                fx = ( this.getWidth() - fw ) / 2;
                fy = this.getHeight() - ( this.getHeight() - fh ) / 2;
            }

            cs.height = this.getHeight();
            cs.width = this.getWidth();

            ctx.font = this.getFontWeight().toString() + ' ' + this.getFontSize().toString() + 'pt ' + this.getFontFamily();

            ctx.fillStyle = backgroundColor;
            ctx.fillRect( 0, 0, this.getWidth(), this.getHeight() );
            
            ctx.fillStyle = textColor;
            ctx.fillText( textOut, fx, fy, fw );

            var imageBitmap = await createImageBitmap( cs ); //, { colorSpaceConversion: 'default', resizeQuality: 'pixelated' } );
            this.setImageBitmap( imageBitmap );

            textureImage = instance.webGPUTextureFromImageBitmapOrCanvas( instance.device, this.getImageBitmap(), true );
            this.setTextureImage( textureImage );
        }
        if ( calculate == true ) {
            var imageBitmap = this.getImageBitmap();
            if ( imageBitmap == null ) return null;
            return { x: this.getX(), y: this.getY(), width: imageBitmap.width, height: imageBitmap.height };
        }
        var textureBindGroup = this.getTextureBindGroup();
        if ( textureBindGroup == null ) {
            textureBindGroup = instance.device.createBindGroup({
                layout: instance.texturePipeline.getBindGroupLayout(0),
                entries: [
                {
                    binding: 0,
                    resource: instance.sampler,
                },
                {
                    binding: 1,
                    resource: textureImage.createView({
			baseMipLevel: 0,
			mipLevelCount: 3
		    }),
                }
                ]
            });
            this.setTextureBindGroup( textureBindGroup );
        };
        var positionsBuffer = this.getPositionsBuffer();
        if ( positionsBuffer == null ) {
            positionsBuffer = instance.createBuffer(this.getPositions(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setPositionsBuffer( positionsBuffer );
        }
        var fragUVBuffer = this.getFragUVBuffer();
        if ( fragUVBuffer == null ) {
            fragUVBuffer = instance.createBuffer(this.getFragUV(instance), GPUBufferUsage.VERTEX, instance.device);
            this.setFragUVBuffer( fragUVBuffer );
        }
        instance.passEncoder.setPipeline(instance.texturePipeline);
        instance.passEncoder.setBindGroup(0, textureBindGroup);
        instance.passEncoder.setVertexBuffer(0, positionsBuffer);
        instance.passEncoder.setVertexBuffer(1, fragUVBuffer);
        instance.passEncoder.draw(6, 1, 0, 0);
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
        var objectWidth = this.getWidth();
        var objectHeight = this.getHeight();

        var offsetX = this.getX() + 1;
        var offsetY = this.getY() + 1;

        return new Float32Array( [
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY),
            instance.calcX(objectWidth+offsetX), instance.calcY(offsetY),
	    instance.calcX(offsetX), instance.calcY(offsetY),
            instance.calcX(objectWidth+offsetX), instance.calcY(objectHeight+offsetY),
	    instance.calcX(offsetX), instance.calcY(offsetY),
            instance.calcX(offsetX), instance.calcY(objectHeight+offsetY)
        ] );
    }
}