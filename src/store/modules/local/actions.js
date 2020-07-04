export function localUpRequest(local) {
  return {
    type: '@local/LOCAL_UP_REQUEST',
    payload: local,
  };
}

export function updateLocalSuccess(local) {
  return {
    type: '@local/UPDATE_LOCAL_SUCCESS',
    payload: { local },
  };
}

export function updateLocalRequest(local) {
  return {
    type: '@local/UPDATE_LOCAL_REQUEST',
    payload: { local },
  };
}

export function deleteLocalRequest(id) {
  return {
    type: '@local/DELETE_LOCAL_REQUEST',
    payload: { id },
  };
}

export function localFailure() {
  return {
    type: '@local/LOCAL_FAILURE',
  };
}
