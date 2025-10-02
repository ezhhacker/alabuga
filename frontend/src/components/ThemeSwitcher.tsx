import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../context/ThemeContext';
import './ThemeSwitcher.css';

interface ThemeSwitcherProps {
  className?: string;
  showUserCategory?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = '', 
  showUserCategory = true 
}) => {
  const { 
    currentTheme, 
    availableThemes, 
    userCategory, 
    setTheme, 
    setUserCategory, 
    isThemeLoading 
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [categoryButtonRef, setCategoryButtonRef] = useState<HTMLButtonElement | null>(null);

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const handleCategoryChange = (category: string) => {
    setUserCategory(category);
    setShowCategorySelector(false);
  };

  // Закрытие dropdown'ов при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef && !buttonRef.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (categoryButtonRef && !categoryButtonRef.contains(event.target as Node)) {
        setShowCategorySelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, categoryButtonRef]);

  const userCategories = [
    { id: 'all', name: 'Все пользователи', icon: '👥' },
    { id: 'premium', name: 'Премиум', icon: '⭐' },
    { id: 'developer', name: 'Разработчики', icon: '💻' },
    { id: 'eco', name: 'Эко-активисты', icon: '🌱' },
    { id: 'business', name: 'Бизнес', icon: '💼' }
  ];

  return (
    <div className={`theme-switcher ${className}`}>
      {/* Переключатель категории пользователя */}
      {showUserCategory && (
        <div className="user-category-selector">
          <button
            ref={setCategoryButtonRef}
            className="category-button"
            onClick={() => setShowCategorySelector(!showCategorySelector)}
            disabled={isThemeLoading}
          >
            <span className="category-icon">
              {userCategories.find(cat => cat.id === userCategory)?.icon || '👥'}
            </span>
            <span className="category-name">
              {userCategories.find(cat => cat.id === userCategory)?.name || 'Все пользователи'}
            </span>
            <span className="dropdown-arrow">▼</span>
          </button>
          
          {showCategorySelector && createPortal(
            <div className="category-dropdown-portal">
              <div className="category-dropdown">
                {userCategories.map(category => (
                  <button
                    key={category.id}
                    className={`category-option ${userCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>,
            document.body
          )}
        </div>
      )}

      {/* Переключатель тем */}
      <div className="theme-selector">
        <button
          ref={setButtonRef}
          className="theme-button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isThemeLoading}
        >
          <span className="theme-icon">
            {currentTheme.icons.primary}
          </span>
          <span className="theme-name">
            {currentTheme.displayName}
          </span>
          <span className="dropdown-arrow">▼</span>
          {isThemeLoading && <span className="loading-spinner">⏳</span>}
        </button>
        
        {isOpen && createPortal(
          <div className="theme-dropdown-portal">
            <div className="theme-dropdown">
              <div className="theme-dropdown-header">
                <h4>Выберите тему</h4>
                <p>Доступно тем: {availableThemes.length}</p>
              </div>
              
              <div className="theme-list">
                {availableThemes.map(theme => (
                  <button
                    key={theme.id}
                    className={`theme-option ${currentTheme.id === theme.id ? 'active' : ''} ${theme.isDefault ? 'default' : ''}`}
                    onClick={() => handleThemeChange(theme.id)}
                    style={{
                      background: theme.gradients.card,
                      borderColor: theme.colors.border
                    }}
                  >
                    <div className="theme-preview">
                      <div 
                        className="theme-preview-bg"
                        style={{ background: theme.gradients.main }}
                      >
                        <span className="theme-preview-icon">{theme.icons.primary}</span>
                      </div>
                    </div>
                    
                    <div className="theme-info">
                      <div className="theme-name">{theme.displayName}</div>
                      <div className="theme-description">{theme.description}</div>
                      <div className="theme-category">
                        <span className="category-badge">{theme.category}</span>
                        {theme.isDefault && <span className="default-badge">По умолчанию</span>}
                      </div>
                    </div>
                    
                    <div className="theme-status">
                      {currentTheme.id === theme.id && <span className="active-indicator">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
              
              {availableThemes.length === 0 && (
                <div className="no-themes">
                  <p>Нет доступных тем для вашей категории</p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* Информация о текущей теме */}
      <div className="theme-info-panel">
        <div className="theme-details">
          <div className="theme-colors">
            <div 
              className="color-swatch primary" 
              style={{ backgroundColor: currentTheme.colors.primary }}
              title="Основной цвет"
            ></div>
            <div 
              className="color-swatch secondary" 
              style={{ backgroundColor: currentTheme.colors.secondary }}
              title="Вторичный цвет"
            ></div>
            <div 
              className="color-swatch accent" 
              style={{ backgroundColor: currentTheme.colors.accent }}
              title="Акцентный цвет"
            ></div>
          </div>
          
          <div className="theme-meta">
            <span className="theme-id">ID: {currentTheme.id}</span>
            <span className="theme-category">Категория: {currentTheme.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
