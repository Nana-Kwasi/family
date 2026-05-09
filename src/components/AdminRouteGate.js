import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ADMIN_OTP_GATE_KEY } from '../constants/adminSession';

export default function AdminRouteGate({ children }) {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#BA9D7C', fontFamily: "'Cinzel', serif", letterSpacing: '0.12em',
      }}
      >
        Loading…
      </div>
    );
  }

  if (!user?.isAdmin) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (sessionStorage.getItem(ADMIN_OTP_GATE_KEY)) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children;
}
