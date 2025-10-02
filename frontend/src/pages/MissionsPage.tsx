import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './MissionsPage.css';

const MissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'all'>('available');
  const { missions } = useAppContext();
  
  const allMissions = missions || [];
  const availableMissions = missions || [];

  const getMissionsToShow = () => {
    return activeTab === 'available' ? availableMissions : allMissions;
  };

  return (
    <div className="missions-page">
      <div className="missions-header">
        <h1>Миссии</h1>
        <p>
          Выберите миссию для выполнения и получите награды
        </p>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Доступные ({availableMissions.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Все ({allMissions.length})
        </button>
      </div>

      <div className="missions-grid">
        {getMissionsToShow().map((mission: any) => (
          <div key={mission.id} className="mission-card">
            <div className="mission-content">
              <div className="mission-header">
                <h3 className="mission-title">{mission.title}</h3>
                <span className="mission-category">
                  {mission.category}
                </span>
              </div>
              
              <div className="mission-description">
                <p>{mission.description}</p>
              </div>
              
              <div className="mission-rewards">
                <div className="reward-item">
                  <span>Опыт:</span>
                  <span className="reward-value">+{mission.experience_reward}</span>
                </div>
                <div className="reward-item">
                  <span>Мана:</span>
                  <span className="reward-value">+{mission.mana_reward}</span>
                </div>
              </div>
              
              <div className="mission-branch">
                <span>Ветка: </span>
                <span className="branch-tag">
                  {mission.branch}
                </span>
              </div>
            </div>
            
            <div className="mission-actions">
              <Link 
                to={`/missions/${mission.id}`}
                className="mission-button primary"
              >
                Подробнее
              </Link>
              <button 
                className="mission-button secondary"
                onClick={() => alert(`Миссия "${mission.title}" начата!`)}
              >
                Начать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;
