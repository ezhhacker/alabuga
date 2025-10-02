import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ThemeSwitcher from './ThemeSwitcher';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'ЛК', icon: '🏠' },
    { path: '/profile', label: 'Профиль', icon: '👤' },
    { path: '/missions', label: 'Миссии', icon: '🎯' },
  ];

  // Добавляем админку только для HR пользователей
  if (user?.role === 'hr') {
    navItems.push({ path: '/admin', label: 'Админка', icon: '🎛️' });
  }

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="header-title">🚀 Система Геймификации</h1>
          <div className="header-user">
            <div className="user-avatar">👤</div>
            <span className="user-name">Добро пожаловать, {user?.name || 'Пользователь'}!</span>
          </div>
        </div>
      </header>

      <nav className="layout-nav">
        <div className="nav-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="nav-link logout-button"
          >
            <span className="nav-icon">🚪</span>
            <span>Выход</span>
          </button>
          
          <div className="theme-switcher-container">
            <ThemeSwitcher showUserCategory={false} />
          </div>
        </div>
      </nav>

      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
