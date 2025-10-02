import React, { useState, useEffect } from 'react';
import { Mission } from '../types';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

const MissionList: React.FC = () => {
  const { user, startMission, completeMission } = useApp();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('available');
  const [evidence, setEvidence] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadMissions();
  }, [user, filter]);

  const loadMissions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      let response;
      
      response = await apiService.getMissions();
      setMissions(response.data.missions);
    } catch (error) {
      console.error('Ошибка загрузки миссий:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMission = async (missionId: number) => {
    await startMission(missionId);
    loadMissions();
  };

  const handleCompleteMission = async (missionId: number) => {
    const missionEvidence = evidence[missionId] || '';
    if (!missionEvidence.trim()) {
      alert('Пожалуйста, введите доказательства выполнения миссии');
      return;
    }
    await completeMission(missionId, missionEvidence);
    setEvidence(prev => ({ ...prev, [missionId]: '' }));
    loadMissions();
  };

  if (loading) {
    return <div>Загрузка миссий...</div>;
  }

  return (
    <div className="mission-list">
      <div className="mission-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все миссии
        </button>
        <button 
          className={filter === 'available' ? 'active' : ''}
          onClick={() => setFilter('available')}
        >
          Доступные
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Завершенные
        </button>
      </div>

      <div className="missions-grid">
        {missions.map((mission) => (
          <div key={mission.id} className="mission-card">
            <div className="mission-header">
              <h3>{mission.title}</h3>
              <span className="mission-category">{mission.category}</span>
            </div>
            
            <div className="mission-description">
              <p>{mission.description}</p>
            </div>
            
            <div className="mission-rewards">
              <div className="reward-item">
                <span className="reward-label">Опыт:</span>
                <span className="reward-value">+{mission.experience_reward}</span>
              </div>
              <div className="reward-item">
                <span className="reward-label">Мана:</span>
                <span className="reward-value">+{mission.mana_reward}</span>
              </div>
            </div>
            
            <div className="mission-branch">
              <span className="branch-label">Ветка:</span>
              <span className="branch-name">{mission.branch}</span>
            </div>
            
            <div className="mission-evidence">
              <label htmlFor={`evidence-${mission.id}`}>Доказательства выполнения:</label>
              <textarea
                id={`evidence-${mission.id}`}
                value={evidence[mission.id] || ''}
                onChange={(e) => setEvidence(prev => ({ ...prev, [mission.id]: e.target.value }))}
                placeholder="Опишите доказательства выполнения миссии..."
                rows={3}
              />
            </div>
            
            <div className="mission-actions">
              <button 
                className="btn-start"
                onClick={() => handleStartMission(mission.id)}
              >
                Начать
              </button>
              <button 
                className="btn-complete"
                onClick={() => handleCompleteMission(mission.id)}
              >
                Завершить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionList;
