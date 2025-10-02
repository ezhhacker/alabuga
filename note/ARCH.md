# 🏗️ Архитектура системы Alabuga

## 📋 Обзор

Alabuga - это полнофункциональная система геймификации, построенная на современном стеке технологий с разделением на фронтенд и бэкенд.

## 🎯 Принципы архитектуры

### 1. Разделение ответственности
- **Frontend**: Пользовательский интерфейс и взаимодействие
- **Backend**: Бизнес-логика и управление данными
- **Database**: Хранение и целостность данных

### 2. Масштабируемость
- Модульная структура
- Микросервисная готовность
- Горизонтальное масштабирование

### 3. Безопасность
- JWT аутентификация
- Валидация на всех уровнях
- Защита от основных уязвимостей

## 🏗️ Общая архитектура

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Frontend      │◄────────────────►│   Backend       │
│   (React)       │                 │   (Laravel)     │
└─────────────────┘                 └─────────────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │   Database      │
                                    │   (PostgreSQL)  │
                                    └─────────────────┘
```

## 🎨 Frontend архитектура

### Технологический стек
- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Context API** - Управление состоянием
- **Fetch API** - HTTP клиент

### Структура компонентов

```
src/
├── components/           # Переиспользуемые компоненты
│   ├── Layout.tsx       # Общий макет
│   ├── ThemeSwitcher.tsx # Переключатель тем
│   ├── UserStats.tsx    # Статистика пользователя
│   ├── Achievements.tsx # Достижения
│   └── ProtectedRoute.tsx # Защищенные маршруты
├── pages/               # Страницы приложения
│   ├── DashboardPage.tsx # Главная страница
│   ├── ProfilePage.tsx  # Профиль пользователя
│   ├── MissionsPage.tsx # Список миссий
│   ├── MissionDetailPage.tsx # Детали миссии
│   └── AdminPage.tsx    # Админка
├── context/             # Контексты состояния
│   ├── AppContext.tsx   # Основное состояние
│   └── ThemeContext.tsx # Состояние тем
├── services/            # API сервисы
│   └── api.ts          # HTTP клиент
└── types/               # TypeScript типы
    └── index.ts        # Определения типов
```

### Управление состоянием

#### AppContext
```typescript
interface AppState {
  user: User | null;
  currentRank: Rank | null;
  missions: Mission[];
  competences: Competence[];
  artifacts: Artifact[];
  storeItems: StoreItem[];
  logs: Log[];
  isLoading: boolean;
  error: string | null;
}
```

#### Actions
- `SET_USER` - Установка пользователя
- `SET_MISSIONS` - Загрузка миссий
- `UPDATE_USER_EXPERIENCE` - Обновление опыта
- `ADD_ARTIFACT` - Добавление артефакта
- `CLEAR_STATE` - Очистка состояния

### API интеграция

#### HTTP клиент
```typescript
class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>>
  
  // Аутентификация
  async login(credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>>
  async register(userData: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>>
  async logout(): Promise<ApiResponse<null>>
  
  // Пользователи
  async getCurrentUser(): Promise<ApiResponse<User>>
  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>>
  
  // Миссии
  async getMissions(page = 1, limit = 10): Promise<ApiResponse<{ missions: Mission[]; pagination: any }>>
  async getMission(missionId: number): Promise<ApiResponse<Mission>>
  async startMission(missionId: number): Promise<ApiResponse<{ mission_id: number; status: string; started_at: string }>>
  async completeMission(missionId: number, evidence: string): Promise<ApiResponse<{ mission_id: number; status: string; completed_at: string; rewards: { experience: number; mana: number; artifacts: Artifact[] } }>>
}
```

## 🔧 Backend архитектура

### Технологический стек
- **Laravel 12** - PHP фреймворк
- **PostgreSQL** - База данных
- **JWT** - Аутентификация
- **Docker** - Контейнеризация

### Структура приложения

```
app/
├── Http/
│   ├── Controllers/     # Контроллеры API
│   │   ├── AuthController.php      # Аутентификация
│   │   ├── UserController.php      # Пользователи
│   │   ├── MissionController.php   # Миссии
│   │   ├── ArtifactController.php  # Артефакты
│   │   ├── ThemeController.php     # Темы
│   │   ├── AdminController.php     # Админка
│   │   └── StatsController.php     # Статистика
│   └── Middleware/
│       └── JWTMiddleware.php       # JWT аутентификация
├── Models/              # Eloquent модели
│   ├── User.php         # Пользователь
│   ├── Rank.php         # Ранг
│   ├── Mission.php      # Миссия
│   ├── Competence.php   # Компетенция
│   ├── Artifact.php     # Артефакт
│   ├── Theme.php        # Тема
│   ├── Log.php          # Лог
│   └── StoreItem.php    # Товар магазина
└── routes/
    └── api.php          # API маршруты
```

### API архитектура

#### RESTful принципы
- **GET** - Получение данных
- **POST** - Создание ресурсов
- **PUT** - Обновление ресурсов
- **DELETE** - Удаление ресурсов

#### Структура ответов
```json
{
  "success": true,
  "data": { ... },
  "message": "Операция выполнена успешно"
}
```

#### Обработка ошибок
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Неверные данные",
    "details": { ... }
  }
}
```

## 🗄️ База данных

### Схема данных

#### Основные таблицы
```sql
-- Пользователи
users (
  id, name, email, password, current_rank_id, 
  experience, mana, active_theme_id, created_at, updated_at
)

-- Ранги
ranks (
  id, name, min_experience, required_missions, 
  required_competences, created_at, updated_at
)

-- Миссии
missions (
  id, title, description, experience_reward, mana_reward,
  required_rank_id, category, branch, competence_rewards,
  artifact_id, requirements, steps, created_at, updated_at
)

-- Компетенции
competences (
  id, name, description, max_level, created_at, updated_at
)

-- Артефакты
artifacts (
  id, name, description, image, rarity, created_at, updated_at
)

-- Темы
themes (
  id, name, display_name, description, category,
  is_active, is_default, is_custom, user_categories,
  created_by, colors, gradients, effects, icons,
  created_at, updated_at
)

-- Логи
logs (
  id, user_id, event_type, description, data, created_at, updated_at
)

-- Товары магазина
store_items (
  id, name, description, price, category, image,
  is_active, created_at, updated_at
)
```

#### Связующие таблицы
```sql
-- Связь пользователей и миссий
user_missions (
  id, user_id, mission_id, status, started_at, 
  completed_at, evidence, created_at, updated_at
)

-- Связь пользователей и артефактов
user_artifacts (
  id, user_id, artifact_id, obtained_at, created_at, updated_at
)

-- Связь пользователей и компетенций
user_competences (
  id, user_id, competence_id, level, experience, created_at, updated_at
)

-- Связь миссий и компетенций
mission_competences (
  id, mission_id, competence_id, created_at, updated_at
)
```

### Связи между сущностями

#### One-to-Many
- User → Logs
- Rank → Users
- Mission → Artifact
- Theme → Users

#### Many-to-Many
- User ↔ Mission (через user_missions)
- User ↔ Artifact (через user_artifacts)
- User ↔ Competence (через user_competences)
- Mission ↔ Competence (через mission_competences)

## 🔐 Безопасность

### Аутентификация
- **JWT токены** для сессий
- **Bearer токены** в заголовках
- **Автоматическое обновление** токенов
- **Защищенные маршруты** с middleware

### Авторизация
- **Middleware проверки** JWT токенов
- **Валидация прав** доступа
- **Защита API endpoints**

### Валидация данных
- **Laravel валидация** на бэкенде
- **TypeScript типизация** на фронтенде
- **Санитизация** входных данных

## 🚀 Производительность

### Backend оптимизации
- **Eager loading** для связанных моделей
- **Индексы** в базе данных
- **Кэширование** запросов
- **Пагинация** для больших списков

### Frontend оптимизации
- **React.memo** для компонентов
- **useCallback** для функций
- **useMemo** для вычислений
- **Lazy loading** для страниц

### База данных
- **Индексы** на часто используемые поля
- **Foreign keys** для целостности
- **Оптимизированные запросы**

## 🔄 Интеграция

### API коммуникация
```
Frontend (React) ←→ HTTP/JSON ←→ Backend (Laravel) ←→ PostgreSQL
```

#### Протокол обмена
- **Content-Type**: application/json
- **Authorization**: Bearer {token}
- **CORS**: Настроен для фронтенда

#### Обработка ошибок
- **HTTP статус коды**
- **Структурированные ошибки**
- **Логирование** на бэкенде

## 📦 Развертывание

### Docker архитектура
```yaml
services:
  app:          # Laravel приложение
  db:           # PostgreSQL база данных
  nginx:        # Веб-сервер
  xray:         # Прокси (опционально)
```

### Конфигурация
- **Environment variables** для настроек
- **Docker Compose** для оркестрации
- **Nginx** для статических файлов
- **PostgreSQL** для данных

## 📈 Масштабирование

### Горизонтальное масштабирование
- **Load balancer** для фронтенда
- **API Gateway** для бэкенда
- **Database clustering** для БД

### Вертикальное масштабирование
- **Увеличение ресурсов** контейнеров
- **Оптимизация запросов** к БД
- **Кэширование** на всех уровнях

## 🔧 Мониторинг

### Логирование
- **Laravel logs** для бэкенда
- **Console logs** для фронтенда
- **Database logs** для БД

### Метрики
- **API response times**
- **Database query performance**
- **Memory usage**
- **Error rates**

## 🎯 Заключение

Архитектура Alabuga построена на современных принципах:
- ✅ **Модульность** и разделение ответственности
- ✅ **Масштабируемость** и производительность
- ✅ **Безопасность** на всех уровнях
- ✅ **Поддерживаемость** и расширяемость

Система готова к production использованию и дальнейшему развитию!
