import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import ProtectedRoute from './MyRoute';

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/teste" element={<Login />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
