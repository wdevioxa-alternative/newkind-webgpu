<<<<<<< HEAD
export default (url, name) => {
    return new Promise(function (resolve, reject) {
        let verifyScript = true
        let Script = {}

        for(let item of document.head.querySelectorAll('script')){
            if(item.src.indexOf(`${url}`) > 0){
                verifyScript = false
                Script = item
            }
        }

        if(verifyScript){
            let load = document.createElement('script');
            load.src = url
            document.head.appendChild(load)
            load.onload = (out) =>{
                document.dispatchEvent( new CustomEvent(`${name}-loading`))
                resolve(true)
            }
        } else {
            resolve(true)
        }
    })
=======
export default (url, name) => {
    return new Promise(function (resolve, reject) {
        let verifyScript = true
        let Script = {}

        for(let item of document.head.querySelectorAll('script')){
            if(item.src.indexOf(`${url}`) > 0){
                verifyScript = false
                Script = item
            }
        }

        if(verifyScript){
            let load = document.createElement('script');
            load.src = url
            document.head.appendChild(load)
            load.onload = (out) =>{
                document.dispatchEvent( new CustomEvent(`${name}-loading`))
                resolve(true)
            }
        } else {
            resolve(true)
        }
    })
>>>>>>> 01ce6be67cb59e817833882aafe2b0471ee77a58
}