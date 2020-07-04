import { combineReducers } from 'redux';

import auth from './auth/reducer';
import usuario from './usuario/reducer';
import curso from './curso/reducer';
import evento from './evento/reducer';
import local from './local/reducer';
import coordenador from './coordenador/reducer';
import listaparticipante from './listaparticipante/reducer';

export default combineReducers({
  auth,
  usuario,
  curso,
  evento,
  local,
  coordenador,
  listaparticipante,
});
