import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Page404 from '../pages/Page404';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    navigate('/login');
    toast.error('Por favor, faça login');
  }

  return <Outlet />;
}
