import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, getActiveTheme, activateTheme, getThemesForUserCategory } from '../themes';

interface ThemeContextType {
  currentTheme: Theme;
  availableThemes: Theme[];
  userCategory: string;
  setTheme: (themeId: string) => void;
  setUserCategory: (category: string) => void;
  isThemeLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialUserCategory?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialUserCategory = 'all' 
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getActiveTheme());
  const [userCategory, setUserCategoryState] = useState<string>(initialUserCategory);
  const [isThemeLoading, setIsThemeLoading] = useState(false);

  // Получаем доступные темы для категории пользователя
  const availableThemes = getThemesForUserCategory(userCategory);

  // Функция для смены темы
  const setTheme = (themeId: string) => {
    setIsThemeLoading(true);
    
    // Анимация перехода
    setTimeout(() => {
      activateTheme(themeId);
      const newTheme = getActiveTheme();
      setCurrentTheme(newTheme);
      
      // Применяем CSS переменные к корневому элементу
      applyThemeToDocument(newTheme);
      
      setIsThemeLoading(false);
    }, 300);
  };

  // Функция для смены категории пользователя
  const setUserCategory = (category: string) => {
    setUserCategoryState(category);
    // При смене категории активируем первую доступную тему
    const themes = getThemesForUserCategory(category);
    if (themes.length > 0) {
      setTheme(themes[0].id);
    }
  };

  // Применяем CSS переменные к документу
  const applyThemeToDocument = (theme: Theme) => {
    const root = document.documentElement;
    
    // Основные цвета
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-surface', theme.colors.surface);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-success', theme.colors.success);
    root.style.setProperty('--theme-warning', theme.colors.warning);
    root.style.setProperty('--theme-error', theme.colors.error);
    root.style.setProperty('--theme-info', theme.colors.info);
    
    // Градиенты
    root.style.setProperty('--theme-gradient-main', theme.gradients.main);
    root.style.setProperty('--theme-gradient-card', theme.gradients.card);
    root.style.setProperty('--theme-gradient-button', theme.gradients.button);
    root.style.setProperty('--theme-gradient-header', theme.gradients.header);
    
    // Эффекты
    root.style.setProperty('--theme-blur', theme.effects.blur);
    root.style.setProperty('--theme-shadow', theme.effects.shadow);
    root.style.setProperty('--theme-glow', theme.effects.glow);
    
    // Иконки
    root.style.setProperty('--theme-icon-primary', theme.icons.primary);
    root.style.setProperty('--theme-icon-secondary', theme.icons.secondary);
    root.style.setProperty('--theme-icon-accent', theme.icons.accent);
  };

  // Инициализация темы при загрузке
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  // Сохраняем выбранную тему в localStorage
  useEffect(() => {
    localStorage.setItem('selectedTheme', currentTheme.id);
    localStorage.setItem('userCategory', userCategory);
  }, [currentTheme.id, userCategory]);

  // Загружаем сохраненную тему при инициализации
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedCategory = localStorage.getItem('userCategory');
    
    if (savedCategory) {
      setUserCategoryState(savedCategory);
    }
    
    if (savedTheme) {
      const theme = availableThemes.find(t => t.id === savedTheme);
      if (theme) {
        setTheme(theme.id);
      }
    }
  }, []);

  const contextValue: ThemeContextType = {
    currentTheme,
    availableThemes,
    userCategory,
    setTheme,
    setUserCategory,
    isThemeLoading
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme-container theme-${currentTheme.id} ${isThemeLoading ? 'theme-transitioning' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста темы
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Хук для получения CSS переменных темы
export const useThemeVariables = () => {
  const { currentTheme } = useTheme();
  
  return {
    colors: {
      primary: `var(--theme-primary, ${currentTheme.colors.primary})`,
      secondary: `var(--theme-secondary, ${currentTheme.colors.secondary})`,
      accent: `var(--theme-accent, ${currentTheme.colors.accent})`,
      background: `var(--theme-background, ${currentTheme.colors.background})`,
      surface: `var(--theme-surface, ${currentTheme.colors.surface})`,
      text: `var(--theme-text, ${currentTheme.colors.text})`,
      textSecondary: `var(--theme-text-secondary, ${currentTheme.colors.textSecondary})`,
      border: `var(--theme-border, ${currentTheme.colors.border})`,
      success: `var(--theme-success, ${currentTheme.colors.success})`,
      warning: `var(--theme-warning, ${currentTheme.colors.warning})`,
      error: `var(--theme-error, ${currentTheme.colors.error})`,
      info: `var(--theme-info, ${currentTheme.colors.info})`
    },
    gradients: {
      main: `var(--theme-gradient-main, ${currentTheme.gradients.main})`,
      card: `var(--theme-gradient-card, ${currentTheme.gradients.card})`,
      button: `var(--theme-gradient-button, ${currentTheme.gradients.button})`,
      header: `var(--theme-gradient-header, ${currentTheme.gradients.header})`
    },
    effects: {
      blur: `var(--theme-blur, ${currentTheme.effects.blur})`,
      shadow: `var(--theme-shadow, ${currentTheme.effects.shadow})`,
      glow: `var(--theme-glow, ${currentTheme.effects.glow})`
    },
    icons: {
      primary: `var(--theme-icon-primary, ${currentTheme.icons.primary})`,
      secondary: `var(--theme-icon-secondary, ${currentTheme.icons.secondary})`,
      accent: `var(--theme-icon-accent, ${currentTheme.icons.accent})`
    }
  };
};
