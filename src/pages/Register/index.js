import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';

import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  const isLoading = useSelector((state) => state.auth.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!id) return;

    setName(nomeStored);
    setEmail(emailStored);
  }, [id, nomeStored, emailStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formError = false;

    if (name.length < 3 || name.length >= 255) {
      formError = true;
      toast.error('O campo nome deve ter entre 3 e 255 caracteres');
    }

    if (!id && (password.length < 3 || password.length >= 255)) {
      formError = true;
      toast.error('O campo nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formError = true;
      toast.error('Campo de email inválido!');
    }

    if (formError) return;

    dispatch(actions.registerRequest({ nome: name, email, password, id }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados' : 'Crie a sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insira seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira seu email"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira sua senha"
          />
        </label>
        <button type="submit">{id ? 'Salvar' : 'Criar minha conta'}</button>
      </Form>
    </Container>
  );
}
