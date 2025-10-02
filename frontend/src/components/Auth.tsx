import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, registerUser } from '../store/thunks/authThunks';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    try {
      if (isLoginMode) {
        await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        }));
      } else {
        await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }));
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Имя:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button 
              type="button"
              className="link-button"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
