import { GObject } from './object.mjs';

export class GText extends GObject
{
    constructor( fontWeight, fontSize, fontFamily, x, y, width, height ) {        
        super( x, y, width, height );
        this.setFontWeight( fontWeight );
        this.setFontSize( fontSize );
        this.setFontFamily( fontFamily );
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
    async draw( instance, textColor, textOut, autoMeasure ) 
    {
        const wa = document.getElementById('wa');

        //if (wa.childNodes.length > 1) wa.childNodes[1].remove(); 

        const cs = document.createElement('canvas');
        var ctx = cs.getContext('2d');
        ctx.font = this.getFontWeight().toString() +
            ' ' + this.getFontSize().toString() + 
            'px ' + this.getFontFamily();
        var fh = this.getHeight();
        var fw = this.getWidth();
        if ( autoMeasure == true ) {
            let mesure = ctx.measureText( textOut );
            fh = mesure.fontBoundingBoxAscent + mesure.fontBoundingBoxDescent;
            fw = mesure.width;
            this.setWidth(Math.ceil(fw));
            this.setHeight(Math.ceil(fh)); 
            fh = this.getHeight();
            fw = this.getWidth();    
        } else {
            ////////////////////////////////////
            // TODO: иначе, сделать по центру
            ////////////////////////////////////
        }
        cs.width = this.getWidth();
        cs.height = this.getHeight();
        ctx.font = this.getFontWeight().toString() + 
            ' ' + this.getFontSize().toString() + 
            'px ' + this.getFontFamily();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.fillStyle = textColor;
        ctx.fillText( textOut, 0, this.getFontSize(), fw );
        const imageBitmap = await createImageBitmap(cs);
        return instance.webGPUTextureFromImageBitmapOrCanvas(instance.device, imageBitmap, true);
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