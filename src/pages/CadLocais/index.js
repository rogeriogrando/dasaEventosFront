import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from '~/components/Header';
import {
  localUpRequest,
  updateLocalRequest,
  deleteLocalRequest,
} from '~/store/modules/local/actions';

import api from '~/services/api';

import { Container } from './styles';

export default function CadLocais() {
  const [show, setShow] = useState(false);
  const [locais, setLocais] = useState([]);
  const [loadLocais, setLoadLocais] = useState([]);
  const [local, setLocal] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capacidade, setCapacidade] = useState(0);

  const handleClose = () => setShow(false);

  async function handleShow(data) {
    try {
      setShow(true);
      setLocal(data);
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const local = {
      nome,
      descricao,
      capacidade,
    };
    dispatch(localUpRequest(local));
    const response = await api.get('locais');
    setLoadLocais(response.data);
  }

  async function handleUpdate(local) {
    dispatch(updateLocalRequest(local));
    const response = await api.get('locais');
    setLoadLocais(response.data);
    setShow(false);
  }

  async function handleDelete(id) {
    console.tron.log(id);
    dispatch(deleteLocalRequest(id));
    const response = await api.get('locais');
    setLoadLocais(response.data);
  }

  useEffect(() => {
    async function loadLocais() {
      const response = await api.get('locais');
      setLocais(response.data);
    }
    loadLocais();
  }, [loadLocais]);

  return (
    <>
      <Header />
      <Container>
        <Form.Label className="titulo">Locais</Form.Label>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                name="nome"
                onChange={e => setNome(e.target.value)}
                placeholder="Local ex.: Auditório A"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                name="descricao"
                as="textarea"
                onChange={e => setDescricao(e.target.value)}
                placeholder="Descrição ex.: Sala com projetor e sistema de som"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                name="capacidade"
                type="number"
                onChange={e => setCapacidade(e.target.value)}
                placeholder="Capacidade ex.: 120"
              />
            </Form.Group>

            <Button className="btnGravarLocal" variant="primary" type="submit">
              Gravar
            </Button>
          </Form.Row>
        </Form>
        {locais.map(local => (
          <ul key={local.id}>
            <h1> {local.nome}</h1>
            <Button
              className="btnEditLocal"
              variant="primary"
              onClick={() => handleShow(local)}
            >
              Editar
            </Button>
            <Button
              className="btnEditLocal"
              variant="danger"
              type="submit"
              onClick={() => {
                handleDelete(local.id);
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
          <label>Nome do curso</label>
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
            placeholder={local.nome}
            value={local.nome}
            onChange={e => setLocal({ ...local, nome: e.target.value })}
          />
          <label>Descrição</label>
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
            name="descricao"
            placeholder={local.descricao}
            value={local.descricao}
            onChange={e => setLocal({ ...local, descricao: e.target.value })}
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
            name="capacidade"
            placeholder={local.capacidade}
            value={local.capacidade}
            onChange={e => setLocal({ ...local, capacidade: e.target.value })}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate(local);
            }}
          >
            Gravar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
