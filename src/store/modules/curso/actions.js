export function cursoUpRequest(nome) {
  return {
    type: '@curso/CURSO_UP_REQUEST',
    payload: { nome },
  };
}

export function updateCursoSuccess(curso) {
  return {
    type: '@curso/UPDATE_CURSO_SUCCESS',
    payload: { curso },
  };
}

export function updateCursoRequest(curso) {
  return {
    type: '@curso/UPDATE_CURSO_REQUEST',
    payload: { curso },
  };
}

export function deleteCursoRequest(id) {
  return {
    type: '@curso/DELETE_CURSO_REQUEST',
    payload: { id },
  };
}

export function cursoFailure() {
  return {
    type: '@curso/CURSO_FAILURE',
  };
}
