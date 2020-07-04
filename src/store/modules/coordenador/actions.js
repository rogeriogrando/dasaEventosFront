export function updateCoordenadorSuccess(email) {
  return {
    type: '@coordenador/UPDATE_LOCAL_SUCCESS',
    payload: { email },
  };
}

export function updateCoordenadorRequest(email) {
  return {
    type: '@coordenador/UPDATE_LOCAL_REQUEST',
    payload: { email },
  };
}

export function deleteCoordenadorRequest(id) {
  return {
    type: '@coordenador/DELETE_LOCAL_REQUEST',
    payload: { id },
  };
}

export function coordenadorFailure() {
  return {
    type: '@coordenador/LOCAL_FAILURE',
  };
}
