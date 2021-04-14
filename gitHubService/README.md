# gitHubService

Express.js + MySQL

1) Создать базу данных
2) Импортировать в нее дамп git.sql
3) В файле config.json изменить параметры на необходимые
4) В корне выполнить npm install, затем node app.js


# API

## GET /api/repos

Список всех репозиториев/ конткретного по имени или id на гитхабе

### request
        GET http://localhost:3000/api/repos
        [query string] name (optional)
        [query string] gitId (optional)
  

### response 
[
    {
        "id": 1,
        "name": "freeCodeCamp",
        "stars": 322798,
        "watchers": 322798,
        "url": "https://github.com/freeCodeCamp/freeCodeCamp",
        "gitId": 28457823
    },
    {
        "id": 9,
        "name": "free-programming-books",
        "stars": 182859,
        "watchers": 182859,
        "url": "https://github.com/EbookFoundation/free-programming-books",
        "gitId": 13491895
    },
    ...
]


## GET /api/sync

Сброс таймера парсера 

### request
        GET http://localhost:3000/api/repos



