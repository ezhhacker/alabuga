# 🚀 Инструкции по развертыванию Alabuga

## 📋 Быстрый старт

### 1. Запуск бэкенда
```bash
cd backend
PROJECT_NAME=alabuga docker-compose up -d
```

### 2. Настройка базы данных
```bash
docker-compose exec app php artisan migrate:fresh --seed
```

### 3. Запуск фронтенда
```bash
cd frontend
npm install
npm start
```

### 4. Открытие приложения
- **Фронтенд**: http://localhost:3000
- **API**: http://localhost:8080/api
- **Документация API**: http://localhost:8080/api/documentation

## 🔧 Конфигурация

### Переменные окружения
```env
# Backend
PROJECT_NAME=alabuga
APP_URL=http://localhost:8080
DB_HOST=db
DB_PORT=5432
DB_DATABASE=alabuga
DB_USERNAME=root
DB_PASSWORD=root

# Frontend
REACT_APP_API_URL=http://localhost:8080/api
```

### Docker сервисы
- **app** - Laravel приложение (порт 8080)
- **db** - PostgreSQL база данных (порт 5432)
- **nginx** - Веб-сервер
- **xray** - Прокси (опционально)

## 📊 Тестовые данные

После запуска миграций создаются:
- **4 ранга**: Новичок, Исследователь, Мастер, Легенда
- **4 компетенции**: Программирование, Дизайн, Аналитика, Коммуникация
- **4 артефакта**: Амулет тестирования, Кольцо компиляции, Щит отладки, Код-меч
- **2 темы**: Космическая Одиссея, Фэнтези Мир
- **5 миссий**: Разных категорий и веток
- **1 тестовый пользователь**: test@example.com / password

## 🎮 Функциональность

### ✅ Реализованные функции
- **Аутентификация**: Регистрация, вход, JWT токены
- **Пользователи**: Профиль, статистика, ранги
- **Миссии**: Список, детали, выполнение, награды
- **Артефакты**: Коллекция, уровни редкости
- **Темы**: Переключение, админка, создание
- **Статистика**: Личная, рейтинги, достижения
- **Админка**: Управление темами, CRUD операции

### 🔗 API Endpoints
- **Аутентификация**: `/api/auth/*`
- **Пользователи**: `/api/users/*`
- **Миссии**: `/api/missions/*`
- **Артефакты**: `/api/artifacts`
- **Темы**: `/api/themes/*`
- **Админка**: `/api/admin/*`
- **Статистика**: `/api/stats/*`

## 🛠️ Разработка

### Backend (Laravel)
```bash
# Логи
docker-compose logs app

# Консоль
docker-compose exec app php artisan tinker

# Тесты
docker-compose exec app php artisan test

# Очистка кэша
docker-compose exec app php artisan cache:clear
```

### Frontend (React)
```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для production
npm run build

# Тесты
npm test
```

## 📚 Документация

### API документация
- **Swagger UI**: http://localhost:8080/api/documentation
- **JSON Schema**: http://localhost:8080/api/documentation.json
- **Backend README**: backend/API_DOCS.md

### Архитектура
- **Общая**: README.md
- **Задачи**: TASKS.md
- **Прогресс**: PROGRESS.md
- **Архитектура**: ARCH.md

## 🔒 Безопасность

### Реализованные меры
- JWT токены для аутентификации
- Валидация всех входных данных
- CORS настройки для фронтенда
- Хеширование паролей
- Middleware для проверки токенов

### Рекомендации для production
- Настройка HTTPS
- Rate limiting для API
- Валидация на уровне базы данных
- Регулярные обновления зависимостей

## 📈 Производительность

### Оптимизации
- Индексы в базе данных
- Eager loading для связанных моделей
- Кэширование конфигурации
- Пагинация для больших списков

### Мониторинг
```bash
# Логи приложения
docker-compose logs app

# Логи базы данных
docker-compose logs db

# Статистика контейнеров
docker stats
```

## 🧪 Тестирование

### Backend тесты
```bash
# Все тесты
docker-compose exec app php artisan test

# Конкретный тест
docker-compose exec app php artisan test --filter AuthTest

# С покрытием
docker-compose exec app php artisan test --coverage
```

### Frontend тесты
```bash
cd frontend
npm test
```

## 🚨 Устранение неполадок

### Частые проблемы

#### 1. Ошибка подключения к БД
```bash
# Проверьте статус контейнеров
docker-compose ps

# Перезапустите БД
docker-compose restart db
```

#### 2. JWT ошибки
```bash
# Сгенерируйте новый JWT ключ
docker-compose exec app php artisan jwt:secret
```

#### 3. CORS ошибки
- Проверьте настройки CORS в `config/cors.php`
- Убедитесь, что фронтенд обращается к правильному URL

#### 4. Проблемы с миграциями
```bash
# Очистите и пересоздайте БД
docker-compose exec app php artisan migrate:fresh --seed
```

### Полезные команды
```bash
# Очистка кэша
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear

# Пересоздание БД
docker-compose exec app php artisan migrate:fresh --seed

# Генерация документации
docker-compose exec app php artisan scramble:export

# Просмотр логов
docker-compose logs -f app
```

## 📞 Поддержка

### Логи и отладка
```bash
# Логи всех сервисов
docker-compose logs

# Логи конкретного сервиса
docker-compose logs app
docker-compose logs db

# Логи в реальном времени
docker-compose logs -f app
```

### Полезные файлы
- **Конфигурация**: `backend/.env`
- **Docker Compose**: `backend/docker-compose.yml`
- **API маршруты**: `backend/routes/api.php`
- **Модели**: `backend/app/Models/`
- **Контроллеры**: `backend/app/Http/Controllers/`

## 🎉 Готово!

После выполнения всех шагов у вас будет:
- ✅ Полнофункциональная система геймификации
- ✅ Современный React фронтенд
- ✅ Laravel API с документацией
- ✅ PostgreSQL база данных
- ✅ Docker контейнеризация
- ✅ JWT аутентификация
- ✅ Система тем
- ✅ Админка
- ✅ Статистика и рейтинги

**Приложение готово к использованию!** 🚀
