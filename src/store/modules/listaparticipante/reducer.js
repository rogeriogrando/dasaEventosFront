import produce from 'immer';

const INITIAL_STATE = {
  evento: null,
};

export default function loadParticipantes(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@listaparticipante/LOAD_PARTICIPANTE_SUCCESS': {
        draft.evento = action.payload.evento;
        break;
      }
      default:
    }
  });
}
