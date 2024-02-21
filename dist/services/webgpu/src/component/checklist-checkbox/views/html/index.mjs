<<<<<<< HEAD
import compoenents from './default/index.mjs'
export const loadHTML = (htmlRelativeUrl, baseUrl) => {
    const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
    return fetch(htmlUrl).then(response => response.text());
}

=======
import compoenents from './default/index.mjs'
export const loadHTML = (htmlRelativeUrl, baseUrl) => {
    const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
    return fetch(htmlUrl).then(response => response.text());
}

>>>>>>> 01ce6be67cb59e817833882aafe2b0471ee77a58
export default  compoenents