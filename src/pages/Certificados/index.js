import React, { useEffect, useState } from 'react';
import { Form, Card, Button, Col, Modal, CardColumns } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';

export default function Certificados() {
  const [eventos, setEventos] = useState([]);
  const [showLoad, setShowLoad] = useState(false);
  const handleCloseLoad = () => setShowLoad(false);

  const profile = useSelector(state => state.usuario.profile);

  useEffect(() => {
    async function loadDados() {
      const response = await api.get('certificados');
      setEventos(response.data);
    }
    loadDados();
  }, []);

  async function handleGeraCertificado(id, modelo_id) {
    if (modelo_id === null) {
      toast.error('Modelo de certificado não cadastrado.!');
    } else {
      setShowLoad(true);
      const validaCert = await api.post(`certificados/${id}`);
      window.setTimeout(function() {
        fetch(validaCert.data.url).then(response => {
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `certificado${profile.id}-${id}.pdf`;
            a.click();
          });
        });
        setShowLoad(false);
      }, 3000);
    }
  }

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
                </Card.Body>
                <Form.Group as={Col} className="botoes">
                  <Form.Row>
                    <Card.Footer>
                      <Button
                        style={{ width: 220 }}
                        variant="primary"
                        onClick={() =>
                          handleGeraCertificado(evento.id, evento.modelo_id)
                        }
                      >
                        Gerar certificado
                      </Button>
                    </Card.Footer>
                  </Form.Row>
                </Form.Group>
              </blockquote>
            </Card>
          ))}
        </CardColumns>
      </Container>

      <Modal className="formModalLoad" show={showLoad} onHide={handleCloseLoad}>
        <Modal.Body
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <h1>Gerarndo certificado, aguarde!!!</h1>
        </Modal.Body>
      </Modal>
    </>
  );
}
