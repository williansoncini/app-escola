import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get('alunos');
        setAlunos(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Erro ao carregar alunos');
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const newAlunos = [...alunos];
      newAlunos.splice(index, 1);
      setAlunos(newAlunos);
      setIsLoading(false);
      toast.success('Aluno removido');
    } catch (error) {
      const status = get(error, 'response.status', []);
      if (status === 401) {
        toast.error('Vocês precisa fazer login!');
        navigate('/login');
      } else {
        toast.error('Ocorreu um erro ao apagar o aluno');
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => {
          return (
            <div key={String(aluno.id)}>
              <ProfilePicture>
                {get(aluno, 'Fotos[0].url', false) ? (
                  <img src={aluno.Fotos[0].url} alt="" />
                ) : (
                  <FaUserCircle size={36} />
                )}
              </ProfilePicture>

              <span>{aluno.nome}</span>
              <span>{aluno.email}</span>

              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </Link>
              <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
              </Link>

              <FaExclamation
                onClick={(e) => handleDelete(e, aluno.id, index)}
                size={16}
                display="none"
                cursor="pointer"
              />
            </div>
          );
        })}
      </AlunoContainer>
    </Container>
  );
}
