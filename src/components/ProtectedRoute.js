import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, isChecking, children }) => {
  if (isChecking) {
    return <div className='session-check' role='status'>Проверяем сессию…</div>;
  }
  return loggedIn ? children : <Navigate to='/' replace />;
};

export default ProtectedRoute;
