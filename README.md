<div align="center">

# 🎬 Movies Explorer

React-приложение для поиска фильмов, фильтрации короткометражек и сохранения фильмов в личный список.

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=111)](https://react.dev/) [![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=fff)](https://workers.cloudflare.com/) [![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-222?logo=github)](https://goldlexx.github.io/movies-explorer-frontend/)

</div>

## Возможности

- локальный каталог из восьми демонстрационных фильмов;
- поиск и фильтр короткометражек;
- регистрация, вход и восстановление сессии;
- сохранение и удаление фильмов через API.

## Демонстрация

[Открыть Movies Explorer](https://goldlexx.github.io/movies-explorer-frontend/)

## Архитектура

Каталог и постеры демонстрационных фильмов входят во frontend. Пользователи и сохранённые фильмы обслуживаются отдельным [Cloudflare Workers API](https://movies-explorer-api.rustik-yuldashev.workers.dev).

## Установка и запуск

```bash
npm ci
npm start
```

Production-сборка: `npm run build`.

## Технологии

React, React Router, JavaScript, CSS, Cloudflare Workers, D1.

## Лицензия

Лицензия в репозитории не указана.
