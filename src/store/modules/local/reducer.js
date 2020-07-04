import produce from 'immer';

const INITIAL_STATE = {
  local: [],
};

export default function local(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@local/LOCAL_UP_REQUEST': {
        draft.local = action.payload.local;
        break;
      }
      case '@local/UPDATE_LOCAL_SUCCESS': {
        draft.local = action.payload.local;
        break;
      }
      case '@local/UPDATE_LOCAL_REQUEST': {
        draft.local = action.payload.local;
        break;
      }
      case '@local/DELETE_LOCAL_REQUEST': {
        draft.id = action.payload.id;
        break;
      }
      case '@local/LOCAL_FAILURE': {
        break;
      }
      default:
    }
  });
}
