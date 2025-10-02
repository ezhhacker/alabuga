# 📚 API Документация Alabuga Backend

## 🚀 Быстрый старт

### Запуск проекта
```bash
cd backend
PROJECT_NAME=alabuga docker-compose up -d
docker-compose exec app php artisan migrate:fresh --seed
```

### API документация
- **Swagger UI**: http://localhost:8080/api/documentation
- **JSON Schema**: http://localhost:8080/api/documentation.json

## 🔐 Аутентификация

### JWT Токены
Все защищенные endpoints требуют JWT токен в заголовке:
```
Authorization: Bearer {token}
```

### Получение токена
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## 📋 Основные Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/logout` - Выход
- `GET /api/auth/me` - Текущий пользователь

### Пользователи
- `GET /api/users/profile` - Профиль пользователя
- `PUT /api/users/profile` - Обновление профиля

### Миссии
- `GET /api/missions` - Список миссий
- `GET /api/missions/{id}` - Детали миссии
- `POST /api/missions/{id}/start` - Начать миссию
- `POST /api/missions/{id}/complete` - Завершить миссию

### Артефакты
- `GET /api/artifacts` - Артефакты пользователя

### Темы
- `GET /api/themes` - Доступные темы
- `POST /api/themes/{id}/activate` - Активировать тему

### Админка
- `GET /api/admin/themes` - Все темы
- `POST /api/admin/themes` - Создать тему
- `PUT /api/admin/themes/{id}` - Обновить тему
- `DELETE /api/admin/themes/{id}` - Удалить тему

### Статистика
- `GET /api/stats/user` - Статистика пользователя
- `GET /api/stats/leaderboard` - Рейтинг пользователей

## 📝 Примеры запросов

### Регистрация
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Новый Пользователь",
    "email": "new@example.com",
    "password": "password123"
  }'
```

### Получение миссий
```bash
curl -X GET "http://localhost:8080/api/missions?category=Frontend" \
  -H "Authorization: Bearer {token}"
```

### Завершение миссии
```bash
curl -X POST http://localhost:8080/api/missions/1/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "evidence": "Ссылка на проект: https://github.com/user/project"
  }'
```

## 🏗️ Архитектура

### Технологии
- **Laravel 12** - PHP фреймворк
- **PostgreSQL** - База данных
- **JWT** - Аутентификация
- **Scramble** - OpenAPI документация
- **Docker** - Контейнеризация

### Структура
```
app/
├── Http/Controllers/    # API контроллеры
├── Models/              # Eloquent модели
├── Http/Middleware/     # Middleware
└── routes/api.php       # API маршруты
```

## 🔧 Конфигурация

### Environment
```env
APP_NAME=Alabuga
APP_URL=http://localhost:8080
DB_CONNECTION=pgsql
DB_HOST=db
JWT_SECRET=your-jwt-secret
```

### Docker
```yaml
services:
  app:    # Laravel приложение
  db:     # PostgreSQL
  nginx:  # Веб-сервер
```

## 🧪 Тестирование

### Запуск тестов
```bash
docker-compose exec app php artisan test
```

### Тестовые данные
Сидеры создают:
- 4 ранга
- 4 компетенции
- 4 артефакта
- 2 темы
- 5 миссий

## 📊 Мониторинг

### Логи
```bash
docker-compose logs app
```

### Производительность
- Индексы в БД
- Eager loading
- Кэширование
- Пагинация

## 🔒 Безопасность

### Реализовано
- JWT токены
- Валидация данных
- CORS настройки
- Хеширование паролей

### Production
- HTTPS
- Rate limiting
- Валидация БД
- Обновления

## 📞 Поддержка

### Команды
```bash
# Очистка кэша
docker-compose exec app php artisan cache:clear

# Пересоздание БД
docker-compose exec app php artisan migrate:fresh --seed

# Генерация документации
docker-compose exec app php artisan scramble:export
```

---

**Полная документация**: http://localhost:8080/api/documentation
