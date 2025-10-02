import React from 'react';
import { useAppSelector } from '../store/hooks';

const UserProfile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const currentRank = useAppSelector((state) => (state.user as any).currentRank);

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }

  const progressPercentage = currentRank ? 
    ((user.experience / currentRank.min_experience) * 100) : 0;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>{user.name}</h2>
        <p className="email">{user.email}</p>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-label">Опыт:</span>
          <span className="stat-value">{user.experience}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Мана:</span>
          <span className="stat-value">{user.mana}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Ранг:</span>
          <span className="stat-value">{currentRank?.name || 'Новичок'}</span>
        </div>
      </div>

      {currentRank && (
        <div className="rank-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <p className="progress-text">
            {user.experience} / {currentRank.min_experience} опыта
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
