import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Header from '~/components/Header';
import { Form, Input } from '@rocketseat/unform';
import {
  cursoUpRequest,
  updateCursoRequest,
  deleteCursoRequest,
} from '~/store/modules/curso/actions';
import api from '~/services/api';

import { Container, FormModal } from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome do curso é obrigatório'),
});

export default function CadCursos() {
  const [show, setShow] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [loadCursos, setLoadCursos] = useState([]);
  const [curso, setCurso] = useState([]);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  async function handleShow(data) {
    try {
      setShow(true);
      setCurso(data);
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  const dispatch = useDispatch();

  async function handleSubmit({ nome }) {
    dispatch(cursoUpRequest(nome));
    const response = await api.get('cursos');
    setLoadCursos(response.data);
  }

  async function editCurso({ curso }) {
    dispatch(updateCursoRequest(curso));
    const response = await api.get('cursos');
    setLoadCursos(response.data);
    setShow(false);
  }

  async function deleteCurso(id) {
    dispatch(deleteCursoRequest(id));
    const response = await api.get('cursos');
    setLoadCursos(response.data);
  }

  useEffect(() => {
    async function loadCursos() {
      const response = await api.get('cursos');
      setCursos(response.data);
    }
    loadCursos();
  }, [loadCursos]);

  return (
    <>
      <Header />
      <Container>
        <Form
          className="formGridCursoCad"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <label>Curso</label>
          <Input name="nome" placeholder="Digite o nome do curso" />

          <Button className="btnGravarCurso" variant="primary" type="submit">
            Gravar curso novo
          </Button>
        </Form>
        {cursos.map(curso => (
          <ul key={curso.id}>
            <h1> {curso.nome}</h1>
            <Button
              className="btnEditCurso"
              variant="primary"
              onClick={() => handleShow(curso)}
            >
              Editar
            </Button>
            <Button
              className="btnEditCurso"
              variant="danger"
              type="submit"
              onClick={() => deleteCurso(curso.id)}
            >
              Excluir
            </Button>
          </ul>
        ))}
      </Container>
      <FormModal>
        <Modal className="formModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alteração de curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Nome do curso</label>
            <Input
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
              className="inputEditCurso"
              name="nome"
              placeholder={curso.nome}
              value={curso.nome}
              onChange={e => setCurso({ ...curso, nome: e.target.value })}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => editCurso({ curso })}>
              Gravar
            </Button>
          </Modal.Footer>
        </Modal>
      </FormModal>
    </>
  );
}
