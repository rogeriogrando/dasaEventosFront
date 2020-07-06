import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, CardColumns, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Header from '~/components/Header';

import api from '~/services/api';

import { Container, FormModal } from './styles';

export default function CadCertificados() {
  const { register } = useForm();
  const [loadCertificados, setLoadCertificados] = useState([]);
  const [showEditar, setShowEditar] = useState(false);
  const [showNovo, setShowNovo] = useState(false);
  const [selectFilde, setSelectFilde] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [modelo, setModelo] = useState([]);
  const [descricao, setDescricao] = useState(null);
  const handleCloseEditar = () => setShowEditar(false);
  const handleCloseNovo = () => setShowNovo(false);
  const handleCloseLoad = () => setShowLoad(false);
  const [ativo, setAtivo] = useState(true);
  const [padrao, setPadrao] = useState(false);
  const profile = useSelector(state => state.usuario.profile);
  const [showLoad, setShowLoad] = useState(false);

  async function handleShowEditar(data) {
    try {
      setShowEditar(true);
      setModelo(data);
      setAtivo(data.ativo);
      setPadrao(data.padrao);
    } catch (err) {
      alert('Erro ao editar, tente novamente.');
    }
  }

  async function handleAtivo(e) {
    modelo.ativo ? setAtivo(false) : setAtivo(true);
  }

  async function handlePadrao(e) {
    modelo.padrao ? setPadrao(false) : setPadrao(true);
  }

  async function handleShowNovo() {
    try {
      setShowNovo(true);
    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.');
    }
  }

  useEffect(() => {
    async function loadCertificados() {
      const response = await api.get('modelos');
      setModelos(response.data);
    }
    loadCertificados();
  }, [loadCertificados]);

  async function handleFileUpload() {
    const certificado = new FormData();
    certificado.append('file', selectFilde);
    certificado.append('ativo', ativo);
    certificado.append('descricao', descricao.descricao);
    certificado.append('padrao', padrao);
    await api.post('modelos', certificado);
    handleCloseNovo();
    const modelos = await api.get('modelos');
    setLoadCertificados(modelos.data);
  }

  async function handleEditarFileUpload() {
    const certificado = new FormData();
    certificado.append('file', selectFilde);
    certificado.append('ativo', ativo);
    certificado.append('descricao', modelo.descricao);
    certificado.append('padrao', padrao);
    await api.put(`modelos/${modelo.id}`, certificado);
    handleCloseEditar();
    const modelos = await api.get('modelos');
    setLoadCertificados(modelos.data);
  }

  async function handleValidaCertificado(id) {
    setShowLoad(true);
    const validaCert = await api.post(`validacertificados/${id}`);
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

  return (
    <>
      <Header />
      <Container>
        <CardColumns className="box">
          <Form>
            <Button
              className="novocertificado"
              variant="primary"
              onClick={() => handleShowNovo()}
            >
              Cadastrar um novo certificado
            </Button>
          </Form>
        </CardColumns>
        <CardColumns className="box">
          {modelos.map(modelo => (
            <Card
              border="primary"
              bg="dark"
              text="light"
              style={{
                width: '20rem',
                marginLeft: 10,
              }}
            >
              <Card.Header>{modelo.descricao}</Card.Header>
              <Card.Img variant="top" src={modelo.url} />
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => handleValidaCertificado(modelo.id)}
                >
                  Validar leioute
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => handleShowEditar(modelo)}
                >
                  Editar
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
            <Modal.Title>Cadastro de certificado</Modal.Title>
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
              id="certificado"
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
            <Form.Group
              controlId="formBasicCheckbox"
              id="formGridCheckboxAtiv"
              style={{
                display: 'flex',
              }}
            >
              <label style={{ marginTop: 3 }}>Padrão</label>
              <Form.Check
                style={{ marginLeft: 10 }}
                name="Padrão"
                type="checkbox"
                defaultChecked={modelo.padrao}
                onClick={e => handlePadrao(e.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicCheckbox"
              id="formGridCheckboxAtiv"
              style={{
                display: 'flex',
              }}
            >
              <label style={{ marginTop: 3 }}>Ativo</label>
              <Form.Check
                style={{ marginLeft: 10 }}
                name="Ativo"
                type="checkbox"
                defaultChecked={ativo}
                onClick={e => handleAtivo(ativo)}
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
            <Modal.Title>Cadastro de certificado</Modal.Title>
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
              id="certificado"
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
                value={modelo.descricao}
                placeholder={modelo.descricao}
                onChange={e =>
                  setModelo({ ...modelo, descricao: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicCheckbox"
              id="formGridCheckboxAtiv"
              style={{
                display: 'flex',
              }}
            >
              <label style={{ marginTop: 3 }}>Padrão</label>
              <Form.Check
                style={{ marginLeft: 10 }}
                name="Padrão"
                type="checkbox"
                value={modelo.padrao}
                defaultChecked={modelo.padrao}
                onClick={e => handlePadrao(modelo.padrao)}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicCheckbox"
              id="formGridCheckboxAtiv"
              style={{
                display: 'flex',
              }}
            >
              <label style={{ marginTop: 3 }}>Ativo</label>
              <Form.Check
                style={{ marginLeft: 10 }}
                name="Ativo"
                type="checkbox"
                value={modelo.ativo}
                defaultChecked={modelo.ativo}
                onChange={e => handleAtivo(ativo)}
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

        <Modal
          className="formModalLoad"
          show={showLoad}
          onHide={handleCloseLoad}
        >
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
      </FormModal>
    </>
  );
}
