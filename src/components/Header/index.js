import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav } from './styled';

export default function Header() {
  const botaoClicado = useSelector((state) => {
    return state.exampleReducer.botaoClicado;
  });

  return (
    <>
      <h1>{botaoClicado ? 'Clicado' : 'Não clicado'}</h1>
      <Nav>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        <Link to="/login">
          <FaUserAlt size={24} />
        </Link>
        <Link to="/teste">
          <FaSignInAlt size={24} />
        </Link>
      </Nav>
    </>
  );
}
