import { 
  User, 
  Rank, 
  Mission, 
  Competence, 
  Artifact, 
  Log, 
  StoreItem, 
  Onboarding, 
  Rating,
  ApiResponse,
  PaginatedResponse,
  LoginForm,
  RegisterForm,
  MissionForm,
  UserStats,
  MissionStats,
  BranchStats
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      console.log('API Response status:', response.status);
      console.log('API Response ok:', response.ok);
      console.log('API Response headers:', response.headers);
      
      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка запроса');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Аутентификация
  async login(credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Пользователи
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me');
  }

  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Ранги
  async getRanks(): Promise<ApiResponse<Rank[]>> {
    return this.request('/ranks');
  }

  async getRank(rankId: number): Promise<ApiResponse<Rank>> {
    return this.request(`/ranks/${rankId}`);
  }

  async checkRankUp(userId: number): Promise<ApiResponse<{ canRankUp: boolean; nextRank?: Rank }>> {
    return this.request(`/ranks/check-rankup/${userId}`);
  }

  async promoteUser(userId: number): Promise<ApiResponse<User>> {
    return this.request(`/ranks/promote/${userId}`, {
      method: 'POST',
    });
  }

  // Миссии
  async getMissions(page = 1, limit = 10): Promise<ApiResponse<{ missions: Mission[]; pagination: any }>> {
    return this.request(`/missions?page=${page}&limit=${limit}`);
  }

  async getMission(missionId: number): Promise<ApiResponse<Mission>> {
    return this.request(`/missions/${missionId}`);
  }

  async startMission(missionId: number): Promise<ApiResponse<{ mission_id: number; status: string; started_at: string }>> {
    return this.request(`/missions/${missionId}/start`, {
      method: 'POST',
    });
  }

  async completeMission(missionId: number, evidence: string): Promise<ApiResponse<{ 
    mission_id: number; 
    status: string; 
    completed_at: string;
    rewards: { experience: number; mana: number; artifacts: Artifact[] };
  }>> {
    return this.request(`/missions/${missionId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ evidence }),
    });
  }

  async createMission(missionData: MissionForm): Promise<ApiResponse<Mission>> {
    return this.request('/missions', {
      method: 'POST',
      body: JSON.stringify(missionData),
    });
  }

  // Компетенции
  async getCompetences(): Promise<ApiResponse<Competence[]>> {
    return this.request('/competences');
  }

  async getUserCompetences(userId: number): Promise<ApiResponse<{ competence_id: number; level: number }[]>> {
    return this.request(`/competences/user/${userId}`);
  }

  // Артефакты
  async getArtifacts(): Promise<ApiResponse<Artifact[]>> {
    return this.request('/artifacts');
  }

  // Логи
  async getUserLogs(userId: number, page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Log>>> {
    return this.request(`/logs/user/${userId}?page=${page}&limit=${limit}`);
  }

  // Магазин
  async getStoreItems(): Promise<ApiResponse<StoreItem[]>> {
    return this.request('/store/items');
  }

  async purchaseItem(userId: number, itemId: number): Promise<ApiResponse<{ success: boolean; newMana: number }>> {
    return this.request('/store/purchase', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, item_id: itemId }),
    });
  }

  // Онбординг
  async getOnboardingSteps(): Promise<ApiResponse<Onboarding[]>> {
    return this.request('/onboarding');
  }

  async completeOnboardingStep(userId: number, stepId: number): Promise<ApiResponse<{ success: boolean }>> {
    return this.request('/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, step_id: stepId }),
    });
  }

  // Рейтинги
  async getRatings(period: string = 'month'): Promise<ApiResponse<Rating[]>> {
    return this.request(`/ratings?period=${period}`);
  }

  async getUserRating(userId: number, period: string = 'month'): Promise<ApiResponse<Rating>> {
    return this.request(`/ratings/user/${userId}?period=${period}`);
  }

  // Темы
  async getThemes(): Promise<ApiResponse<any[]>> {
    return this.request('/themes');
  }

  async activateTheme(themeId: string): Promise<ApiResponse<{ theme_id: string; activated_at: string }>> {
    return this.request(`/themes/${themeId}/activate`, {
      method: 'POST',
    });
  }

  // Админка
  async getAdminThemes(): Promise<ApiResponse<any[]>> {
    return this.request('/admin/themes');
  }

  async createTheme(themeData: any): Promise<ApiResponse<any>> {
    return this.request('/admin/themes', {
      method: 'POST',
      body: JSON.stringify(themeData),
    });
  }

  async updateTheme(themeId: string, themeData: any): Promise<ApiResponse<any>> {
    return this.request(`/admin/themes/${themeId}`, {
      method: 'PUT',
      body: JSON.stringify(themeData),
    });
  }

  async deleteTheme(themeId: string): Promise<ApiResponse<null>> {
    return this.request(`/admin/themes/${themeId}`, {
      method: 'DELETE',
    });
  }

  async activateAdminTheme(themeId: string): Promise<ApiResponse<{ theme_id: string; activated_at: string }>> {
    return this.request(`/admin/themes/${themeId}/activate`, {
      method: 'POST',
    });
  }

  // Статистика
  async getUserStats(): Promise<ApiResponse<UserStats>> {
    return this.request('/stats/user');
  }

  async getLeaderboard(period = 'week', limit = 10): Promise<ApiResponse<{ leaderboard: any[]; user_position: number; period: string }>> {
    return this.request(`/stats/leaderboard?period=${period}&limit=${limit}`);
  }
}

export const apiService = new ApiService();
export default apiService;
