import React, { useEffect, useState } from 'react';
import { Card, Button, CardColumns } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';
import { loadParticipantes } from '~/store/modules/listaparticipante/actions';

export default function EventoPresencas() {
  const [eventos, setEventos] = useState([]);

  const [papeis, setPapeis] = useState(false);
  const profile = useSelector(state => state.usuario.profile);

  useEffect(() => {
    const papel = profile.papel;
    if (papel === 'coordenador' || papel === 'admin') {
      setPapeis(true);
    } else {
      dispatch(signOut());
    }
  }, [profile.papel]);

  useEffect(() => {
    async function eventos() {
      const response = await api.get('presencas');
      setEventos(response.data.eventos);
    }
    eventos();
  }, []);

  async function handleParticipantes(id) {
    try {
      dispatch(loadParticipantes(id));
    } catch (err) {
      console.tron.log(err);
      alert('Não foi possível encontrar evento.');
    }
  }
  const dispatch = useDispatch();

  return (
    <>
      <Header />
      <Container>
        <CardColumns className="box">
          {eventos.map(evento => (
            <Card
              border="primary"
              bg="dark"
              text="light"
              key={evento.id}
              style={{
                width: '15rem',
                marginLeft: 10,
              }}
            >
              <blockquote className="blockquote mb-0 card-body ">
                <Card.Header style={{ color: '#3b9eff', fontSize: 18 }}>
                  {evento.titulo}
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{ fontSize: 18 }}>
                    {evento.palestrante}
                  </Card.Title>
                  <Card.Text style={{ color: '#fff123', fontSize: 16 }}>
                    {evento.data}
                  </Card.Text>
                  <Card.Text style={{ color: '#fff123', fontSize: 16 }}>
                    Das {evento.horaini} às {evento.horafim} hs
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleParticipantes(evento.id)}
                  >
                    Ver participantes
                  </Button>
                </Card.Footer>
              </blockquote>
            </Card>
          ))}
        </CardColumns>
      </Container>
    </>
  );
}
