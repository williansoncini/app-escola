import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const isLoggedIn = false;

  if (!isLoggedIn) {
    navigate('/login');
  }

  return <Outlet />;
}
