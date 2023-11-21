# Backend for "good-trip"

## Стек:
- Node.js
- Express.js
- Multer

## Планы по доработке:
- Cors
- сохранение в избранное (???)

## Обновлено:
- post('/signup') - добавление пользователя в БД, в качестве фото добавляется дефолтное изображение
- post('/signin') - авторизация пользователя, добавление токена в cookies
- post('/place/') - создание карточки в БД. Загруженная картинка добавляется в папку upload/places, а её название помещается в БД в раздел "photo"
- get('/user/:userId') - информация о пользователе
- get('/user/avatar/:imgId') - получение аватарки пользователя
- get('/upload/places/:imgId') - получение картинки из "карточки"
- delete('/place/:placeId') удаление карточек, также удаляет фотографию из папки
- patch('/user/me') обновление данных, в т.ч. фото
- валидация body/params запросов