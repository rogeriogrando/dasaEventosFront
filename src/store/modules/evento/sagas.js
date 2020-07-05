import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  cretaeEventoFailure,
  eventoFailure,
  updateEventoSuccess,
} from './actions';

export function* createEvento({ payload }) {
  try {
    yield call(api.post, 'eventos', payload.data);
    toast.success('Evento cadastrado com sucesso!');
    history.push('eventos');
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(cretaeEventoFailure());
  }
}

export function* participarEvento({ payload }) {
  try {
    console.tron.log(payload.evento);
    yield call(api.post, 'usuarioeventos', { evento_id: payload.evento });
    toast.success('Você esta participando de um novo evento!');
    history.push('eventos');
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(cretaeEventoFailure());
  }
}

export function* naoParticiparEvento({ payload }) {
  try {
    const id = payload.evento;
    console.tron.log(id);
    yield call(api.delete, `usuarioeventos/${id}`);
    toast.success('Participação cancelada!');
    history.push('usuarioeventos');
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha ao cancelar a participação!');
    yield put(cretaeEventoFailure());
  }
}

export function* updateEvento({ payload }) {
  try {
    const {
      id,
      curso_id,
      local_id,
      modelo_id,
      data_orig,
      horaini,
      horafim,
      palestrante,
      titulo,
      descricao,
      dizeres,
      ativo,
      assinatura_left_id,
      assinatura_center_id,
      assinatura_right_id,
    } = payload.evento;
    const response = yield call(api.put, `eventos/${id}`, {
      curso_id,
      local_id,
      modelo_id,
      data: data_orig,
      horaini,
      horafim,
      palestrante,
      titulo,
      descricao,
      dizeres,
      ativo,
      assinatura_left_id,
      assinatura_center_id,
      assinatura_right_id,
    });
    toast.success('Evento atualizado com sucesso!');
    yield put(updateEventoSuccess(response.evento));
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha na atualização, verifique seus dados!');
    yield put(eventoFailure());
  }
}

export default all([
  takeLatest('@evento/EVENTO_CREATE_REQUEST', createEvento),
  takeLatest('@evento/UPDATE_EVENTO_REQUEST', updateEvento),
  takeLatest('@evento/PARTICIPAR_EVENTO_REQUEST', participarEvento),
  takeLatest('@evento/NAOPARTICIPAR_EVENTO_REQUEST', naoParticiparEvento),
]);
