import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { 
  User, 
  Rank, 
  Mission, 
  Competence, 
  Artifact, 
  Log, 
  StoreItem, 
  AppState,
  GameEvent,
  UserStats
} from '../types';
import { apiService } from '../services/api';

interface AppContextType extends AppState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  startMission: (missionId: number) => Promise<void>;
  completeMission: (missionId: number, evidence: string) => Promise<void>;
  purchaseItem: (itemId: number) => Promise<void>;
  refreshUserData: () => Promise<void>;
  addGameEvent: (event: GameEvent) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENT_RANK'; payload: Rank | null }
  | { type: 'SET_MISSIONS'; payload: Mission[] }
  | { type: 'SET_COMPETENCES'; payload: Competence[] }
  | { type: 'SET_ARTIFACTS'; payload: Artifact[] }
  | { type: 'SET_STORE_ITEMS'; payload: StoreItem[] }
  | { type: 'SET_LOGS'; payload: Log[] }
  | { type: 'SET_USER_STATS'; payload: UserStats | null }
  | { type: 'SET_USER_LOGS'; payload: Log[] }
  | { type: 'SET_USER_ARTIFACTS'; payload: Artifact[] }
  | { type: 'SET_USER_COMPETENCES'; payload: Competence[] }
  | { type: 'UPDATE_USER_EXPERIENCE'; payload: number }
  | { type: 'UPDATE_USER_MANA'; payload: number }
  | { type: 'ADD_LOG'; payload: Log }
  | { type: 'ADD_ARTIFACT'; payload: Artifact }
  | { type: 'CLEAR_STATE' };

const initialState: AppState = {
  user: null,
  currentRank: null,
  missions: [],
  competences: [],
  artifacts: [],
  storeItems: [],
  logs: [],
  userStats: null,
  userLogs: [],
  userArtifacts: [],
  userCompetences: [],
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_RANK':
      return { ...state, currentRank: action.payload };
    case 'SET_MISSIONS':
      return { ...state, missions: action.payload };
    case 'SET_COMPETENCES':
      return { ...state, competences: action.payload };
    case 'SET_ARTIFACTS':
      return { ...state, artifacts: action.payload };
    case 'SET_STORE_ITEMS':
      return { ...state, storeItems: action.payload };
    case 'SET_LOGS':
      return { ...state, logs: action.payload };
    case 'SET_USER_STATS':
      return { ...state, userStats: action.payload };
    case 'SET_USER_LOGS':
      return { ...state, userLogs: action.payload };
    case 'SET_USER_ARTIFACTS':
      return { ...state, userArtifacts: action.payload };
    case 'SET_USER_COMPETENCES':
      return { ...state, userCompetences: action.payload };
    case 'UPDATE_USER_EXPERIENCE':
      return {
        ...state,
        user: state.user ? { ...state.user, experience: action.payload } : null
      };
    case 'UPDATE_USER_MANA':
      return {
        ...state,
        user: state.user ? { ...state.user, mana: action.payload } : null
      };
    case 'ADD_LOG':
      return { ...state, logs: [action.payload, ...state.logs] };
    case 'ADD_ARTIFACT':
      return { ...state, artifacts: [...state.artifacts, action.payload] };
    case 'CLEAR_STATE':
      return initialState;
    default:
      return state;
  }
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadInitialData = useCallback(async () => {
    try {
      const [missionsResponse, competencesResponse, artifactsResponse, storeResponse] = await Promise.all([
        apiService.getMissions(),
        apiService.getCompetences(),
        apiService.getArtifacts(),
        apiService.getStoreItems()
      ]);

      if (missionsResponse.success) {
        dispatch({ type: 'SET_MISSIONS', payload: missionsResponse.data.missions });
      }
      if (competencesResponse.success) {
        dispatch({ type: 'SET_COMPETENCES', payload: competencesResponse.data });
      }
      if (artifactsResponse.success) {
        dispatch({ type: 'SET_ARTIFACTS', payload: artifactsResponse.data });
      }
      if (storeResponse.success) {
        dispatch({ type: 'SET_STORE_ITEMS', payload: storeResponse.data });
      }
    } catch (error) {
      console.error('Ошибка загрузки начальных данных:', error);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    try {
      console.log('AppContext: refreshUserData called');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const userResponse = await apiService.getCurrentUser();
      console.log('AppContext: getCurrentUser response:', userResponse.success);
      if (userResponse.success) {
        console.log('AppContext: Setting user data');
        dispatch({ type: 'SET_USER', payload: userResponse.data });
        
        if (userResponse.data.current_rank_id) {
          const rankResponse = await apiService.getRank(userResponse.data.current_rank_id);
          if (rankResponse.success) {
            dispatch({ type: 'SET_CURRENT_RANK', payload: rankResponse.data });
          }
        }
        
        // Загружаем начальные данные после успешной авторизации
        console.log('AppContext: Loading initial data');
        await loadInitialData();
      } else {
        console.log('AppContext: getCurrentUser failed, clearing token');
        localStorage.removeItem('auth_token');
        dispatch({ type: 'CLEAR_STATE' });
      }
    } catch (error) {
      console.error('AppContext: Ошибка загрузки данных пользователя:', error);
      // Если токен недействителен, очищаем localStorage
      localStorage.removeItem('auth_token');
      dispatch({ type: 'CLEAR_STATE' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [loadInitialData]);

  // Проверка токена при загрузке
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    console.log('AppContext: Checking token on load:', !!token);
    if (token) {
      console.log('AppContext: Token found, refreshing user data');
      refreshUserData();
    } else {
      console.log('AppContext: No token found');
    }
  }, []); // Убираем refreshUserData из зависимостей

  const login = async (email: string, password: string) => {
    try {
      console.log('AppContext: Login started');
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await apiService.login({ email, password });
      console.log('AppContext: Login response:', response.success);
      
      if (response.success) {
        console.log('AppContext: Saving token to localStorage');
        localStorage.setItem('auth_token', response.data.token);
        console.log('AppContext: Setting user data');
        dispatch({ type: 'SET_USER', payload: response.data.user });
        console.log('AppContext: Loading initial data');
        await loadInitialData();
      }
    } catch (error) {
      console.error('AppContext: Login error:', error);
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Ошибка входа' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await apiService.register({ name, email, password });
      
      if (response.success) {
        localStorage.setItem('auth_token', response.data.token);
        dispatch({ type: 'SET_USER', payload: response.data.user });
        await loadInitialData();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Ошибка регистрации' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'CLEAR_STATE' });
  };


  const startMission = async (missionId: number) => {
    try {
      const response = await apiService.startMission(missionId);
      if (response.success) {
        // Обновляем данные пользователя
        await refreshUserData();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Ошибка начала миссии' });
    }
  };

  const completeMission = async (missionId: number, evidence: string) => {
    try {
      const response = await apiService.completeMission(missionId, evidence);
      if (response.success) {
        // Обновляем опыт и ману пользователя
        if (state.user) {
          dispatch({ type: 'UPDATE_USER_EXPERIENCE', payload: state.user.experience + response.data.rewards.experience });
          dispatch({ type: 'UPDATE_USER_MANA', payload: state.user.mana + response.data.rewards.mana });
        }
        
        // Добавляем артефакты если получены
        if (response.data.rewards.artifacts && response.data.rewards.artifacts.length > 0) {
          response.data.rewards.artifacts.forEach((artifact: Artifact) => {
            dispatch({ type: 'ADD_ARTIFACT', payload: artifact });
          });
        }
        
        // Обновляем данные пользователя
        await refreshUserData();
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Ошибка завершения миссии' });
    }
  };

  const purchaseItem = async (itemId: number) => {
    if (!state.user) return;
    
    try {
      const response = await apiService.purchaseItem(state.user.id, itemId);
      if (response.success) {
        dispatch({ type: 'UPDATE_USER_MANA', payload: response.data.newMana });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Ошибка покупки' });
    }
  };

  const addGameEvent = (event: GameEvent) => {
    const log: Log = {
      id: Date.now(),
      user_id: state.user?.id || 0,
      event_type: event.type,
      description: event.data.description || '',
      created_at: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_LOG', payload: log });
  };

  const contextValue: AppContextType = {
    ...state,
    login,
    register,
    logout,
    startMission,
    completeMission,
    purchaseItem,
    refreshUserData,
    addGameEvent,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp должен использоваться внутри AppProvider');
  }
  return context;
}

export const useAppContext = useApp;
