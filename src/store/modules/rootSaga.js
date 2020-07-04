import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import usuario from './usuario/sagas';
import curso from './curso/sagas';
import evento from './evento/sagas';
import local from './local/sagas';
import coordenador from './coordenador/sagas';
import listaparticipante from './listaparticipante/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    usuario,
    curso,
    evento,
    local,
    coordenador,
    listaparticipante,
  ]);
}
