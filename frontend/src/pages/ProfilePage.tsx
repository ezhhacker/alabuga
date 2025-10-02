import React from 'react';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { user, currentRank, userStats, userLogs } = useAppContext();

  const progressPercentage = currentRank && user ? 
    ((user.experience / currentRank.min_experience) * 100) : 0;

  return (
    <div>
      <h2>Профиль пользователя</h2>
      
      <div>
        <h3>{user?.name || 'Пользователь'}</h3>
        <p>Email: {user?.email || ''}</p>
        <p>Опыт: {user?.experience || 0}</p>
        <p>Мана: {user?.mana || 0}</p>
        <p>Ранг: {currentRank?.name || 'Новичок'}</p>
        
        {currentRank && (
          <div>
            <p>Прогресс до следующего ранга: {progressPercentage.toFixed(1)}%</p>
            <div style={{ width: '200px', height: '10px', backgroundColor: '#eee', margin: '5px 0' }}>
              <div 
                style={{ 
                  width: `${Math.min(progressPercentage, 100)}%`, 
                  height: '100%', 
                  backgroundColor: '#4CAF50' 
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3>Статистика</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div>
            <h4>Завершено миссий</h4>
            <p>{userStats?.missions_completed || 0}</p>
          </div>
          <div>
            <h4>Получено артефактов</h4>
            <p>{userStats?.artifacts_obtained || 0}</p>
          </div>
          <div>
            <h4>Максимальные компетенции</h4>
            <p>{userStats?.competences_maxed || 0}</p>
          </div>
          <div>
            <h4>Прогресс ранга</h4>
            <p>{(userStats?.current_rank_progress || 0).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div>
        <h3>Последние события</h3>
        <div>
          {(userLogs || []).slice(0, 5).map((log: any) => (
            <div key={log.id} style={{ border: '1px solid #ccc', margin: '5px 0', padding: '10px' }}>
              <div>{new Date(log.created_at).toLocaleString()}</div>
              <div>{log.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
