import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MissionsPage from './pages/MissionsPage';
import MissionDetailPage from './pages/MissionDetailPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const AppContent: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <ThemeProvider initialUserCategory="all">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/missions" element={
              <ProtectedRoute>
                <Layout>
                  <MissionsPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/missions/:id" element={
              <ProtectedRoute>
                <Layout>
                  <MissionDetailPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Layout>
                  <AdminPage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </ThemeProvider>
      </AppProvider>
    </Router>
  );
};

function App() {
  return <AppContent />;
}

export default App;
