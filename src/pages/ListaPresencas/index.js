import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';
import {
  confirmaParticipantes,
  desConfirmaParticipantes,
} from '~/store/modules/listaparticipante/actions';

export default function ListaPresencas() {
  const [participantes, setParticipantes] = useState([]);
  const [loadParticipantes, setLoadParticipantes] = useState([]);

  const [papeis, setPapeis] = useState(false);
  const profile = useSelector(state => state.usuario.profile);
  const evento = useSelector(state => state.listaparticipante.evento);

  useEffect(() => {
    const papel = profile.papel;
    if (papel === 'coordenador' || papel === 'admin') {
      setPapeis(true);
    } else {
      dispatch(signOut());
    }
  }, [profile.papel]);

  useEffect(() => {
    async function participantes() {
      const response = await api.get(`presencas/${evento}`);
      setParticipantes(response.data.usuarioEvento);
    }
    participantes();
  }, [loadParticipantes]);

  async function handleStatusParticipante(id, presenca) {
    try {
      if (presenca) {
        dispatch(desConfirmaParticipantes(id));
      } else {
        dispatch(confirmaParticipantes(id));
      }
      const response = await api.get(`presencas/${evento}`);
      setLoadParticipantes(response.data);
    } catch (err) {
      alert('Não foi possível encontrar evento.');
    }
  }
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Container>
        {participantes.map(participante => (
          <ul key={participante.id}>
            <h1> {participante.usuario.nome}</h1>
            <Button
              className="btnEditCurso"
              variant="primary"
              onClick={() =>
                handleStatusParticipante(participante.id, participante.presenca)
              }
              style={{
                backgroundColor: participante.presenca ? '#238E23' : '#FF7F00',
              }}
            >
              {participante.presenca ? 'Confirmado' : 'Confirmar'}
            </Button>
          </ul>
        ))}
      </Container>
    </>
  );
}
