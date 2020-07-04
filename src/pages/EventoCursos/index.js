import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Form, Card, Button, Col, Modal, CardColumns } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';
import {
  updateEventoRequest,
  participarEventoRequest,
} from '~/store/modules/evento/actions';

export default function EventoCursos(props) {
  const [loadEventos, setLoadEventos] = useState([]);
  const [show, setShow] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [local, setLocal] = useState([]);

  const [ativo, setAtivo] = useState(true);

  const [papeis, setPapeis] = useState(false);
  const profile = useSelector(state => state.usuario.profile);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const papel = profile.papel;
    if (papel === 'coordenador' || papel === 'admin') {
      setPapeis(true);
    } else {
      setPapeis(false);
    }
  }, [profile.papel]);

  useEffect(() => {
    async function loadDados() {
      const cursos = await api.get('cursos');
      setCursos(cursos.data);
      const local = await api.get('locais');
      setLocal(local.data);
    }
    loadDados();
  }, []);

  useEffect(() => {
    async function loadEventos() {
      const { id } = queryString.parse(props.location.search);
      const response = await api.get(`eventos/${id}`);
      setEventos(response.data);
    }
    loadEventos();
  }, [loadEventos]);

  async function handleShow(data) {
    try {
      setShow(true);
      setEvento(data);
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  async function handleParticipar(id) {
    dispatch(participarEventoRequest(id));
    const response = await api.get('eventos');
    setLoadEventos(response.data);
    try {
    } catch (err) {
      alert('Não foi possível cadastrar sua participação.');
    }
  }
  const dispatch = useDispatch();

  async function handleUpdate(evento) {
    dispatch(updateEventoRequest(evento));
    const response = await api.get('eventos');
    setLoadEventos(response.data);
    setShow(false);
  }

  async function handleAtivo(e) {
    ativo ? setAtivo(false) : setAtivo(true);
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
                  <Card.Text style={{ color: '#fff123', fontSize: 16 }}>
                    Das {evento.horaini} às {evento.horafim} hs
                  </Card.Text>
                  <Card.Text style={{ fontSize: 16, textAlign: 'justify' }}>
                    Vagas restantes: {evento.restante}
                  </Card.Text>
                </Card.Body>
                <Form.Group as={Col} className="botoes">
                  <Form.Row>
                    <Card.Footer>
                      <Button
                        variant="primary"
                        onClick={() => handleParticipar(evento.id)}
                      >
                        Quero participar
                      </Button>
                      {papeis && (
                        <Button
                          variant="outline-warning"
                          onClick={() => handleShow(evento)}
                        >
                          Editar
                        </Button>
                      )}
                    </Card.Footer>
                  </Form.Row>
                </Form.Group>
              </blockquote>
            </Card>
          ))}
        </CardColumns>
      </Container>

      <Modal className="formModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alteração do Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridData">
              <Form.Label>Data</Form.Label>
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="data"
                value={evento.data_orig}
                onChange={e =>
                  setEvento({ ...evento, data_orig: e.target.value })
                }
                required
                type="date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHoraIni">
              <Form.Label>Hora inicial</Form.Label>
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="horaini"
                placeholder={evento.horaini}
                value={evento.horaini}
                type="time"
                onChange={e =>
                  setEvento({ ...evento, horaini: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHoraFim">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="horafim"
                required
                value={evento.horafim}
                type="time"
                onChange={e =>
                  setEvento({ ...evento, horafim: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCurso">
              <Form.Label>Cursos</Form.Label>
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="curso_id"
                value={evento.curso_id}
                onChange={e =>
                  setEvento({ ...evento, curso_id: e.target.value })
                }
                as="select"
              >
                <option>Todos</option>
                {cursos.map(curso => (
                  <option value={curso.id} key={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridSala">
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="local_id"
                onChange={e =>
                  setEvento({ ...evento, local_id: e.target.value })
                }
                as="select"
              >
                <option>Local não definido</option>
                {local.map(local => (
                  <option value={local.id} key={local.id}>
                    {local.nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              style={{
                color: '#fff',
                backgroundColor: '#444',
                borderRadius: 4,
              }}
              name="palestrante"
              placeholder={evento.palestrante}
              value={evento.palestrante}
              onChange={e =>
                setEvento({ ...evento, palestrante: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              style={{
                color: '#fff',
                backgroundColor: '#444',
                borderRadius: 4,
              }}
              name="titulo"
              value={evento.titulo}
              onChange={e => setEvento({ ...evento, titulo: e.target.value })}
              placeholder="Título do evento"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              style={{
                color: '#fff',
                backgroundColor: '#444',
                borderRadius: 4,
              }}
              className="inputEditLocal"
              name="descricao"
              placeholder={evento.descricao}
              value={evento.descricao}
              onChange={e =>
                setEvento({ ...evento, descricao: e.target.value })
              }
              as="textarea"
            />
          </Form.Group>

          <Form.Group id="formGridCheckboxAtiv">
            <Form.Check
              style={{
                width: 20,
                marginleft: 40,
                marginright: 140,
                height: 20,
              }}
              name="ativo"
              label="Ativo"
              value={evento.ativo}
              type="checkbox"
              defaultChecked={ativo}
              onClick={e => handleAtivo(ativo)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate(evento);
            }}
          >
            Gravar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
