import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import React, { useState } from 'react';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import { loginFailure } from '../../store/modules/auth/actions';

export default function Aluno() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = get(params, 'id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [foto, setFoto] = useState('');

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setFoto(Foto);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.data.errors', []);

        if (status === 400) error.map((err) => toast.error(err));
        navigate('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Email invalido');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Valor invalido para idade');
      formErrors = true;
    }
    if (!isFloat(String(peso))) {
      toast.error('Valor invalido para peso');
      formErrors = true;
    }
    if (!isFloat(String(altura))) {
      toast.error('Valor invalido para altura');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Alteração bem sucedida');
      } else {
        const response = await axios.post('/alunos/', {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        const novoAluno = response.data;
        toast.success('criação bem sucedida');
        navigate(`/aluno/${novoAluno.id}/edit`);
      }
    } catch (error) {
      const status = get(error, 'status', 0);
      const data = get(error, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((err) => toast.error(err));
      } else {
        toast.error('Ocorreu um erro desconhecido');
      }

      if (status === 401) {
        dispatch(loginFailure());
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobre nome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
