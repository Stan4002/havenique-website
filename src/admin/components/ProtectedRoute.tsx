import React from 'react';
import { Navigate } from 'react-router-dom';
export function ProtectedRoute({ children }: {children: React.ReactNode;}) {
  const token = localStorage.getItem('havenique_admin_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}