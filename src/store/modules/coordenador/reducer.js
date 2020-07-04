import produce from 'immer';

const INITIAL_STATE = {
  coordenador: [],
};

export default function coordenador(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@coordenador/COORDENADOR_UP_REQUEST': {
        draft.coordenador = action.payload.coordenador;
        break;
      }
      case '@coordenador/UPDATE_COORDENADOR_SUCCESS': {
        draft.coordenador = action.payload.coordenador;
        break;
      }
      case '@coordenador/UPDATE_COORDENADOR_REQUEST': {
        draft.coordenador = action.payload.coordenador;
        break;
      }
      case '@coordenador/DELETE_COORDENADOR_REQUEST': {
        draft.id = action.payload.id;
        break;
      }
      case '@coordenador/COORDENADOR_FAILURE': {
        break;
      }
      default:
    }
  });
}
