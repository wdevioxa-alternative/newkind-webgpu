import { Body } from '../components/Body'
import config from '../config/modules'

let routesAll = [{
    icon: 'mkb11',
    title: 'Инструмент кодирования',
    path: '/coding/*',
    breadcrumb: "Инструмент кодирования"
},{
    icon: 'mkb11',
    title: 'Декодирование',
    path: '/decoding/*',
    breadcrumb: "Декодирование"
},{
    icon: 'mkb11',
    title: 'Информация',
    module: 'Info',
    path: '/info/*',
    Body: Body,
    breadcrumb: "Информация"
},{
    icon: 'mkb11',
    title: 'НСИ',
    module: 'Main',
    path: '/*',
    Body: Body,
    breadcrumb: 'НСИ'
},{
    icon: 'mkb11',
    title: 'Админ Панель',
    module: 'Admin',
    path: '/admin/*',
    Body: Body,
    breadcrumb: "Админ Панель",
},{
    icon: 'mkb11',
    title: 'Инструмент кодирования',
    path: '/testing/coding/*',
    breadcrumb: "Инструмент кодирования"
},{
    icon: 'mkb11',
    title: 'Декодирование',
    path: '/testing/decoding/*',
    breadcrumb: "Декодирование"
},{
    icon: 'mkb11',
    title: 'МКБ-11',
    path: '/testing/page/*',
    breadcrumb: "МКБ-11"
},{
    icon: 'mkb11',
    title: 'Информация',
    module: 'Info',
    path: '/testing/info/*',
    Body: Body,
    breadcrumb: "Информация"
},{
    icon: 'mkb11',
    title: 'НСИ',
    module: 'Main',
    path: '/testing/*',
    Body: Body,
    breadcrumb: 'НСИ'
},{
    icon: 'mkb11',
    title: 'Админ Панель',
    module: 'Admin',
    path: '/testing/admin/*',
    Body: Body,
    breadcrumb: "Админ Панель",
}];

if(!config.Breadcrumbs.v1) {
    routesAll.push({
        icon: 'mkb11',
        title: 'МКБ-11',
        path: '/page',
        breadcrumb: "СТРАНИЦА"
    })

    routesAll.push({
        icon: 'mkb11',
        title: 'МКБ-11',
        path: '/page/*',
        breadcrumb: ""
    })    
} else {
    routesAll.push({
        icon: 'mkb11',
        title: 'МКБ-11',
        path: '/page/*',
        breadcrumb: "МКБ-11"
    })
}

const routes = [{
        icon: 'mkb11',
        title: 'Инструмент кодирования',
        path: '/coding/*',
        breadcrumb: "Инструмент кодирования"
    },{
        icon: 'mkb11',
        title: 'Декодирование',
        path: '/decoding/*',
        breadcrumb: "Декодирование"
    },{
        icon: 'mkb11',
        title: 'МКБ-11',
        path: '/page/*',
        breadcrumb: "МКБ-11"
    },{
        icon: 'mkb11',
        title: 'Информация',
        module: 'Info',
        path: '/info/*',
        Body: Body,
        breadcrumb: "Информация"
    },{
        icon: 'mkb11',
        title: 'НСИ',
        module: 'Main',
        path: '/*',
        Body: Body,
        breadcrumb: 'НСИ'
    },{
        icon: 'mkb11',
        title: 'Инструмент кодирования',
        path: '/testing/coding/*',
        breadcrumb: "Инструмент кодирования"
    },{
        icon: 'mkb11',
        title: 'Декодирование',
        path: '/testing/decoding/*',
        breadcrumb: "Декодирование"
    },{
        icon: 'mkb11',
        title: 'МКБ-11',
        path: '/testing/page/*',
        breadcrumb: "МКБ-11"
    },{
        icon: 'mkb11',
        title: 'НСИ',
        module: 'Main',
        path: '/testing/*',
        Body: Body,
        breadcrumb: 'НСИ'
    }];

let result = routesAll

if(process.env.REACT_APP_MAIN_THEME !== 'true') {
    result = routes
}

export default result;
