import React from 'react';
import { useDispatch } from 'react-redux';
import { Paragrafo, Title } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as exampleReducer from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(exampleReducer.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title isRed={false}>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>Lorem</Paragrafo>
      <button type="button" onClick={handleClick}>
        BOTAO_CLICADO
      </button>
    </Container>
  );
}
