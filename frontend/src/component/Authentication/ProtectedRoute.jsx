
import React from 'react';
import AuthRoute from './AuthRoute';

const ProtectedRoute = ({ children }) => {
  return (
    <AuthRoute>
      {children}
    </AuthRoute>
  );
};

export default ProtectedRoute;
