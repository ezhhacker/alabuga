import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAppContext();
  const location = useLocation();

  console.log('ProtectedRoute: user:', user);
  console.log('ProtectedRoute: isLoading:', isLoading);

  // Показываем загрузку только если действительно загружаемся
  if (isLoading) {
    console.log('ProtectedRoute: Loading...');
    return (
      <div className="loading-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  // Проверяем авторизацию только если загрузка завершена и нет пользователя
  if (!isLoading && !user) {
    console.log('ProtectedRoute: No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;