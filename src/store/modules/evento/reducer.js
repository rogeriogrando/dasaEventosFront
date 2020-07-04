import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function evento(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@eveto/EVENTO_CREATE_REQUEST': {
        draft.data = action.payload.data;
        break;
      }
      case '@eveto/EVENTO_SUCCESS': {
        draft.data = action.payload.data;
        break;
      }
      case '@evento/UPDATE_EVENTO_SUCCESS': {
        draft.evento = action.payload.evento;
        break;
      }
      case '@evento/PARTICIPAR_EVENTO_SUCCESS': {
        draft.evento = action.payload.evento;
        break;
      }
      case '@evento/NAOPARTICIPAR_EVENTO_SUCCESS': {
        draft.evento = action.payload.evento;
        break;
      }
      case '@evento/UPDATE_EVENTO_REQUEST': {
        draft.evento = action.payload.evento;
        break;
      }
      default:
    }
  });
}
