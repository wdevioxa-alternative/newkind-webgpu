export const checkList = ["Название","Синоним", "Описание", "Включение", "Исключение"]

const CONTENT = `
![alt_text](/001.png)

  | heading | b  |  c |  d  |
  | - | :- | -: | :-: |
  | cell 1 | cell 2 | 3 | 4 |   
  
  
![alt_text](/001.png)
## **Порядок загрузки данных и программ**
В данном разделе описана установка Компонента на 2 сервера (сервер БД и сервер** приложений).
### **Подготовка запуска**
Необходимое программное обеспечение:

- docker (https://docs.docker.com/engine/install/);
- docker-compose (https://docs.docker.com/compose/install/).

Необходимые docker-compose файлы:

- docker-compose-db.yml;
- docker-compose-mkb.yml;
- docker-compose-nginx.yml (каталог с конфигурационными файлами nginx: /nginx\\_config).
### **Запуск базы данных**
Для запуска БД необходимо выполнить шаги:

- перенести на сервер БД файл docker-compose-db.yml;
- отредактировать значение параметра image в файле docker-compose-db.yml (Рисунок 2);



- произвести запуск командой docker-compose -f docker-compose-db.yml up d:



### **Запуск сервисов МКБ-11**
Для запуска сервисов МКБ-11 необходимо выполнить шаги:

- перенести на сервер приложений файл docker-compose-mkb.yml;
- отредактировать значение параметров image в файле docker-compose-mkb.yml;
- отредактировать значение параметров POSTGRES\\_URI в файле docker-compose-mkb.yml указывая адрес сервера, на котором развернули БД;
- произвести запуск командой docker-compose -f docker-compose-mkb.yml up d.



### **Запускаем прокси-сервер (опциональный этап)**
Для запуска прокси-сервера необходимо выполнить шаги:

- перенести на хост файл docker-compose-nginx.yml;
- перенести на хост каталог с конфигурационными файлами nginx: /nginx\\_config;
- произвести конфигурирование nginx под требования площадки;
- отредактировать значение параметра image в файле docker-compose-nginx.yml;
- отредактировать значение параметра volumes в файле docker-compose-db.yml указав путь к директории с конфигурацией;
- произвести запуск командой docker-compose -f docker-compose-nginx.yml up d.
### **Обновление**
Последовательность шагов аналогична приведенным в подпунктах 3.2.1 - 3.2.4, за исключением последнего шага в котором вместо запуска выполняется команда перезапуска: docker-compose -f docker-compose-.yml restart.
`

export { CONTENT }