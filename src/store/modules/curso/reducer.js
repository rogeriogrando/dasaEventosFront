import produce from 'immer';

const INITIAL_STATE = {
  nome: [],
  curso: null,
  id: null,
};

export default function curso(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@curso/CURSO_UP_REQUEST': {
        draft.nome = action.payload.nome;
        break;
      }
      case '@curso/UPDATE_CURSO_SUCCESS': {
        draft.curso = action.payload.curso;
        break;
      }
      case '@curso/UPDATE_CURSO_REQUEST': {
        draft.curso = action.payload.curso;
        break;
      }
      case '@curso/DELETE_CURSO_REQUEST': {
        draft.id = action.payload.id;
        break;
      }
      case '@curso/CURSO_FAILURE': {
        break;
      }
      default:
    }
  });
}
