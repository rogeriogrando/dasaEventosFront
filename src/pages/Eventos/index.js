import React, { useEffect, useState } from 'react';
import { Form, Card, Button, Col, Modal, CardColumns } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';
import {
  updateEventoRequest,
  participarEventoRequest,
} from '~/store/modules/evento/actions';

export default function Eventos() {
  const [loadEventos, setLoadEventos] = useState([]);
  const [show, setShow] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [local, setLocal] = useState([]);
  const [assinaturas, setAssinaturas] = useState([]);

  const [ativo, setAtivo] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const handleCloseLoad = () => setShowLoad(false);

  const [papeis, setPapeis] = useState(false);
  const profile = useSelector(state => state.usuario.profile);
  const handleClose = () => setShow(false);

  useEffect(() => {
    async function loadAdm() {
      const papel = profile.papel;
      if (papel === 'coordenador' || papel === 'admin') {
        setPapeis(true);
        const modelos = await api.get('modelos');
        setModelos(modelos.data);
        const assinaturas = await api.get('assinaturas');
        setAssinaturas(assinaturas.data);
      } else {
        setPapeis(false);
      }
    }
    loadAdm();
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
      const response = await api.get('eventos');
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
    console.tron.log(evento);
    dispatch(updateEventoRequest(evento));
    const response = await api.get('eventos');
    setLoadEventos(response.data);
    setShow(false);
  }

  async function handleAtivo(e) {
    ativo ? setAtivo(false) : setAtivo(true);
  }

  async function handleValidaCertificado(id, modelo_id) {
    if (modelo_id === null) {
      toast.error('Modelo de certificado não cadastrado.!');
    } else {
      setShowLoad(true);
      const validaCert = await api.get(`validacertificados/${id}`);
      window.setTimeout(function() {
        fetch(validaCert.data.url).then(response => {
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `certificado${profile.id}.pdf`;
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
                        style={{ width: 220 }}
                        variant="primary"
                        onClick={() => handleParticipar(evento.id)}
                      >
                        Quero participar
                      </Button>
                      {papeis && (
                        <>
                          <Button
                            style={{ width: 220 }}
                            variant="outline-success"
                            onClick={() =>
                              handleValidaCertificado(
                                evento.id,
                                evento.modelo_id
                              )
                            }
                          >
                            Validar certificado
                          </Button>

                          <Button
                            style={{ width: 220 }}
                            variant="outline-warning"
                            onClick={() => handleShow(evento)}
                          >
                            Editar
                          </Button>
                        </>
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
                  setEvento({ ...evento, curso_id: e.target.value || null })
                }
                as="select"
              >
                <option value="">Todos</option>
                {cursos.map(curso => (
                  <option value={curso.id} key={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCurso">
              <Form.Label>Modelos</Form.Label>
              <Form.Control
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                name="modelo_id"
                value={evento.modelo_id}
                onChange={e =>
                  setEvento({ ...evento, modelo_id: e.target.value || null })
                }
                as="select"
              >
                <option value="">Não selecionado</option>
                {modelos.map(modelo => (
                  <option value={modelo.id} key={modelo.id}>
                    {modelo.descricao}
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
                <option> {evento.nome} </option>
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
              className="inputEditDescricao"
              name="descricao"
              placeholder={evento.descricao}
              value={evento.descricao}
              onChange={e =>
                setEvento({ ...evento, descricao: e.target.value })
              }
              as="textarea"
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Control
              style={{
                color: '#fff',
                backgroundColor: '#444',
                borderRadius: 4,
                height: 110,
              }}
              name="dizeres"
              value={evento.dizeres}
              onChange={e => setEvento({ ...evento, dizeres: e.target.value })}
              as="textarea"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAssinatura">
              <Form.Control
                name="assinatura_left_id"
                value={evento.assinatura_left_id}
                onChange={e =>
                  setEvento({
                    ...evento,
                    assinatura_left_id: e.target.value || null,
                  })
                }
                as="select"
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
              >
                <option value="">Ass. Esquerda</option>
                {assinaturas.map(assinatura => (
                  <option value={assinatura.id} key={assinatura.id}>
                    {assinatura.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAssinatura">
              <Form.Control
                name="assinatura_center_id"
                value={evento.assinatura_center_id}
                onChange={e =>
                  setEvento({
                    ...evento,
                    assinatura_center_id: e.target.value || null,
                  })
                }
                as="select"
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
              >
                <option value="">Ass. Centro</option>
                {assinaturas.map(assinatura => (
                  <option value={assinatura.id} key={assinatura.id}>
                    {assinatura.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAssinatura">
              <Form.Control
                name="assinatura_right_id"
                value={evento.assinatura_right_id}
                onChange={e =>
                  setEvento({
                    ...evento,
                    assinatura_right_id: e.target.value || null,
                  })
                }
                as="select"
                style={{
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
              >
                <option value="">Ass. Direita</option>
                {assinaturas.map(assinatura => (
                  <option value={assinatura.id} key={assinatura.id}>
                    {assinatura.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group
            id="formGridCheckboxAtiv"
            style={{
              display: 'flex',
            }}
          >
            <label style={{ marginTop: 3 }}>Ativo</label>
            <Form.Check
              style={{ marginLeft: 10 }}
              name="ativo"
              type="checkbox"
              value={evento.ativo}
              defaultChecked={evento.ativo}
              onChange={e =>
                setEvento({
                  ...evento,
                  ativo: ativo,
                  ativo: handleAtivo(evento.ativo),
                })
              }
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
