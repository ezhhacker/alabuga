import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';
import { 
  setCurrentRank, 
  setLogs, 
  addLog, 
  setStats, 
  setLoading, 
  setError 
} from '../slices/userSlice';
import { updateUser } from '../slices/authSlice';
// Removed mock data imports

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loadUserData = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>(
  'user/loadUserData',
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      await delay(500);
      
      // Реальный API вызов для данных пользователя
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных пользователя');
      }

      const data = await response.json();
      const user = data.data;
      const rank = user.rank;
      const logs = user.logs || [];
      const stats = user.stats || {};
      
      if (rank) {
        dispatch(setCurrentRank(rank));
      }
      
      dispatch(setLogs(logs));
      dispatch(setStats(stats));
      
    } catch (error) {
      dispatch(setError('Ошибка загрузки данных пользователя'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateUserExperience = createAsyncThunk<
  void,
  { userId: number; amount: number },
  { dispatch: AppDispatch }
>(
  'user/updateUserExperience',
  async ({ userId, amount }, { dispatch }) => {
    try {
      await delay(300);
      
      // Обновляем опыт пользователя через API
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ experience: amount }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления опыта');
      }

      const data = await response.json();
      const newExperience = data.data.experience;
      
      dispatch(updateUser({ experience: newExperience }));
      
      // Добавляем лог
      const log = {
        id: Date.now(),
        user_id: userId,
        event_type: 'experience_gained',
        description: `Получено ${amount} опыта`,
        created_at: new Date().toISOString()
      };
      
      dispatch(addLog(log));
      
    } catch (error) {
      dispatch(setError('Ошибка обновления опыта'));
    }
  }
);

export const updateUserMana = createAsyncThunk<
  void,
  { userId: number; amount: number },
  { dispatch: AppDispatch }
>(
  'user/updateUserMana',
  async ({ userId, amount }, { dispatch }) => {
    try {
      await delay(300);
      
      // Обновляем ману через API
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ mana: amount }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления маны');
      }

      const data = await response.json();
      const newMana = data.data.mana;
      
      dispatch(updateUser({ mana: newMana }));
      
      const log = {
        id: Date.now(),
        user_id: userId,
        event_type: amount > 0 ? 'mana_gained' : 'mana_spent',
        description: amount > 0 ? `Получено ${amount} маны` : `Потрачено ${Math.abs(amount)} маны`,
        created_at: new Date().toISOString()
      };
      
      dispatch(addLog(log));
      
    } catch (error) {
      dispatch(setError('Ошибка обновления маны'));
    }
  }
);

export const checkRankUp = createAsyncThunk<
  { canRankUp: boolean; nextRank?: any },
  number,
  { dispatch: AppDispatch }
>(
  'user/checkRankUp',
  async (userId, { dispatch }) => {
    try {
      await delay(300);
      
      // Получаем данные пользователя через API
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных пользователя');
      }

      const data = await response.json();
      const user = data.data;
      const currentRank = user.rank;
      const nextRank = user.next_rank;
      
      if (nextRank && user.experience >= nextRank.min_experience) {
        return { canRankUp: true, nextRank };
      }
      
      return { canRankUp: false };
      
    } catch (error) {
      dispatch(setError('Ошибка проверки повышения ранга'));
      return { canRankUp: false };
    }
  }
);

export const promoteUser = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>(
  'user/promoteUser',
  async (userId, { dispatch }) => {
    try {
      await delay(500);
      
      // Получаем данные пользователя через API
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных пользователя');
      }

      const data = await response.json();
      const user = data.data;
      const nextRank = user.next_rank;
      
      if (nextRank) {
        dispatch(updateUser({ current_rank_id: nextRank.id }));
        dispatch(setCurrentRank(nextRank));
        
        const log = {
          id: Date.now(),
          user_id: userId,
          event_type: 'rank_up',
          description: `Повышение до ранга "${nextRank.name}"`,
          created_at: new Date().toISOString()
        };
        
        dispatch(addLog(log));
      }
      
    } catch (error) {
      dispatch(setError('Ошибка повышения ранга'));
    }
  }
);
