import { get, set } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import { loginFailure } from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';

export default function Fotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = get(params, 'id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        navigate('/');
      }
    };
  }, []);

  const handleChange = async (e) => {
    const foto = e.target.files[0];
    const fotoURL = URL.createObjectURL(foto);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', foto);

    setIsLoading(true);
    try {
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');
    } catch (error) {
      const { status } = get(error, 'response', '');
      toast.error('Erro ao enviar a foto');

      if (status === 401) dispatch(loginFailure());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
