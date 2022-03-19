import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* LoginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    payload.navigate();
  } catch (error) {
    toast.error('Usuário ou senha inválidos!');
    yield put(actions.loginFailure());
    console.log(error);
  }
}

function persistReHydrate({ payload }) {
  const token = get(payload, 'auth.token');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  console.log(payload);
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerSuccess({ nome, email, password }));
    }
  } catch (error) {
    const errors = get(error, 'response.data.error', []);
    const status = get(error, 'response.status', 0);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }
    console.log(error);

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, LoginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistReHydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
