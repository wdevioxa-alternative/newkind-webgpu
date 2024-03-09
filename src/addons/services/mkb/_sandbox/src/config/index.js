import result from "../modules";

export const system = {
    api: true
}
export const linkNames = process.env.REACT_APP_MAIN_THEME !== 'true' ? [{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Браузер МКБ-11': 'Правила',
    link: '/'
},{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Инструмент кодирования': 'Welcome Book',
    link: '/coding'
},{
    name: 'Декодирование',
    link: '/decoding'
}] : [{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Браузер МКБ-11': 'Правила',
    link: '/'
},{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Инструмент кодирования': 'Welcome Book',
    link: '/coding'
},{
    name: 'Декодирование',
    link: '/decoding'
},{
    name: 'Информация',
    link: '/info',
    chapter: [{
        name: 'Общая информация',
        link: '/info/general',
    },{
        name: 'Для разработчиков МИС',
        link: '/info/container',
    },{
        name: 'Для медицинских работников',
        link: '/info/user',
    }]
},{
    name: 'Управление версиями',
    link: '/admin/update',
    isAuth: true
}];

export const adminLinkNames = process.env.REACT_APP_MAIN_THEME !== 'true' ? [{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Браузер МКБ-11': 'Правила',
    link: '/'
},{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Инструмент кодирования': 'Welcome Book',
    link: '/coding'
},{
    name: 'Декодирование',
    link: '/decoding'
}] : [{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Браузер МКБ-11': 'Правила',
    link: '/'
},{
    name: process.env.REACT_APP_NAME === 'mkb' ? 'Инструмент кодирования': 'Welcome Book',
    link: '/coding'
},{
    name: 'Декодирование',
    link: '/decoding'
},{
    name: 'Информация',
    link: '/info',
    chapter: [{
        name: 'Общая информация',
        link: '/info/general',
    },{
        name: 'Для разработчиков МИС',
        link: '/info/container',
    },{
        name: 'Для медицинских работников',
        link: '/info/user',
    }]
},{
    name: 'Управление версиями',
    link: '/admin/update',
}];

export const name = 'НСИ';

export const profile = {
  singIn: 'Вход для сотрудников',
  searchButton: 'Поиск',
  userName: 'Масалова А. В.',
  profileEnter: 'Профиль',
  profileExit: 'Выйти',
  button: 'Кнопка',
};

export const fillOptions = {
    white100: {
        fill: '#FFF',
        fillOpacity: 0.6,
    },
    black20: {
        fill: '#C7D2E3',
        fillOpacity: 1,
    },
    blue50: {
        fill: '#6C8BC9',
    },
    blue100: {
        fill: '#3256B0',
    },
    blue120: {
        fill: '#3C5099',
    },
};

export const filterCategories = {
	wordsList: [{
        name: 'По алфавиту',
    },{
        name: 'По связанности / соответствию',
    }],
	resultSearch: [{
        name: "По частоте совпадений",
    },{
        name: "По расположению классификации",
    }],
	withoutFilter: 'Без сортировки',
};

export const checkList = ["Название","Синоним", "Описание", "Включение", "Исключение"]
