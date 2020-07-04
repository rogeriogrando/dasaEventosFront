import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from '~/components/Header';
import {
  updateCoordenadorRequest,
  deleteCoordenadorRequest,
} from '~/store/modules/coordenador/actions';

import api from '~/services/api';

import { Container } from './styles';

export default function CadCursos() {
  const [show, setShow] = useState(false);
  const [coordenador, setCoordenador] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [papel, setPapel] = useState('');
  const [coordenadores, setCoordenadores] = useState([]);
  const [loadCoordenadores, setLoadCoordenadores] = useState([]);
  const handleClose = () => setShow(false);

  async function handleShow(data) {
    try {
      setShow(true);
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateCoordenadorRequest(email));
    const response = await api.get('coordenador');
    setLoadCoordenadores(response.data);
  }

  async function deleteCoordenador(id) {
    dispatch(deleteCoordenadorRequest(id));
    const response = await api.get('coordenador');
    setLoadCoordenadores(response.data);
  }

  useEffect(() => {
    async function loadCoordenadores() {
      const response = await api.get('coordenador');
      setCoordenadores(response.data.usuarios);
    }
    loadCoordenadores();
  }, [loadCoordenadores]);

  return (
    <>
      <Header />
      <Container>
        <Form.Label className="titulo">Coordenadores</Form.Label>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                name="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Digíte E-Mail"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                className="btnGravarLocal"
                variant="primary"
                type="submit"
              >
                Adicionar
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        {coordenadores.map(coordenador => (
          <ul key={coordenador.id}>
            <h1> {coordenador.nome}</h1>
            <Button
              className="btnEditLocal"
              variant="primary"
              onClick={() => handleShow(coordenador)}
            >
              Editar
            </Button>
            <Button
              className="btnEditLocal"
              variant="danger"
              type="submit"
              onClick={() => {
                deleteCoordenador(coordenador.id);
              }}
            >
              Excluir
            </Button>
          </ul>
        ))}
      </Container>

      <Modal className="formModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alteração de local</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Nome</label>
          <Form.Control
            style={{
              display: 'flex',
              border: 10,
              color: '#fff',
              backgroundColor: '#000',
              opacity: 0.6,
              borderRadius: 4,
              width: 465,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            className="inputEditLocal"
            name="nome"
            placeholder={coordenador.nome}
            value={coordenador.nome}
            onChange={e => setNome({ ...coordenador, nome: e.target.value })}
          />
          <label>E-Mail</label>
          <Form.Control
            style={{
              display: 'flex',
              border: 10,
              color: '#fff',
              backgroundColor: '#000',
              opacity: 0.6,
              borderRadius: 4,
              width: 465,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
              marginBottom: 10,
            }}
            className="inputEditDescricao"
            name="email"
            placeholder={coordenador.email}
            value={coordenador.email}
            onChange={e => setEmail({ ...coordenador, email: e.target.value })}
          />
          <label>Capacidade</label>
          <Form.Control
            style={{
              display: 'flex',
              border: 10,
              color: '#fff',
              backgroundColor: '#000',
              opacity: 0.6,
              borderRadius: 4,
              width: 465,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
            className="inputEditCapacidade"
            type="number"
            name="papel"
            placeholder={coordenador.papel}
            value={coordenador.papel}
            onChange={e => setPapel({ ...coordenador, papel: e.target.value })}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Gravar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
