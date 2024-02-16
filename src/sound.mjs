export class wDSound
{
    constructor( url ) 
    {
	    this.setURL( url );
    }  
    destroy() {

    }
    async init() {
        await this.loadSoundData( this.getURL() )
    }
    getURL() { 
        return this.locationURL;
    }
    setURL( url ) {
        this.locationURL = url;
    }
    async loadSoundData( url ) 
    {
        let response = await fetch(
//            new URL( "webgpu/dist/" + url, window.location.href ).toString()
            new URL( url, window.location.href ).toString()
        );
        return await response.blob();
    }
};
