export function createEventoRequest(data) {
  return {
    type: '@evento/EVENTO_CREATE_REQUEST',
    payload: { data },
  };
}

export function cretaeEventoSuccess(data) {
  return {
    type: '@evento/EVENTO_CREATE_SUCCESS',
    payload: { data },
  };
}

export function cretaeEventoFailure() {
  return {
    type: '@evento/EVENTO_CREATE_FAILURE',
  };
}

export function updateEventoSuccess(evento) {
  return {
    type: '@evento/UPDATE_EVENTO_SUCCESS',
    payload: { evento },
  };
}

export function updateEventoRequest(evento) {
  return {
    type: '@evento/UPDATE_EVENTO_REQUEST',
    payload: { evento },
  };
}

export function participarEventoRequest(evento) {
  return {
    type: '@evento/PARTICIPAR_EVENTO_REQUEST',
    payload: { evento },
  };
}

export function naoParticiparEventoRequest(evento) {
  return {
    type: '@evento/NAOPARTICIPAR_EVENTO_REQUEST',
    payload: { evento },
  };
}

export function eventoFailure() {
  return {
    type: '@evento/EVENTO_FAILURE',
  };
}
