import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  papel: null,
};

export default function usuario(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@user/UPDATE_PROFILE_FAILURE': {
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.usuario;
        draft.papel = action.payload.usuario.papel;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.papel = null;
        break;
      }
      default:
    }
  });
}
