import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setArtifacts, setUserArtifacts } from '../store/slices/artifactsSlice';
// Removed mock data import

const ArtifactsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { artifacts, userArtifacts } = useAppSelector((state) => state.artifacts);
  const [filter, setFilter] = useState<'all' | 'obtained' | 'available'>('obtained');

  useEffect(() => {
    // Загружаем артефакты из API
    // dispatch(setArtifacts(artifacts));
    if (user) {
      // dispatch(setUserArtifacts(userArtifacts));
    }
  }, [dispatch, user]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#808080';
      case 'rare': return '#0080ff';
      case 'epic': return '#8000ff';
      case 'legendary': return '#ff8000';
      default: return '#808080';
    }
  };

  const getRarityName = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return 'Неизвестный';
    }
  };

  const isArtifactObtained = (artifact: any) => {
    return userArtifacts.some(ua => ua.id === artifact.id);
  };

  const filteredArtifacts = artifacts.filter(artifact => {
    if (filter === 'obtained') return isArtifactObtained(artifact);
    if (filter === 'available') return !isArtifactObtained(artifact);
    return true;
  });

  return (
    <div className="artifacts-page">
      <div className="artifacts-header">
        <h2>Артефакты</h2>
        <div className="artifacts-stats">
          <span>Получено: {userArtifacts.length} / {artifacts.length}</span>
        </div>
      </div>

      <div className="artifacts-filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Все артефакты
        </button>
        <button 
          className={filter === 'obtained' ? 'active' : ''}
          onClick={() => setFilter('obtained')}
        >
          Полученные
        </button>
        <button 
          className={filter === 'available' ? 'active' : ''}
          onClick={() => setFilter('available')}
        >
          Доступные
        </button>
      </div>

      <div className="artifacts-grid">
        {filteredArtifacts.map((artifact) => {
          const isObtained = isArtifactObtained(artifact);
          
          return (
            <div 
              key={artifact.id} 
              className={`artifact-card ${isObtained ? 'obtained' : 'not-obtained'}`}
            >
              <div className="artifact-image">
                <img src={artifact.image} alt={artifact.name} />
                {isObtained && (
                  <div className="obtained-badge">✓</div>
                )}
              </div>
              
              <div className="artifact-info">
                <h3>{artifact.name}</h3>
                <p className="artifact-description">{artifact.description}</p>
                
                <div 
                  className="artifact-rarity"
                  style={{ color: getRarityColor(artifact.rarity) }}
                >
                  {getRarityName(artifact.rarity)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {userArtifacts.length > 0 && (
        <div className="user-artifacts">
          <h3>Ваши артефакты</h3>
          <div className="user-artifacts-grid">
            {userArtifacts.map((artifact) => (
              <div key={artifact.id} className="user-artifact-card">
                <img src={artifact.image} alt={artifact.name} />
                <span>{artifact.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtifactsPage;
