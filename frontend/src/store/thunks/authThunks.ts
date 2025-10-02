import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../index';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { clearUserData } from '../slices/userSlice';
import { clearMissions } from '../slices/missionsSlice';
import { clearStore } from '../slices/storeSlice';
import { clearArtifacts } from '../slices/artifactsSlice';
// Removed mock data imports

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Имитация задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = createAsyncThunk<
  { user: any; token: string },
  LoginCredentials,
  { dispatch: AppDispatch }
>(
  'auth/loginUser',
  async (credentials, { dispatch }) => {
    dispatch(loginStart());
    
    // Имитация задержки API
    await delay(1000);
    
    // Реальный API вызов
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = 'Неверный email или пароль';
      dispatch(loginFailure(error));
      throw new Error(error);
    }

    const data = await response.json();
    const { user, token } = data.data;
    
    dispatch(loginSuccess({ user, token }));
    return { user, token };
  }
);

export const registerUser = createAsyncThunk<
  { user: any; token: string },
  RegisterData,
  { dispatch: AppDispatch }
>(
  'auth/registerUser',
  async (userData, { dispatch }) => {
    dispatch(loginStart());
    
    await delay(1000);
    
    // Создаем нового пользователя
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: 'user',
      current_rank_id: 1,
      experience: 0,
      mana: 100,
      created_at: new Date().toISOString()
    };
    
    const token = 'mock_jwt_token_' + Date.now();
    
    dispatch(loginSuccess({ user: newUser, token }));
    return { user: newUser, token };
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    dispatch(logout());
    dispatch(clearUserData());
    dispatch(clearMissions());
    dispatch(clearStore());
    dispatch(clearArtifacts());
  }
);

export const checkAuth = createAsyncThunk<
  { user: any; token: string },
  void,
  { dispatch: AppDispatch; state: RootState }
>(
  'auth/checkAuth',
  async (_, { dispatch, getState }) => {
    const token = getState().auth.token;
    
    if (token) {
      // Проверяем токен (в реальном приложении здесь был бы API вызов)
      await delay(500);
      
      // Реальный API вызов для регистрации
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Ошибка регистрации');
      }

      const data = await response.json();
      const { user, token } = data.data;
      
      dispatch(loginSuccess({ user, token }));
      return { user, token };
    } else {
      throw new Error('No token found');
    }
  }
);
