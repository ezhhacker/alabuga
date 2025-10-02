import { User, Rank, Mission, Competence, Artifact, StoreItem, Log, UserStats } from '../types';

export const mockRanks: Rank[] = [
  {
    id: 1,
    name: 'Новичок',
    min_experience: 0,
    required_missions: [],
    required_competences: []
  },
  {
    id: 2,
    name: 'Исследователь',
    min_experience: 100,
    required_missions: [1, 2],
    required_competences: [1]
  },
  {
    id: 3,
    name: 'Мастер',
    min_experience: 500,
    required_missions: [1, 2, 3, 4],
    required_competences: [1, 2]
  },
  {
    id: 4,
    name: 'Легенда',
    min_experience: 1000,
    required_missions: [1, 2, 3, 4, 5, 6],
    required_competences: [1, 2, 3]
  }
];

export const mockCompetences: Competence[] = [
  {
    id: 1,
    name: 'Программирование',
    description: 'Навыки разработки программного обеспечения',
    max_level: 10
  },
  {
    id: 2,
    name: 'Дизайн',
    description: 'Создание пользовательских интерфейсов',
    max_level: 10
  },
  {
    id: 3,
    name: 'Аналитика',
    description: 'Анализ данных и метрик',
    max_level: 10
  },
  {
    id: 4,
    name: 'Коммуникация',
    description: 'Навыки общения и презентации',
    max_level: 10
  }
];

export const mockArtifacts: Artifact[] = [
  {
    id: 1,
    name: 'Код-меч',
    description: 'Легендарный меч, выкованный из чистого кода',
    image: '/images/artifacts/code-sword.png',
    rarity: 'legendary'
  },
  {
    id: 2,
    name: 'Щит отладки',
    description: 'Защищает от всех багов',
    image: '/images/artifacts/debug-shield.png',
    rarity: 'epic'
  },
  {
    id: 3,
    name: 'Кольцо компиляции',
    description: 'Ускоряет процесс разработки',
    image: '/images/artifacts/compile-ring.png',
    rarity: 'rare'
  },
  {
    id: 4,
    name: 'Амулет тестирования',
    description: 'Помогает находить ошибки',
    image: '/images/artifacts/test-amulet.png',
    rarity: 'common'
  },
  {
    id: 5,
    name: 'Мантия архитектора',
    description: 'Повышает качество архитектуры',
    image: '/images/artifacts/architect-mantle.png',
    rarity: 'epic'
  }
];

export const mockMissions: Mission[] = [
  {
    id: 1,
    title: 'Первые шаги',
    description: 'Создайте свой первый проект и изучите основы разработки',
    experience_reward: 50,
    mana_reward: 25,
    required_rank_id: 1,
    category: 'Обучение',
    branch: 'Основы',
    competence_rewards: [1],
    artifact_id: 4
  },
  {
    id: 2,
    title: 'Изучение React',
    description: 'Освойте основы React и создайте компонент',
    experience_reward: 100,
    mana_reward: 50,
    required_rank_id: 2,
    category: 'Frontend',
    branch: 'React',
    competence_rewards: [1, 2],
    artifact_id: 3
  },
  {
    id: 3,
    title: 'Backend разработка',
    description: 'Создайте API сервер на Node.js',
    experience_reward: 150,
    mana_reward: 75,
    required_rank_id: 2,
    category: 'Backend',
    branch: 'Node.js',
    competence_rewards: [1, 3],
    artifact_id: 2
  },
  {
    id: 4,
    title: 'База данных',
    description: 'Настройте и оптимизируйте базу данных',
    experience_reward: 200,
    mana_reward: 100,
    required_rank_id: 3,
    category: 'Database',
    branch: 'SQL',
    competence_rewards: [1, 3],
    artifact_id: 5
  },
  {
    id: 5,
    title: 'DevOps практики',
    description: 'Настройте CI/CD и деплой приложения',
    experience_reward: 300,
    mana_reward: 150,
    required_rank_id: 3,
    category: 'DevOps',
    branch: 'Deployment',
    competence_rewards: [1, 3, 4],
    artifact_id: 1
  },
  {
    id: 6,
    title: 'Архитектура системы',
    description: 'Спроектируйте масштабируемую архитектуру',
    experience_reward: 500,
    mana_reward: 250,
    required_rank_id: 4,
    category: 'Architecture',
    branch: 'System Design',
    competence_rewards: [1, 3, 4],
    artifact_id: 1
  }
];

export const mockStoreItems: StoreItem[] = [
  {
    id: 1,
    name: 'Бустер опыта',
    description: 'Увеличивает получаемый опыт на 50% на 1 час',
    price: 100,
    category: 'Бустеры',
    image: '/images/store/exp-booster.png'
  },
  {
    id: 2,
    name: 'Мана-эликсир',
    description: 'Восстанавливает 200 маны',
    price: 50,
    category: 'Зелья',
    image: '/images/store/mana-potion.png'
  },
  {
    id: 3,
    name: 'Свиток удачи',
    description: 'Увеличивает шанс получения редких артефактов',
    price: 200,
    category: 'Магия',
    image: '/images/store/luck-scroll.png'
  },
  {
    id: 4,
    name: 'Книга знаний',
    description: 'Мгновенно повышает уровень компетенции',
    price: 300,
    category: 'Обучение',
    image: '/images/store/knowledge-book.png'
  },
  {
    id: 5,
    name: 'Плащ невидимости',
    description: 'Скрывает ваш профиль от других игроков',
    price: 150,
    category: 'Утилиты',
    image: '/images/store/invisibility-cloak.png'
  }
];

export const mockUser: User = {
  id: 1,
  name: 'Иван Разработчик',
  email: 'ivan@example.com',
  role: 'user',
  current_rank_id: 2,
  experience: 250,
  mana: 500,
  created_at: '2024-01-15T10:00:00Z'
};

export const mockLogs: Log[] = [
  {
    id: 1,
    user_id: 1,
    event_type: 'mission_completed',
    description: 'Завершена миссия "Первые шаги"',
    created_at: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    user_id: 1,
    event_type: 'rank_up',
    description: 'Повышение до ранга "Исследователь"',
    created_at: '2024-01-19T16:45:00Z'
  },
  {
    id: 3,
    user_id: 1,
    event_type: 'artifact_obtained',
    description: 'Получен артефакт "Амулет тестирования"',
    created_at: '2024-01-18T12:20:00Z'
  },
  {
    id: 4,
    user_id: 1,
    event_type: 'competence_increased',
    description: 'Повышен уровень компетенции "Программирование"',
    created_at: '2024-01-17T09:15:00Z'
  }
];

export const mockUserStats: UserStats = {
  total_experience: 250,
  total_mana: 500,
  missions_completed: 3,
  artifacts_obtained: 2,
  competences_maxed: 0,
  current_rank_progress: 25.0
};

// Функции для работы с заглушками
export const getMockUser = (): User => mockUser;

export const getMockRank = (rankId: number): Rank | undefined => 
  mockRanks.find(rank => rank.id === rankId);

export const getMockMissions = (): Mission[] => mockMissions;

export const getMockAvailableMissions = (userId: number): Mission[] => {
  // Фильтруем миссии по рангу пользователя
  const user = getMockUser();
  const userRank = getMockRank(user.current_rank_id);
  
  if (!userRank) return [];
  
  return mockMissions.filter(mission => 
    mission.required_rank_id <= userRank.id
  );
};

export const getMockUserArtifacts = (userId: number): Artifact[] => {
  // Возвращаем артефакты, которые есть у пользователя
  return [mockArtifacts[3], mockArtifacts[2]]; // Амулет тестирования и Кольцо компиляции
};

export const getMockUserLogs = (userId: number): Log[] => mockLogs;

export const getMockUserStats = (userId: number): UserStats => mockUserStats;
