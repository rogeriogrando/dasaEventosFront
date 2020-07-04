import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { coordenadorFailure, updateCoordenadorSuccess } from './actions';

export function* updateCoordenador({ payload }) {
  try {
    const email = payload.email;
    const { data } = yield call(api.get, `coordenador/${email}`);
    const response = yield call(api.put, `coordenador/${data.usuario.id}`);
    toast.success('Coordenador atualizado com sucesso!');
    yield put(updateCoordenadorSuccess(response.coordenador));
  } catch (err) {
    console.tron.log(err);
    toast.error('E-mail não encontrado!!');
    yield put(coordenadorFailure());
  }
}

export function* deleteCoordenador({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `coordenador/${id}`);
    toast.success('Coordenador excluido!');
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha na exclusão!');
    yield put(coordenadorFailure());
  }
}

export default all([
  takeLatest('@coordenador/UPDATE_LOCAL_REQUEST', updateCoordenador),
  takeLatest('@coordenador/DELETE_LOCAL_REQUEST', deleteCoordenador),
]);
