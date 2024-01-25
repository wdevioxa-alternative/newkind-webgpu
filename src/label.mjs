import { wDObject } from './object.mjs';

export class wDLabel extends wDObject
{
    constructor( instance, fontWeight, fontSize, fontFamily, x, y, _width, _height ) 
    {        
        super( instance, x, y, _width, _height );
        this.setFontWeight( fontWeight );
        this.setFontSize( fontSize );
        this.setFontFamily( fontFamily );
        this.setImageBitmap( null );
        this.setTextureImage( null );
        this.setPositionBuffer( null );
        this.setFragUVBuffer( null );
        this.setTextureBindGroup( null );
        this.setUniformShaderLocation( null );
        this.setDuty( false );
    }  
    destroy()
    {
        this.setImageBitmap( null );
        this.setTextureImage( null );
        this.setPositionBuffer( null );
        this.setFragUVBuffer( null );
        this.setTextureBindGroup( null );
        this.setUniformShaderLocation( null );
        this.setDuty( true );
    }
    async init() {
        let instance = this.getInstance();
        this.setFragUVBuffer( null );
        this.setPositionBuffer( null );
        this.setTextureImage( null );
        this.setUniformShaderLocation( 
            this.setUniformShaderFlag( instance.device, 10 ) 
        );
        this.setDuty( false );
    }
    set( fs, x , y, _width = -1, _height = -1 )
    {
        if ( this.getFontSize() != fs ) {
            this.setFontSize( fs );
            this.setDuty( true );
        }
        if ( this.getX() != x ) {
            this.setX( x );
            this.setDuty( true );
        }
        if ( this.getY() != y ) {
            this.setY( y );
            this.setDuty( true );
        }
        if ( _width != -1 ) {
            if ( this.getWidth() != _width ) {
                this.setWidth( _width );
                this.setDuty( true );
            }
        }
        if ( _height != -1 ) { 
            if ( this.getHeight() != _height ) {
                this.setHeight( _height );
                this.setDuty( true );
            }
        }
    }
    setTextureBindGroup( group )
    {
        this.textureBindGroup = group;
    }
    getTextureBindGroup() 
    {
        return this.textureBindGroup;
    }    
    setShaderBindGroup( group )
    {
        this.shaderBindGroup = group;
    }
    getShaderBindGroup() 
    {
        return this.shaderBindGroup;
    }    
    setTextureImage( texture )
    {
        this.textureImage = texture;
    }
    getTextureImage() 
    {
        return this.textureImage;
    }
    setPositionBuffer( positions )
    {
        if ( positions == null )
            if ( this.positionsBuffer != null )
                this.positionsBuffer.destroy();
        this.positionsBuffer = positions;
    }
    getPositionBuffer() 
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
    async draw( instance, textColor, backgroundColor, textOut, autoMeasure, calculateOnly = false ) 
    {
        let flag = this.isDuty();
        if ( flag == true ) {
            this.setTextureImage( null );
            this.setImageBitmap( null );
            this.setPositionBuffer( null );
            this.setFragUVBuffer( null );
            this.setTextureBindGroup( null );
            this.setShaderBindGroup( null );
            this.setDuty( false );
        }

        let textureImage = this.getTextureImage();
        if ( textureImage == null ) 
        {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');

            let fh = this.getHeight();
            let fw = this.getWidth();

            let fx = 0;
            let fy = 0;

            if ( autoMeasure == true ) {
                //////////////////////////////////////////////////////
                // автоматическая подгонка контура
                //////////////////////////////////////////////////////
                let mesure = context.measureText( textOut );

                fw = mesure.width;
                fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;
            
                this.setWidth( fw );
                this.setHeight( fh ); 

                fx = 0;
                fy = mesure.fontBoundingBoxAscent;
            } else {
                ////////////////////////////////////
                // по центру указанного контура
                ////////////////////////////////////
                let mesure = context.measureText( textOut );

                fw = mesure.width;
                fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;

                fx = ( this.getWidth() - fw ) / 2;
                fy = this.getHeight() - ( this.getHeight() - fh ) / 2;
            }

            canvas.height = this.getHeight();
            canvas.width = this.getWidth();

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = this.getFontWeight().toString() + ' ' + this.getFontSize().toString() + 'pt ' + this.getFontFamily();

            context.fillStyle = backgroundColor;
            context.fillRect( 0, 0, this.getWidth(), this.getHeight() );
            
            context.fillStyle = textColor;
            context.fillText( textOut, fx, fy, fw );

            let bitmap = await createImageBitmap( canvas ); //, { colorSpaceConversion: 'default', resizeQuality: 'pixelated' } );
            this.setImageBitmap( bitmap );

            textureImage = instance.device.createTexture({
                size: [ canvas.width, canvas.height, 1 ],
                format: 'rgba8unorm',
                usage:
                    GPUTextureUsage.TEXTURE_BINDING |
                    GPUTextureUsage.COPY_DST |
                    GPUTextureUsage.RENDER_ATTACHMENT,
            });
            
            instance.device.queue.copyExternalImageToTexture(
                { source: canvas },
                { texture: textureImage },
                [ canvas.width, canvas.height ]
            );
        
            this.setTextureImage( textureImage );
            canvas.remove();
        }

        if ( calculateOnly == true ) {
            let bitmap = this.getImageBitmap();
            if ( bitmap == null ) return null;
            return { x: this.getX(), y: this.getY(), width: bitmap.width, height: bitmap.height };
        }

        let positionBuffer = this.getPositionBuffer();
        if ( positionBuffer == null ) {
            positionBuffer = instance.createBuffer( this.getPositions( instance ), GPUBufferUsage.VERTEX, instance.device );
            this.setPositionBuffer( positionBuffer );
        }

        let fragUVBuffer = this.getFragUVBuffer();
        if ( fragUVBuffer == null ) {
            fragUVBuffer = instance.createBuffer( this.getFragUV( instance ), GPUBufferUsage.VERTEX, instance.device );
            this.setFragUVBuffer( fragUVBuffer );
        }

        let shaderBindGroup = this.getShaderBindGroup();
        if ( shaderBindGroup == null ) {
            shaderBindGroup = instance.device.createBindGroup( {
                layout: instance.pipeline.getBindGroupLayout( 0 ),
                entries: [ {
                    binding: 0,
                    resource: {
                        buffer: this.uniformlShaderLocation
                    }
                } ]
            } );
        }

        let textureBindGroup = this.getTextureBindGroup();
        if ( textureBindGroup == null ) {
            textureBindGroup = instance.device.createBindGroup( {
		        layout: instance.pipeline.getBindGroupLayout(1),
		        entries: [ {
		            binding: 0,
		            resource: instance.sampler,
		        }, {
		            binding: 1,
		            resource: this.textureImage.createView({
                        baseMipLevel: 0,
                        mipLevelCount: 1
                    }),
		        } ]
	        } );
        }

        instance.passEncoder.setBindGroup( 0, shaderBindGroup );
        instance.passEncoder.setBindGroup( 1, textureBindGroup );

        instance.passEncoder.setVertexBuffer(0, positionBuffer);
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