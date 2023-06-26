# tickets-searcher (Билетопоиск)

Файлы проекта находятся в папке tickets-searcher

Для запуска фронтенда выполнить команды:

```
cd tickets-searcher

npm ci

npm run dev
```

<details>
<summary>
Переменные окружения
</summary>
В файле .env.local есть переменная окружения с адресом сервера бэкенда
Если у вас поднят сервер на другом адресе - замените значение

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3001/api/
```

</details>
<br/>
Сервер находится в папке simple_api

Для запуска бэкенда выполнить команды:

```
cd simple_api

node server.js
```
