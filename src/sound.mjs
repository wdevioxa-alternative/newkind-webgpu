export class wDSound
{
    constructor() 
    {
    }  
    destroy() {

    }
    async loadSoundData( url ) 
    {
        let response = await fetch(
            new URL( url, window.location.href ).toString()
        );
        return await response.arrayBuffer();
    }
};
