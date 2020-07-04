import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { loadParticipantes } from './actions';

export function* loadParticipante({ payload }) {
  try {
    const { evento } = payload;
    history.push('/listapresencas');
  } catch (err) {
    toast.error('Lista não encontrada!');
    history.push('/eventopresencas');
  }
}

export function* confirmaParticipante({ payload }) {
  try {
    const id = payload.evento;
    const response = yield call(api.post, `presencas/${id}`);
  } catch (err) {
    toast.error('Participante não encontrado!');
  }
}

export function* desConfirmaParticipante({ payload }) {
  try {
    const id = payload.evento;
    const response = yield call(api.delete, `presencas/${id}`);
  } catch (err) {
    toast.error('Participante não encontrado!');
  }
}

export default all([
  takeLatest('@listaparticipante/LOAD_PARTICIPANTE_SUCCESS', loadParticipante),
  takeLatest(
    '@listaparticipante/CONFIRMA_PARTICIPANTE_SUCCESS',
    confirmaParticipante
  ),
  takeLatest(
    '@listaparticipante/DESCONFIRMA_PARTICIPANTE_SUCCESS',
    desConfirmaParticipante
  ),
]);
