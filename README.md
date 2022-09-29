# Дипломный проект Movies-explorer (Фронтенд). Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик"](https://praktikum.yandex.ru/web/).

## Описание:

Репозиторий для приложения проекта `Movies`, включающий фронтенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, поиском фильмов и их сохранением.

| **Публичный домен** | [Movies](https://movies-explorer-project.nomorepartiesxyz.ru/) |
| ----------------- | -------------------------------------------------------------------- |

API реализован с валидацией запросов, логированием запросов и ошибок, централизованной обработкой ошибок и доступен по [этой](https://api.movies.explorer.nomorepartiesxyz.ru/) ссылке.

Публичный IP-адрес сервера: 84.252.128.255

## Примененные знания
* Верстка
  - Соверменная верстка с использованием Flexbox и Grid Layout
  - Семантическая верстка
  - Адаптивная верстка сайта для разных экранов (от 320 до 1280+)
  - Верстка форм (текстовые поля и кнопки)
  - Методология БЭМ

* React
  - использование Create React App
  - хуки `useState` и `useEffect`
  - поднятие стейта
  - глобальный стейт через React Context
  - управляемые компоненты в элементах формы
  - использование реф для прямого доступа к DOM-элементам

* React Router
  - реализован функционал  регистрации и авторизации
  - защищенные маршруты
  - авторизация через JWT
  - работа с Local Starage

* Бэкенд
  - Node.js
  - express.js
  - MongoDB
  - Mongoose

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/goldlexx/movies-explorer-frontend.git

# установка зависимостей
$ npm install

# запуск develop-сборки фронтенда
$ npm run start

```
---

![Illustration for the project](https://moviestart.ru/wp-content/uploads/2020/12/image-21-02-20-08-02.jpg)











