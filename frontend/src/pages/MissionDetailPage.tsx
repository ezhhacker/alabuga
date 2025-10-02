import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './MissionDetailPage.css';

const MissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const missionId = parseInt(id || '0');
  
  const { missions, currentRank, userArtifacts, userCompetences } = useAppContext();
  const mission = missions?.find(m => m.id === missionId);

  if (!mission) {
    return (
      <div>
        <h2>Миссия не найдена</h2>
        <Link to="/missions">← Вернуться к списку миссий</Link>
      </div>
    );
  }

  const requiredRank = mission.required_rank_id;
  const artifact = mission.artifact_id;
  const competences = mission.competence_rewards || [];

  const handleStartMission = () => {
    alert(`Миссия "${mission.title}" начата!`);
  };

  const handleCompleteMission = () => {
    alert(`Миссия "${mission.title}" завершена! Получено: ${mission.experience_reward} опыта, ${mission.mana_reward} маны`);
  };

  return (
    <div className="mission-detail-page">
      <Link to="/missions" className="back-button">
        ← Вернуться к списку миссий
      </Link>

      <div className="mission-detail-card">
        <div className="mission-header">
          <h2 className="mission-title">{mission.title}</h2>
          <span className="category-tag">
            {mission.category}
          </span>
        </div>

        <div className="mission-description">
          <p>{mission.description}</p>
        </div>

        <div className="mission-info-grid">
          <div className="info-item">
            <div className="info-label">Награды</div>
            <div className="info-value">
              <div>Опыт: <span className="reward-value">+{mission.experience_reward}</span></div>
              <div>Мана: <span className="reward-value">+{mission.mana_reward}</span></div>
            </div>
          </div>

          <div className="info-item">
            <div className="info-label">Требования</div>
            <div className="info-value">
              <div>Ранг: <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{requiredRank || 'Неизвестно'}</span></div>
              <div>Ветка: <span className="branch-tag">{mission.branch}</span></div>
            </div>
          </div>
        </div>

        {artifact && (
          <div className="artifact-section">
            <h4>🎁 Артефакт</h4>
            <p><strong>Артефакт #{artifact}</strong></p>
            <p>Награда за выполнение миссии</p>
          </div>
        )}

        {competences.length > 0 && (
          <div className="info-item">
            <div className="info-label">📈 Компетенции</div>
            <div className="info-value">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {competences.map((comp: any) => (
                  <span key={comp.id} className="branch-tag">
                    {comp.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mission-actions">
          <button 
            className="action-button primary"
            onClick={handleStartMission}
          >
            Начать миссию
          </button>
          <button 
            className="action-button secondary"
            onClick={handleCompleteMission}
          >
            Завершить миссию
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailPage;
