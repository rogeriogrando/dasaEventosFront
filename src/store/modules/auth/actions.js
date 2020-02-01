export function signInRequest(email, pass) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, pass },
  };
}

export function signInSuccess(token, usuario) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, usuario },
  };
}

export function signUpRequest(nome, email, pass) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { nome, email, pass },
  };
}

export function signUpLoading() {
  return {
    type: '@auth/SIGN_UP_LOADING',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
