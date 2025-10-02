import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user, isLoading: contextLoading } = useAppContext();
  const navigate = useNavigate();

  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (!contextLoading && user) {
      console.log('LoginPage: User already logged in, redirecting to home');
      navigate('/');
    }
  }, [user, contextLoading, navigate]);

  // Показываем загрузку, если контекст еще загружается
  if (contextLoading) {
    return (
      <div className="login-page">
        <div className="loading-container">
          <div className="loading-spinner">Загрузка...</div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🚀 Система Геймификации</h1>
          <p>Войдите в свой аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введите ваш email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите ваш пароль"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="login-footer">
          <p>Тестовые аккаунты:</p>
          <div className="test-accounts">
            <div className="test-account">
              <strong>Обычный пользователь:</strong><br />
              Email: test@example.com<br />
              Пароль: password
            </div>
            <div className="test-account">
              <strong>HR (админ):</strong><br />
              Email: hr@example.com<br />
              Пароль: password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
