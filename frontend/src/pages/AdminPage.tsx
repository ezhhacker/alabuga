import React, { useState } from 'react';
import { ThemeEntity, ThemeForm, Mission, HRUser } from '../types';
import { useAppContext } from '../context/AppContext';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  const { user } = useAppContext();
  
  // Все хуки должны быть вызваны до любых условий
  const [activeTab, setActiveTab] = useState<'themes' | 'missions' | 'users'>('themes');
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeEntity | null>(null);
  const [isCreatingMission, setIsCreatingMission] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  
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
        <h2>Доступ запрещен</h2>
        <p>Эта страница доступна только HR пользователям.</p>
        <button onClick={() => window.history.back()}>
          Назад
        </button>
      </div>
    );
  }

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
        <h1>🎛️ Панель администратора</h1>
        <div className="admin-user">
          <span className="user-avatar">👩‍💼</span>
          <div className="user-info">
            <div className="user-name">{currentHR.name}</div>
            <div className="user-role">{currentHR.role.toUpperCase()}</div>
          </div>
        </div>
      </div>

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

            <div className="themes-grid">
              {themes.map(theme => (
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
