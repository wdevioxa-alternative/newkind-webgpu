export default async (self, actions) => {

    console.log('SETTINGS')
    return {
        init: () => {
            // mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            // mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}