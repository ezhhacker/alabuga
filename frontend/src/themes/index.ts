// Система темизации приложения
export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'space' | 'fantasy' | 'cyber' | 'nature' | 'corporate';
  isActive: boolean;
  isDefault: boolean;
  userCategories: string[]; // Категории пользователей, для которых доступна тема
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    main: string;
    card: string;
    button: string;
    header: string;
  };
  effects: {
    blur: string;
    shadow: string;
    glow: string;
  };
  icons: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Космическая тема (по умолчанию)
export const spaceTheme: Theme = {
  id: 'space',
  name: 'space',
  displayName: 'Космическая Одиссея',
  description: 'Исследуйте бесконечные просторы вселенной',
  category: 'space',
  isActive: true,
  isDefault: true,
  userCategories: ['all'],
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
};

// Фэнтези тема
export const fantasyTheme: Theme = {
  id: 'fantasy',
  name: 'fantasy',
  displayName: 'Магическое Королевство',
  description: 'Погрузитесь в мир магии и приключений',
  category: 'fantasy',
  isActive: false,
  isDefault: false,
  userCategories: ['premium'],
  colors: {
    primary: '#9b59b6',
    secondary: '#e74c3c',
    accent: '#f39c12',
    background: 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: '#ecf0f1',
    border: 'rgba(255, 255, 255, 0.2)',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db'
  },
  gradients: {
    main: 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)',
    card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    button: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
    header: 'linear-gradient(90deg, rgba(142, 68, 173, 0.8), rgba(192, 57, 43, 0.8))'
  },
  effects: {
    blur: 'blur(10px)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(155, 89, 182, 0.3)'
  },
  icons: {
    primary: '🧙‍♂️',
    secondary: '⚔️',
    accent: '🏰'
  }
};

// Киберпанк тема
export const cyberTheme: Theme = {
  id: 'cyber',
  name: 'cyber',
  displayName: 'Киберпространство',
  description: 'Будущее уже здесь - цифровой мир',
  category: 'cyber',
  isActive: false,
  isDefault: false,
  userCategories: ['developer'],
  colors: {
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    surface: 'rgba(0, 255, 136, 0.1)',
    text: '#00ff88',
    textSecondary: '#00ffff',
    border: 'rgba(0, 255, 136, 0.3)',
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0080',
    info: '#00ffff'
  },
  gradients: {
    main: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    card: 'linear-gradient(145deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 255, 0.05))',
    button: 'linear-gradient(45deg, #00ff88, #00ffff)',
    header: 'linear-gradient(90deg, rgba(0, 255, 136, 0.8), rgba(0, 255, 255, 0.8))'
  },
  effects: {
    blur: 'blur(10px)',
    shadow: '0 8px 32px rgba(0, 255, 136, 0.2)',
    glow: '0 0 20px rgba(0, 255, 136, 0.5)'
  },
  icons: {
    primary: '🤖',
    secondary: '💻',
    accent: '⚡'
  }
};

// Природная тема
export const natureTheme: Theme = {
  id: 'nature',
  name: 'nature',
  displayName: 'Зеленые Просторы',
  description: 'Гармония с природой и экологией',
  category: 'nature',
  isActive: false,
  isDefault: false,
  userCategories: ['eco'],
  colors: {
    primary: '#2ecc71',
    secondary: '#27ae60',
    accent: '#f39c12',
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 50%, #16a085 100%)',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: '#ecf0f1',
    border: 'rgba(255, 255, 255, 0.2)',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db'
  },
  gradients: {
    main: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 50%, #16a085 100%)',
    card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    button: 'linear-gradient(45deg, #2ecc71, #27ae60)',
    header: 'linear-gradient(90deg, rgba(46, 204, 113, 0.8), rgba(39, 174, 96, 0.8))'
  },
  effects: {
    blur: 'blur(10px)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(46, 204, 113, 0.3)'
  },
  icons: {
    primary: '🌱',
    secondary: '🌿',
    accent: '🌳'
  }
};

// Корпоративная тема
export const corporateTheme: Theme = {
  id: 'corporate',
  name: 'corporate',
  displayName: 'Деловой Стиль',
  description: 'Профессиональный и элегантный дизайн',
  category: 'corporate',
  isActive: false,
  isDefault: false,
  userCategories: ['business'],
  colors: {
    primary: '#34495e',
    secondary: '#2c3e50',
    accent: '#3498db',
    background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
    surface: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: '#bdc3c7',
    border: 'rgba(255, 255, 255, 0.2)',
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db'
  },
  gradients: {
    main: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
    card: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    button: 'linear-gradient(45deg, #3498db, #2980b9)',
    header: 'linear-gradient(90deg, rgba(52, 73, 94, 0.8), rgba(44, 62, 80, 0.8))'
  },
  effects: {
    blur: 'blur(10px)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(52, 152, 219, 0.3)'
  },
  icons: {
    primary: '💼',
    secondary: '📊',
    accent: '🎯'
  }
};

// Неоновый город (моя тема)
export const neonCityTheme: Theme = {
  id: 'neon-city',
  name: 'neon-city',
  displayName: 'Неоновый Город',
  description: 'Футуристический мегаполис с яркими неоновыми огнями',
  category: 'cyber',
  isActive: false,
  isDefault: false,
  userCategories: ['all', 'developer', 'premium'],
  colors: {
    primary: '#00ff88',
    secondary: '#ff0080',
    accent: '#00ffff',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)',
    surface: 'rgba(0, 255, 136, 0.15)',
    text: '#00ff88',
    textSecondary: '#00ffff',
    border: 'rgba(0, 255, 136, 0.4)',
    success: '#00ff88',
    warning: '#ffff00',
    error: '#ff0080',
    info: '#00ffff'
  },
  gradients: {
    main: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)',
    card: 'linear-gradient(145deg, rgba(0, 255, 136, 0.15), rgba(0, 255, 255, 0.1))',
    button: 'linear-gradient(45deg, #00ff88, #00ffff, #ff0080)',
    header: 'linear-gradient(90deg, rgba(0, 255, 136, 0.8), rgba(0, 255, 255, 0.8), rgba(255, 0, 128, 0.8))'
  },
  effects: {
    blur: 'blur(15px)',
    shadow: '0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
    glow: '0 0 25px rgba(0, 255, 136, 0.6), 0 0 50px rgba(0, 255, 255, 0.3)'
  },
  icons: {
    primary: '🌃',
    secondary: '💫',
    accent: '⚡'
  }
};

// Все доступные темы
export const allThemes: Theme[] = [
  spaceTheme,
  fantasyTheme,
  cyberTheme,
  natureTheme,
  corporateTheme,
  neonCityTheme
];

// Получить активную тему
export const getActiveTheme = (): Theme => {
  return allThemes.find(theme => theme.isActive) || spaceTheme;
};

// Получить темы для категории пользователей
export const getThemesForUserCategory = (userCategory: string): Theme[] => {
  return allThemes.filter(theme => 
    theme.userCategories.includes('all') || 
    theme.userCategories.includes(userCategory)
  );
};

// Активировать тему
export const activateTheme = (themeId: string): void => {
  allThemes.forEach(theme => {
    theme.isActive = theme.id === themeId;
  });
};

// Добавить новую тему (для админки)
export const addTheme = (theme: Theme): void => {
  allThemes.push(theme);
};

// Удалить тему
export const removeTheme = (themeId: string): void => {
  const index = allThemes.findIndex(theme => theme.id === themeId);
  if (index !== -1 && !allThemes[index].isDefault) {
    allThemes.splice(index, 1);
  }
};
