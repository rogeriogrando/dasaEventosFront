export function loadParticipantes(evento) {
  return {
    type: '@listaparticipante/LOAD_PARTICIPANTE_SUCCESS',
    payload: { evento },
  };
}

export function confirmaParticipantes(evento) {
  return {
    type: '@listaparticipante/CONFIRMA_PARTICIPANTE_SUCCESS',
    payload: { evento },
  };
}

export function desConfirmaParticipantes(evento) {
  return {
    type: '@listaparticipante/DESCONFIRMA_PARTICIPANTE_SUCCESS',
    payload: { evento },
  };
}
