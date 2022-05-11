import { GObject } from './label.js';

export class GTextBox extends GLabel
{
    constructor( x, y, width, height ) {
        super( x, y, width, height );
    }  
    async draw( instance, textColor, backgroundColor, textOut, autoMeasure ) 
    {

    }
};
