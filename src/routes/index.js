import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';
import ProtectedRoute from './MyRoute';

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/aluno/:id/edit" element={<Aluno />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/fotos/:id" element={<Fotos />} />
      </Route>
      <Route path="/" element={<Alunos />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
