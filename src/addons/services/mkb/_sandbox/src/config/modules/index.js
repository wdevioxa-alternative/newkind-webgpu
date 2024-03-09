export const config = {
    Breadcrumbs: {
        v1: process.env.REACT_APP_Breadcrumbs_v1 === 'true' ? true : false
    },
    Layout: {
        content: {
            header:  process.env.REACT_APP_Breadcrumbs_v1 !== 'true' ? true : false
        }
    }
}  

export default config