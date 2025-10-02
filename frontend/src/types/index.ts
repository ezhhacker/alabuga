// Основные сущности системы геймификации

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  current_rank_id: number;
  experience: number;
  mana: number;
  created_at: string;
}

export interface Rank {
  id: number;
  name: string;
  min_experience: number;
  required_missions: number[];
  required_competences: number[];
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  experience_reward: number;
  mana_reward: number;
  required_rank_id: number;
  category: string;
  branch: string;
  competence_rewards: number[];
  artifact_id?: number;
}

export interface Competence {
  id: number;
  name: string;
  description: string;
  max_level: number;
}

export interface UserCompetence {
  user_id: number;
  competence_id: number;
  level: number;
}

export interface Artifact {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserArtifact {
  user_id: number;
  artifact_id: number;
  obtained_at: string;
}

export interface Log {
  id: number;
  user_id: number;
  event_type: string;
  description: string;
  created_at: string;
}

export interface StoreItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface UserPurchase {
  user_id: number;
  store_item_id: number;
  purchased_at: string;
}

export interface Onboarding {
  id: number;
  title: string;
  content: string;
  order: number;
  image: string;
}

export interface UserOnboarding {
  user_id: number;
  onboarding_id: number;
  completed_at: string;
}

export interface Rating {
  id: number;
  user_id: number;
  period: string;
  experience: number;
}

// API Response типы
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Состояние приложения
export interface AppState {
  user: User | null;
  currentRank: Rank | null;
  missions: Mission[];
  competences: Competence[];
  artifacts: Artifact[];
  storeItems: StoreItem[];
  logs: Log[];
  userStats: UserStats | null;
  userLogs: Log[];
  userArtifacts: Artifact[];
  userCompetences: Competence[];
  isLoading: boolean;
  error: string | null;
}

// Типы для форм
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface MissionForm {
  title: string;
  description: string;
  experience_reward: number;
  mana_reward: number;
  required_rank_id: number;
  category: string;
  branch: string;
  competence_rewards: number[];
  artifact_id?: number;
}

// Типы для событий
export interface GameEvent {
  type: 'mission_completed' | 'rank_up' | 'artifact_obtained' | 'competence_increased' | 'purchase_made';
  data: any;
  timestamp: string;
}

// Типы для статистики
export interface UserStats {
  total_experience: number;
  total_mana: number;
  missions_completed: number;
  artifacts_obtained: number;
  competences_maxed: number;
  current_rank_progress: number;
}

export interface MissionStats {
  total_missions: number;
  completed_missions: number;
  available_missions: number;
  completion_rate: number;
}

export interface BranchStats {
  branch_name: string;
  missions_count: number;
  completed_count: number;
  experience_earned: number;
}

// Сущность темы для админки
export interface ThemeEntity {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'space' | 'fantasy' | 'cyber' | 'nature' | 'corporate' | 'custom';
  isActive: boolean;
  isDefault: boolean;
  isCustom: boolean;
  userCategories: string[];
  createdBy: number; // ID пользователя, создавшего тему
  createdAt: string;
  updatedAt: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    main: string;
    card: string;
    button: string;
    header: string;
  };
  effects: {
    blur: string;
    shadow: string;
    glow: string;
  };
  icons: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Форма для создания/редактирования темы
export interface ThemeForm {
  name: string;
  displayName: string;
  description: string;
  category: string;
  userCategories: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    main: string;
    card: string;
    button: string;
    header: string;
  };
  effects: {
    blur: string;
    shadow: string;
    glow: string;
  };
  icons: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Роль пользователя
export interface UserRole {
  id: number;
  name: string;
  permissions: string[];
}

// HR пользователь
export interface HRUser {
  id: number;
  name: string;
  email: string;
  role: 'hr' | 'admin' | 'super_admin';
  permissions: string[];
  created_at: string;
  last_login: string;
}
