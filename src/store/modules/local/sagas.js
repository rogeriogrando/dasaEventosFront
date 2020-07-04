import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { localFailure, updateLocalSuccess } from './actions';

export function* localUp({ payload }) {
  try {
    const { nome, descricao, capacidade } = payload;
    yield call(api.post, 'locais', {
      nome,
      descricao,
      capacidade,
    });
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(localFailure());
  }
}

export function* updateLocal({ payload }) {
  try {
    const { id, nome, descricao, capacidade } = payload.local;
    const response = yield call(api.put, `locais/${id}`, {
      nome,
      descricao,
      capacidade,
    });
    toast.success('Local atualizado com sucesso!');
    yield put(updateLocalSuccess(response.local));
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha na atualização, verifique seus dados!');
    yield put(localFailure());
  }
}

export function* deleteLocal({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `locais/${id}`);
    toast.success('Local excluido!');
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha na exclusão!');
    yield put(localFailure());
  }
}

export default all([
  takeLatest('@local/LOCAL_UP_REQUEST', localUp),
  takeLatest('@local/UPDATE_LOCAL_REQUEST', updateLocal),
  takeLatest('@local/DELETE_LOCAL_REQUEST', deleteLocal),
]);
