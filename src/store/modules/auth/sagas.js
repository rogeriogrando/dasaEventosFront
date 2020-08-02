import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure, signUpLoading } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, pass } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      pass,
    });

    const { token, usuario } = response.data;

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess(token, usuario));

    history.push('/eventos');
  } catch (err) {
    toast.error('Falha na autenticação!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, email, pass } = payload;
    yield call(api.post, 'usuarios', {
      nome,
      email,
      pass,
    });

    history.push('/');
    yield put(signUpLoading());
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function* resetPasswordMailRequest({ payload }) {
  try {
    const { email } = payload;
    yield call(api.post, '/resetpassword', {
      email,
    });
    history.push('/');
    yield put(signUpLoading());
  } catch (err) {
    toast.error('Falha ao enviar e-mail!');
    yield put(signFailure());
  }
}

export function* resetPasswordRequest({ payload }) {
  try {
    const { token, pass, confirmpass: confirPass } = payload;
    yield call(api.put, `/resetpassword/${token}`, {
      pass,
      confirPass,
    });
    history.push('/');
    yield put(signUpLoading());
  } catch (err) {
    toast.error('Falha ao enviar e-mail!');
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/RESETPASSWORDMAIL_REQUEST', resetPasswordMailRequest),
  takeLatest('@auth/RESETPASSWORD_REQUEST', resetPasswordRequest),
]);
