import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { cursoFailure, updateCursoSuccess } from './actions';

export function* cursoUp({ payload }) {
  try {
    const { nome } = payload;
    yield call(api.post, 'cursos', {
      nome,
    });

    history.push('cursos');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
    yield put(cursoFailure());
  }
}

export function* updateCurso({ payload }) {
  try {
    const { id, nome } = payload.curso;
    const response = yield call(api.put, `cursos/${id}`, { nome: nome });
    toast.success('Curso atualizado com sucesso!');
    yield put(updateCursoSuccess(response.curso));
  } catch (err) {
    toast.error('Falha na atualização, verifique seus dados!');
    yield put(cursoFailure());
  }
}

export function* deleteCurso({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `cursos/${id}`);
    toast.success('Curso excluido!');
  } catch (err) {
    toast.error('Falha na exclusão!');
    yield put(cursoFailure());
  }
}

export default all([
  takeLatest('@curso/CURSO_UP_REQUEST', cursoUp),
  takeLatest('@curso/UPDATE_CURSO_REQUEST', updateCurso),
  takeLatest('@curso/DELETE_CURSO_REQUEST', deleteCurso),
]);
