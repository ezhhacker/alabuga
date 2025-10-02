import React, { useState, useEffect } from 'react';
import { Artifact } from '../types';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

const Artifacts: React.FC = () => {
  const { user, artifacts } = useApp();
  const [userArtifacts, setUserArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'obtained' | 'available'>('obtained');

  useEffect(() => {
    if (user) {
      loadUserArtifacts();
    }
  }, [user]);

  const loadUserArtifacts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await apiService.getArtifacts();
      if (response.success) {
        setUserArtifacts(response.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки артефактов:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const isArtifactObtained = (artifact: Artifact) => {
    return userArtifacts.some(ua => ua.id === artifact.id);
  };

  const filteredArtifacts = artifacts.filter(artifact => {
    if (filter === 'obtained') return isArtifactObtained(artifact);
    if (filter === 'available') return !isArtifactObtained(artifact);
    return true;
  });

  if (loading) {
    return <div>Загрузка артефактов...</div>;
  }

  return (
    <div className="artifacts">
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
    </div>
  );
};

export default Artifacts;
