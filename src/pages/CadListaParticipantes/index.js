import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import api from '~/services/api';
import { useForm } from 'react-hook-form';
import { Container, FormModal } from './styles';
import Header from '~/components/Header';

export default function CadListaParticipantes() {
  const [participantes, setParticipantes] = useState([]);
  const [showNovo, setShowNovo] = useState(false);
  const [selectFilde, setSelectFilde] = useState([]);
  const handleCloseNovo = () => setShowNovo(false);
  const { register } = useForm();

  const [showLoad, setShowLoad] = useState(false);
  const handleCloseLoad = () => setShowLoad(false);

  useEffect(() => {
    async function loadParticipantes() {
      const evento = window.location.pathname.split('/')[2];
      const response = await api.get(`listaparticipantes/${evento}`);
      setParticipantes(response.data);
    }
    loadParticipantes();
  }, []);

  async function handleShowNovo() {
    try {
      setShowNovo(true);
    } catch (err) {
      alert('Erro ao cadastrar, tente novamente.');
    }
  }

  async function handleGeraListaCertificado() {
    setShowLoad(true);
    const evento = window.location.pathname.split('/')[2];
    const blob = await api.get(`geralistacertificados/${evento}`, {
      responseType: 'arraybuffer',
    });

    var newBlob = new Blob([blob.data], { type: 'application/pdf' });
    const data = window.URL.createObjectURL(newBlob);
    window.open(data, '_blank');
    setShowLoad(false);
  }

  async function handleFileUpload() {
    const evento = window.location.pathname.split('/')[2];
    const participantes = new FormData();
    participantes.append('name', 'file');
    participantes.append('evento_id', evento);
    participantes.append('file', selectFilde);
    await api.post('listaparticipantes', participantes);
    handleCloseNovo();
    const response = await api.get(`listaparticipantes/${evento}`);
    setParticipantes(response.data);
  }

  return (
    <>
      <Header />
      <Container>
        <Button
          className="novaassinatura"
          variant="primary"
          onClick={() => handleShowNovo()}
        >
          Cadastrar nova lista de participantes
        </Button>{' '}
        <Button
          style={{ width: 220 }}
          variant="success"
          onClick={() => handleGeraListaCertificado()}
        >
          Gerar certifocados
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Participantes</th>
            </tr>
          </thead>
          {participantes.map(participante => (
            <tbody>
              <th>{participante.nome}</th>
            </tbody>
          ))}
        </Table>
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
              id="arqcsv"
              name="csv"
              onChange={e => setSelectFilde(e.target.files[0])}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={handleFileUpload}>
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
            <h2>Gerando lista de certificado, aguarde!!!</h2>
          </Modal.Body>
        </Modal>
      </FormModal>
    </>
  );
}
