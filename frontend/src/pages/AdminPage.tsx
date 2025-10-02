import React, { useState, useEffect } from 'react';
import { ThemeEntity, ThemeForm, Mission, HRUser } from '../types';
import { useAppContext } from '../context/AppContext';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const { user } = useAppContext();
  
  // Все хуки должны быть вызваны до любых условий
  const [activeTab, setActiveTab] = useState<'themes' | 'missions' | 'users' | 'analytics'>('themes');
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeEntity | null>(null);
  const [isCreatingMission, setIsCreatingMission] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Моковые темы
  const [themes, setThemes] = useState<ThemeEntity[]>([
    {
      id: 'space',
      name: 'space',
      displayName: 'Космическая Одиссея',
      description: 'Исследуйте бесконечные просторы вселенной',
      category: 'space',
      isActive: true,
      isDefault: true,
      isCustom: false,
      userCategories: ['all'],
      createdBy: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      colors: {
        primary: '#4ecdc4',
        secondary: '#667eea',
        accent: '#ffd700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        surface: 'rgba(255, 255, 255, 0.1)',
        text: '#ffffff',
        textSecondary: '#b8c5d1',
        border: 'rgba(255, 255, 255, 0.2)',
        success: '#4ecdc4',
        warning: '#ffd700',
        error: '#ff6b6b',
        info: '#4ecdc4'
      },
      gradients: {
        main: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        button: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
        header: 'linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8))'
      },
      effects: {
        blur: 'blur(10px)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        glow: '0 0 20px rgba(78, 205, 196, 0.3)'
      },
      icons: {
        primary: '🚀',
        secondary: '⭐',
        accent: '🌟'
      }
    }
  ]);

  // Проверяем, что пользователь HR
  if (!user || user.role !== 'hr') {
    return (
      <div className="access-denied">
        <h2>🚫 Доступ запрещен</h2>
        <p>Эта страница доступна только HR пользователям.</p>
        <button onClick={() => window.history.back()}>
          ← Назад
        </button>
      </div>
    );
  }

  // Фильтрация тем
  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && theme.isActive) ||
                         (filterStatus === 'inactive' && !theme.isActive);
    return matchesSearch && matchesStatus;
  });

  // Моковые данные для HR пользователя
  const currentHR: HRUser = {
    id: 1,
    name: 'Анна Петрова',
    email: 'anna.petrova@company.com',
    role: 'hr',
    permissions: ['manage_themes', 'manage_missions', 'view_users'],
    created_at: '2024-01-01T00:00:00Z',
    last_login: '2024-01-20T10:30:00Z'
  };

  const handleCreateTheme = () => {
    setIsCreatingTheme(true);
  };

  const handleEditTheme = (theme: ThemeEntity) => {
    setEditingTheme(theme);
  };

  const handleDeleteTheme = (themeId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту тему?')) {
      setThemes(themes.filter(theme => theme.id !== themeId));
    }
  };

  const handleActivateTheme = (themeId: string) => {
    setThemes(themes.map(theme => ({
      ...theme,
      isActive: theme.id === themeId
    })));
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Админ-панель</h1>
        <div className="admin-user">
          <div className="user-avatar">{currentHR.name.charAt(0)}</div>
          <div className="user-info">
            <div className="user-name">{currentHR.name}</div>
            <div className="user-role">{currentHR.role.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div className="admin-nav">
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            🎨 Темы
          </button>
          <button 
            className={`tab-button ${activeTab === 'missions' ? 'active' : ''}`}
            onClick={() => setActiveTab('missions')}
          >
            🎯 Миссии
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Пользователи
          </button>
          <button 
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Аналитика
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'themes' && (
          <div className="themes-section">
            <div className="section-header">
              <h2>Управление темами</h2>
              <button className="create-button" onClick={handleCreateTheme}>
                ➕ Создать тему
              </button>
            </div>

            {/* Поиск и фильтры */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Поиск тем..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '10px 15px',
                  border: '1px solid #2d3748',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px'
                }}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                style={{
                  padding: '10px 15px',
                  border: '1px solid #2d3748',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px'
                }}
              >
                <option value="all">Все темы</option>
                <option value="active">Активные</option>
                <option value="inactive">Неактивные</option>
              </select>
            </div>

            <div className="themes-grid">
              {filteredThemes.map(theme => (
                <div key={theme.id} className={`theme-card ${theme.isActive ? 'active' : ''}`}>
                  <div className="theme-preview" style={{ background: theme.gradients.main }}>
                    <span className="theme-icon">{theme.icons.primary}</span>
                  </div>
                  
                  <div className="theme-info">
                    <h3>{theme.displayName}</h3>
                    <p>{theme.description}</p>
                    <div className="theme-meta">
                      <span className="category-badge">{theme.category}</span>
                      {theme.isDefault && <span className="default-badge">По умолчанию</span>}
                      {theme.isCustom && <span className="custom-badge">Пользовательская</span>}
                    </div>
                    <div className="theme-categories">
                      Категории: {theme.userCategories.join(', ')}
                    </div>
                  </div>

                  <div className="theme-actions">
                    <button 
                      className={`action-button ${theme.isActive ? 'active' : ''}`}
                      onClick={() => handleActivateTheme(theme.id)}
                    >
                      {theme.isActive ? '✅ Активна' : '🔘 Активировать'}
                    </button>
                    <button 
                      className="action-button edit"
                      onClick={() => handleEditTheme(theme)}
                    >
                      ✏️ Редактировать
                    </button>
                    {!theme.isDefault && (
                      <button 
                        className="action-button delete"
                        onClick={() => handleDeleteTheme(theme.id)}
                      >
                        🗑️ Удалить
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'missions' && (
          <div className="missions-section">
            <div className="section-header">
              <h2>Управление миссиями</h2>
              <button 
                className="create-button"
                onClick={() => setIsCreatingMission(true)}
              >
                ➕ Создать миссию
              </button>
            </div>
            
            <div className="missions-list">
              <div className="mission-card">
                <div className="mission-info">
                  <h3>Первые шаги</h3>
                  <p>Создайте свой первый проект</p>
                  <div className="mission-details">
                    <span>Опыт: +50</span>
                    <span>Мана: +25</span>
                    <span>Категория: Обучение</span>
                  </div>
                </div>
                <div className="mission-actions">
                  <button className="action-button edit">✏️ Редактировать</button>
                  <button className="action-button delete">🗑️ Удалить</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>Управление пользователями</h2>
            </div>
            
            <div className="users-list">
              <p>Здесь будет список пользователей для управления...</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <div className="section-header">
              <h2>📊 Аналитика</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '30px' }}>
              <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '25px', borderRadius: '12px', border: '1px solid #2d3748' }}>
                <h3 style={{ color: '#ffd700', margin: '0 0 15px 0', fontSize: '18px' }}>👥 Пользователи</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Всего пользователей:</span>
                  <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>1,247</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Активных сегодня:</span>
                  <span style={{ color: '#48bb78', fontSize: '18px', fontWeight: 'bold' }}>89</span>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '25px', borderRadius: '12px', border: '1px solid #2d3748' }}>
                <h3 style={{ color: '#ffd700', margin: '0 0 15px 0', fontSize: '18px' }}>🎯 Миссии</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Всего миссий:</span>
                  <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>156</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Завершено сегодня:</span>
                  <span style={{ color: '#48bb78', fontSize: '18px', fontWeight: 'bold' }}>23</span>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '25px', borderRadius: '12px', border: '1px solid #2d3748' }}>
                <h3 style={{ color: '#ffd700', margin: '0 0 15px 0', fontSize: '18px' }}>🎨 Темы</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Всего тем:</span>
                  <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>12</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ color: '#a0aec0', fontSize: '14px' }}>Активных:</span>
                  <span style={{ color: '#48bb78', fontSize: '18px', fontWeight: 'bold' }}>8</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '25px', borderRadius: '12px', border: '1px solid #2d3748' }}>
              <h3 style={{ color: '#ffd700', margin: '0 0 20px 0', fontSize: '18px' }}>📈 Активность за последние 7 дней</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '100px', marginBottom: '15px' }}>
                {[65, 78, 45, 89, 92, 67, 85].map((height, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div 
                      style={{ 
                        width: '20px', 
                        height: `${height}px`, 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '4px 4px 0 0',
                        marginBottom: '8px'
                      }}
                    />
                    <span style={{ color: '#a0aec0', fontSize: '12px' }}>
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно создания/редактирования темы */}
      {(isCreatingTheme || editingTheme) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingTheme ? 'Редактировать тему' : 'Создать новую тему'}</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setIsCreatingTheme(false);
                  setEditingTheme(null);
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <p>Здесь будет форма для создания/редактирования темы...</p>
              <p>Функционал будет добавлен в следующих итерациях.</p>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно создания/редактирования миссии */}
      {(isCreatingMission || editingMission) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingMission ? 'Редактировать миссию' : 'Создать новую миссию'}</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setIsCreatingMission(false);
                  setEditingMission(null);
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <form className="mission-form">
                <div className="form-group">
                  <label>Название миссии</label>
                  <input 
                    type="text" 
                    placeholder="Введите название миссии"
                    defaultValue={editingMission?.title || ''}
                  />
                </div>
                
                <div className="form-group">
                  <label>Описание</label>
                  <textarea 
                    placeholder="Описание миссии"
                    defaultValue={editingMission?.description || ''}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Опыт</label>
                    <input 
                      type="number" 
                      placeholder="50"
                      defaultValue={editingMission?.experience_reward || ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Мана</label>
                    <input 
                      type="number" 
                      placeholder="25"
                      defaultValue={editingMission?.mana_reward || ''}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Категория</label>
                    <select defaultValue={editingMission?.category || ''}>
                      <option value="">Выберите категорию</option>
                      <option value="Обучение">Обучение</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Ветка</label>
                    <input 
                      type="text" 
                      placeholder="React"
                      defaultValue={editingMission?.branch || ''}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-button">
                    Отмена
                  </button>
                  <button type="submit" className="save-button">
                    {editingMission ? 'Сохранить изменения' : 'Создать миссию'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
