import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../index';
import { 
  setMissions, 
  setAvailableMissions, 
  setCompletedMissions,
  setCurrentMission,
  startMission,
  completeMission,
  setLoading, 
  setError 
} from '../slices/missionsSlice';
import { updateUserExperience, updateUserMana } from './userThunks';
import { addUserArtifact } from '../slices/artifactsSlice';
// Removed mock data imports

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loadMissions = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>(
  'missions/loadMissions',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      await delay(500);
      
      // Реальный API вызов
      const response = await fetch('/api/missions');
      if (!response.ok) {
        throw new Error('Ошибка загрузки миссий');
      }
      
      const data = await response.json();
      const missions = data.data.missions;
      dispatch(setMissions(missions));
      
    } catch (error) {
      dispatch(setError('Ошибка загрузки миссий'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loadAvailableMissions = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>(
  'missions/loadAvailableMissions',
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      await delay(500);
      
      // Реальный API вызов для доступных миссий
      const response = await fetch('/api/missions?status=available');
      if (!response.ok) {
        throw new Error('Ошибка загрузки доступных миссий');
      }
      
      const data = await response.json();
      const availableMissions = data.data.missions;
      dispatch(setAvailableMissions(availableMissions));
      
    } catch (error) {
      dispatch(setError('Ошибка загрузки доступных миссий'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const startMissionAction = createAsyncThunk<
  void,
  { userId: number; missionId: number },
  { dispatch: AppDispatch }
>(
  'missions/startMissionAction',
  async ({ userId, missionId }, { dispatch }) => {
    try {
      await delay(300);
      
      dispatch(startMission(missionId));
      
      // Логируем начало миссии
      const log = {
        id: Date.now(),
        user_id: userId,
        event_type: 'mission_started',
        description: `Начата миссия #${missionId}`,
        created_at: new Date().toISOString()
      };
      
      // Здесь можно добавить логирование
      console.log('Mission started:', log);
      
    } catch (error) {
      dispatch(setError('Ошибка начала миссии'));
    }
  }
);

export const completeMissionAction = createAsyncThunk<
  void,
  { userId: number; missionId: number },
  { dispatch: AppDispatch }
>(
  'missions/completeMissionAction',
  async ({ userId, missionId }, { dispatch }) => {
    try {
      await delay(500);
      
      // Реальный API вызов для начала миссии
      const response = await fetch(`/api/missions/${missionId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка начала миссии');
      }

      const data = await response.json();
      const mission = data.data;
      
      if (!mission) {
        throw new Error('Миссия не найдена');
      }
      
      // Завершаем миссию
      dispatch(completeMission(missionId));
      
      // Начисляем награды
      dispatch(updateUserExperience({ userId, amount: mission.experience_reward }));
      dispatch(updateUserMana({ userId, amount: mission.mana_reward }));
      
      // Если есть артефакт, добавляем его
      if (mission.artifact) {
        dispatch(addUserArtifact(mission.artifact));
      }
      
      // Логируем завершение миссии
      const log = {
        id: Date.now(),
        user_id: userId,
        event_type: 'mission_completed',
        description: `Завершена миссия "${mission.title}"`,
        created_at: new Date().toISOString()
      };
      
      console.log('Mission completed:', log);
      
    } catch (error) {
      dispatch(setError('Ошибка завершения миссии'));
    }
  }
);

export const loadCompletedMissions = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>(
  'missions/loadCompletedMissions',
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      await delay(500);
      
      // Реальный API вызов для завершенных миссий
      const response = await fetch('/api/missions?status=completed');
      if (!response.ok) {
        throw new Error('Ошибка загрузки завершенных миссий');
      }
      
      const data = await response.json();
      const completedMissions = data.data.missions;
      dispatch(setCompletedMissions(completedMissions));
      
    } catch (error) {
      dispatch(setError('Ошибка загрузки завершенных миссий'));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
