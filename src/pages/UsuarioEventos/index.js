import React, { useEffect, useState } from 'react';
import { Form, Card, Button, Col, CardColumns } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';
import { naoParticiparEventoRequest } from '~/store/modules/evento/actions';

export default function UsuarioEventos() {
  const [loadEventos, setLoadEventos] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function loadEventos() {
      const response = await api.get('usuarioeventos');
      setEventos(response.data);
    }
    loadEventos();
  }, [loadEventos]);

  async function handleNaoParticipar(id) {
    dispatch(naoParticiparEventoRequest(id));
    const response = await api.get('usuarioeventos');
    setLoadEventos(response.data);
    try {
    } catch (err) {
      alert('Não foi possível cadastrar sua participação.');
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
                width: '20rem',
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
                  <Card.Text style={{ fontSize: 16, textAlign: 'justify' }}>
                    {evento.descricao}
                  </Card.Text>
                  <Card.Text style={{ color: '#fff123', fontSize: 16 }}>
                    {evento.data}
                  </Card.Text>
                  <Card.Text style={{ color: '#fff123', fontSize: 16 }}>
                    Das {evento.horaini} às {evento.horafim} hs
                  </Card.Text>
                </Card.Body>
                <Form.Group as={Col} className="botoes">
                  <Form.Row>
                    <Card.Footer>
                      <Button
                        variant="outline-warning"
                        onClick={() => handleNaoParticipar(evento.id)}
                      >
                        Cancelar participação
                      </Button>
                    </Card.Footer>
                  </Form.Row>
                </Form.Group>
              </blockquote>
            </Card>
          ))}
        </CardColumns>
      </Container>
    </>
  );
}
