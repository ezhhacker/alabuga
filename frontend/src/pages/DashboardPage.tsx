import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import UserStats from '../components/UserStats';
import Achievements from '../components/Achievements';
import ThemeSwitcher from '../components/ThemeSwitcher';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { user, currentRank, userStats, userLogs, userArtifacts } = useAppContext();

  // Вычисляем прогресс до следующего ранга
  const progressToNextRank = userStats?.current_rank_progress || 0;

  // Моковые данные для компетенций пользователя
  const userCompetences = [
    { id: 1, name: 'Вера в дело', level: 3, maxLevel: 5 },
    { id: 2, name: 'Стремление к большему', level: 4, maxLevel: 5 },
    { id: 3, name: 'Общение', level: 2, maxLevel: 5 },
    { id: 4, name: 'Аналитика', level: 5, maxLevel: 5 }
  ];

  // Моковые данные для активных миссий
  const activeMissions = [
    { id: 1, title: 'Загрузка резюме', branch: 'Рекрутинг', status: 'completed', xp: 50, mana: 30 },
    { id: 2, title: 'Заполнение анкеты', branch: 'Рекрутинг', status: 'in_progress', xp: 30, mana: 20 },
    { id: 3, title: 'Прохождение собеседования', branch: 'Рекрутинг', status: 'locked', xp: 100, mana: 50 },
    { id: 4, title: 'Просмотр видео о компании', branch: 'Онбординг', status: 'completed', xp: 20, mana: 10 },
    { id: 5, title: 'Знакомство с командой', branch: 'Онбординг', status: 'in_progress', xp: 40, mana: 20 }
  ];

  // Моковые данные для ближайших целей
  const upcomingGoals = [
    { id: 1, title: 'Повышение до "Навигатора"', requirement: '500 XP', status: 'active' },
    { id: 2, title: 'Доступ к миссиям "Космические симуляции"', requirement: 'Ранг Навигатор', status: 'locked' },
    { id: 3, title: 'Открытие магазина экипировки', requirement: 'Ранг Пилот-кандидат', status: 'locked' }
  ];

  // Моковые данные для рейтинга
  const leaderboard = [
    { id: 1, name: 'Анна', rank: '★★★', xp: 300, position: 1 },
    { id: 2, name: 'Юрий', rank: '★★☆', xp: 290, position: 2 },
    { id: 3, name: 'Дмитрий', rank: '★★☆', xp: 290, position: 3 },
    { id: 4, name: 'Наталья', rank: '★★', xp: 220, position: 4 },
    { id: 5, name: 'Алексей', rank: '★', xp: 190, position: 5 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'locked': return '🔒';
      default: return '⭕';
    }
  };

  const getCompetenceBar = (level: number, maxLevel: number) => {
    const percentage = (level / maxLevel) * 100;
    const filledBars = Math.floor(percentage / 20);
    const bars = '▓'.repeat(filledBars) + '░'.repeat(5 - filledBars);
    return bars;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="profile-header">
          <div className="avatar">👤</div>
          <div className="profile-info">
            <h1>{user?.name || 'Пользователь'}</h1>
            <div className="rank-info">
              Ранг: "{currentRank?.name}" ★
            </div>
            <div className="experience-info">
              Текущий опыт: {user?.experience || 0} XP
            </div>
          </div>
          <div className="resources">
            <div className="mana">💫 Мана: {user?.mana || 0}</div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="goal-info">
          <h3>Цель: Получить оффер</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progressToNextRank, 100)}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {Math.round(progressToNextRank)}% → Следующий ранг
            </div>
          </div>
          <div className="progress-details">
            Текущий ранг: {currentRank?.name} → Следующий ранг: Максимальный
            <br />
            Осталось набрать: 0 XP
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="left-column">
          <div className="competences-section">
            <h3>Мои компетенции</h3>
            {userCompetences.map(comp => (
              <div key={comp.id} className="competence-item">
                <div className="competence-name">{comp.name}</div>
                <div className="competence-bar">
                  {getCompetenceBar(comp.level, comp.maxLevel)} {comp.level}/{comp.maxLevel}
                </div>
              </div>
            ))}
            <button className="show-all-btn">[Показать все компетенции...]</button>
          </div>
        </div>

        <div className="right-column">
          <div className="missions-section">
            <h3>Активные миссии</h3>
            
            <div className="mission-branch">
              <h4>Ветка: "Рекрутинг"</h4>
              {activeMissions.filter(m => m.branch === 'Рекрутинг').map(mission => (
                <div key={mission.id} className="mission-item">
                  <span className="mission-status">{getStatusIcon(mission.status)}</span>
                  <span className="mission-title">[{mission.title}]</span>
                  <span className="mission-reward">+{mission.xp} XP • +{mission.mana} маны</span>
                </div>
              ))}
            </div>

            <div className="mission-branch">
              <h4>Ветка: "Онбординг"</h4>
              {activeMissions.filter(m => m.branch === 'Онбординг').map(mission => (
                <div key={mission.id} className="mission-item">
                  <span className="mission-status">{getStatusIcon(mission.status)}</span>
                  <span className="mission-title">[{mission.title}]</span>
                  <span className="mission-reward">+{mission.xp} XP • +{mission.mana} маны</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="goals-section">
          <h3>Ближайшие цели</h3>
          {upcomingGoals.map(goal => (
            <div key={goal.id} className="goal-item">
              <span className="goal-icon">🎯</span>
              <span className="goal-title">{goal.title}</span>
              <span className="goal-requirement">({goal.requirement})</span>
            </div>
          ))}
        </div>

        <div className="resources-widget">
          <h3>Мои ресурсы</h3>
          <div className="resource-item">💫 Мана: {user?.mana || 0}</div>
          <div className="resource-item">⭐ Опыт: {user?.experience || 0}</div>
          <div className="resource-item">🏆 Артефакты: {userArtifacts.length}</div>
          <div className="resource-item">📊 Выполнено миссий: {userStats?.missions_completed || 0}</div>
        </div>

        <div className="activity-log">
          <h3>Бортовой журнал</h3>
          <div className="log-section">
            <h4>Сегодня</h4>
            {userLogs.slice(0, 2).map(log => (
              <div key={log.id} className="log-item">
                <span className="log-time">14:30</span>
                <span className="log-icon">✅</span>
                <span className="log-description">{log.description}</span>
              </div>
            ))}
          </div>
          <div className="log-section">
            <h4>Вчера</h4>
            {userLogs.slice(2).map(log => (
              <div key={log.id} className="log-item">
                <span className="log-time">11:40</span>
                <span className="log-icon">🔼</span>
                <span className="log-description">{log.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="leaderboard-section">
        <h3>🏆 ТОП за неделю:</h3>
        <div className="leaderboard-list">
          {leaderboard.map(player => (
            <div key={player.id} className="leaderboard-item">
              <span className="position">{player.position}.</span>
              <span className="name">{player.name}</span>
              <span className="rank">{player.rank}</span>
              <span className="xp">{player.xp} XP</span>
            </div>
          ))}
          <div className="my-position">[Мое место: 15]</div>
        </div>
      </div>

      <div className="stats-achievements-section">
        <UserStats stats={userStats || { 
          missions_completed: 0, 
          artifacts_obtained: 0, 
          competences_maxed: 0, 
          current_rank_progress: 0,
          total_experience: 0,
          total_mana: 0
        }} />
        <Achievements artifacts={userArtifacts} />
      </div>

      <div className="theme-controls-section">
        <ThemeSwitcher showUserCategory={true} />
      </div>
    </div>
  );
};

export default DashboardPage;
