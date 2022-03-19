import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formError = false;

    if (password.length < 3 || password.length >= 255) {
      formError = true;
      toast.error('O campo nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formError = true;
      toast.error('Campo de email inválido!');
    }

    if (formError) return;
    dispatch(
      actions.loginRequest({
        email,
        password,
        navigate: () => navigate('/'),
      })
    );
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Insira sua senha"
        />

        <button type="submit">Login</button>
      </Form>
    </Container>
  );
}
