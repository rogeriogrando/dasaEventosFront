import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, CardColumns, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Header from '~/components/Header';

import api from '~/services/api';

import { Container, FormModal } from './styles';

export default function CadAssinaturas() {
  const { register } = useForm();
  const [loadAssinatura, setLoadAssinatura] = useState([]);
  const [showEditar, setShowEditar] = useState(false);
  const [showNovo, setShowNovo] = useState(false);
  const [selectFilde, setSelectFilde] = useState([]);
  const [assinaturas, setAssinaturas] = useState([]);
  const [assinatura, setAssinatura] = useState([]);
  const [descricao, setDescricao] = useState(null);
  const handleCloseEditar = () => setShowEditar(false);
  const handleCloseNovo = () => setShowNovo(false);
  const profile = useSelector(state => state.usuario.profile);

  async function handleShowEditar(data) {
    try {
      setShowEditar(true);
      setAssinatura(data);
    } catch (err) {
      alert('Erro ao editar, tente novamente.');
    }
  }

  async function handleShowNovo() {
    try {
      setShowNovo(true);
    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.');
    }
  }

  useEffect(() => {
    async function loadAssinatura() {
      const response = await api.get('assinaturas');
      setAssinaturas(response.data);
    }
    loadAssinatura();
  }, [loadAssinatura]);

  async function handleFileUpload() {
    const modelo = new FormData();
    modelo.append('file', selectFilde);
    modelo.append('descricao', descricao.descricao);
    await api.post('assinaturas', modelo);
    handleCloseNovo();
    const assinaturas = await api.get('assinaturas');
    setLoadAssinatura(assinaturas.data);
  }

  async function handleEditarFileUpload() {
    const modelo = new FormData();
    modelo.append('file', selectFilde);
    modelo.append('descricao', assinatura.descricao);
    await api.put(`assinaturas/${assinatura.id}`, modelo);
    handleCloseEditar();
    const assinaturas = await api.get('assinaturas');
    setLoadAssinatura(assinaturas.data);
  }

  async function handleDelete(id) {
    try {
      console.tron.log(id);
      await api.delete(`assinaturas/${id}`);
      const assinaturas = await api.get('assinaturas');
      setLoadAssinatura(assinaturas.data);
      toast.success('Evento cadastrado com sucesso!');
    } catch (err) {
      toast.error('Essa assinatura esta em uso, não pode ser excluida!');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CardColumns className="box">
          <Form>
            <Button
              className="novaassinatura"
              variant="primary"
              onClick={() => handleShowNovo()}
            >
              Cadastrar nova assinatura
            </Button>
          </Form>
        </CardColumns>
        <CardColumns className="box">
          {assinaturas.map(assinatura => (
            <Card
              border="primary"
              bg="dark"
              text="light"
              style={{
                width: '20rem',
                marginLeft: 10,
              }}
            >
              <Card.Header>{assinatura.descricao}</Card.Header>
              <Card.Img variant="top" src={assinatura.url} />
              <Card.Footer>
                <Button
                  variant="outline-warning"
                  onClick={() => handleShowEditar(assinatura)}
                >
                  Editar
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(assinatura.id)}
                >
                  Excluir
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </CardColumns>
      </Container>
      <FormModal>
        <Modal
          className="formModalNovo"
          show={showNovo}
          onHide={handleCloseNovo}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de assinaturas</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <input
              ref={register}
              type="file"
              id="assinatura"
              accept="image/*"
              name="image"
              onChange={e => setSelectFilde(e.target.files[0])}
            />

            <Form.Group controlId="formGridAddress1">
              <Form.Control
                style={{
                  marginTop: 10,
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                className="inputEditLocal"
                name="descricao"
                placeholder="Descrição"
                onChange={e => setDescricao({ descricao: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleFileUpload}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="formModalEditar"
          show={showEditar}
          onHide={handleCloseEditar}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de assinaturas</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <input
              ref={register}
              type="file"
              id="assinaturas"
              accept="image/*"
              name="image"
              onChange={e => setSelectFilde(e.target.files[0])}
            />

            <Form.Group controlId="formGridAddress1">
              <Form.Control
                style={{
                  marginTop: 10,
                  color: '#fff',
                  backgroundColor: '#444',
                  borderRadius: 4,
                }}
                className="inputEditLocal"
                name="descricao"
                value={assinatura.descricao}
                placeholder={assinatura.descricao}
                onChange={e =>
                  setAssinatura({ ...assinatura, descricao: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={handleEditarFileUpload}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </FormModal>
    </>
  );
}
