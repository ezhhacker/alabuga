import React from 'react';
import { UserStats as UserStatsType } from '../types';
import './UserStats.css';

interface UserStatsProps {
  stats: UserStatsType;
  className?: string;
}

const UserStats: React.FC<UserStatsProps> = ({ stats, className = '' }) => {
  return (
    <div className={`user-stats ${className}`}>
      <div className="stats-header">
        <h3>📊 Статистика</h3>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total_experience}</div>
            <div className="stat-label">Общий опыт</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">💫</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total_mana}</div>
            <div className="stat-label">Мана</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{stats.missions_completed}</div>
            <div className="stat-label">Миссии</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{stats.artifacts_obtained}</div>
            <div className="stat-label">Артефакты</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{stats.competences_maxed}</div>
            <div className="stat-label">Макс. навыки</div>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(stats.current_rank_progress)}%</div>
            <div className="stat-label">Прогресс ранга</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
