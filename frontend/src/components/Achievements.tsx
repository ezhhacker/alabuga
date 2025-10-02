import React from 'react';
import { Artifact } from '../types';
import './Achievements.css';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsProps {
  artifacts: Artifact[];
  className?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ artifacts, className = '' }) => {
  // Моковые данные для достижений
  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Завершите первую миссию',
      icon: '🎯',
      unlocked: true,
      unlockedAt: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Исследователь',
      description: 'Достигните ранга "Исследователь"',
      icon: '⭐',
      unlocked: true,
      unlockedAt: '2024-01-19',
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Коллекционер',
      description: 'Получите 3 артефакта',
      icon: '🏆',
      unlocked: artifacts.length >= 3,
      rarity: 'epic'
    },
    {
      id: 4,
      title: 'Мастер навыков',
      description: 'Максимизируйте 2 компетенции',
      icon: '📈',
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: 5,
      title: 'Легенда',
      description: 'Достигните максимального ранга',
      icon: '👑',
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: 6,
      title: 'Неутомимый',
      description: 'Завершите 10 миссий',
      icon: '💪',
      unlocked: false,
      rarity: 'epic'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#b8c5d1';
      case 'rare': return '#4ecdc4';
      case 'epic': return '#9b59b6';
      case 'legendary': return '#f39c12';
      default: return '#b8c5d1';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return '1px solid rgba(184, 197, 209, 0.3)';
      case 'rare': return '1px solid rgba(78, 205, 196, 0.5)';
      case 'epic': return '1px solid rgba(155, 89, 182, 0.5)';
      case 'legendary': return '2px solid rgba(243, 156, 18, 0.7)';
      default: return '1px solid rgba(184, 197, 209, 0.3)';
    }
  };

  return (
    <div className={`achievements ${className}`}>
      <div className="achievements-header">
        <h3>🏆 Достижения</h3>
        <div className="achievements-progress">
          {achievements.filter(a => a.unlocked).length} / {achievements.length}
        </div>
      </div>
      
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            style={{
              border: getRarityBorder(achievement.rarity),
              color: getRarityColor(achievement.rarity)
            }}
          >
            <div className="achievement-icon">
              {achievement.unlocked ? achievement.icon : '🔒'}
            </div>
            <div className="achievement-content">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-description">{achievement.description}</div>
              {achievement.unlocked && achievement.unlockedAt && (
                <div className="achievement-date">
                  Получено: {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                </div>
              )}
            </div>
            <div className="achievement-rarity">
              {achievement.rarity.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
