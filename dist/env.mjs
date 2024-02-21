<<<<<<< HEAD
const myHeaders = new Headers();

const envInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
};

let ENV = {}

try {
    const myRequest = new Request("/env.json", envInit);
    const response = await fetch(myRequest);
    ENV = await response.json()
} catch (e) {
    console.error('ERROR FETCH JSON', e)
}
export const env = (props) => {
    return ENV
=======
const myHeaders = new Headers();

const envInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
};

let ENV = {}

try {
    const myRequest = new Request("/env.json", envInit);
    const response = await fetch(myRequest);
    ENV = await response.json()
} catch (e) {
    console.error('ERROR FETCH JSON', e)
}
export const env = (props) => {
    return ENV
>>>>>>> 01ce6be67cb59e817833882aafe2b0471ee77a58
}