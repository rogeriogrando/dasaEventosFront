import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '~/components/Header';
import { Form, Button, Col } from 'react-bootstrap';
import { createEventoRequest } from '~/store/modules/evento/actions';

import api from '~/services/api';

import { Container } from './styles';

export default function CadEventos() {
  const [local, setLocal] = useState([]);
  const [local_id, setSala] = useState();
  const [cursos, setCursos] = useState([]);
  const [modelo_id, setModelo] = useState();
  const [curso_id, setCurso] = useState(null);
  const [data, setData] = useState(new Date().toISOString());
  const [horaini, setHoraIni] = useState('');
  const [horafim, setHoraFim] = useState('');
  const [palestrante, setPalestrante] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dizeres, setDizeres] = useState(
    'A Faculdade de Ensino Superior Santa Bárbara certifica que #participante# participou do treinamento #evento#, ministrado por #palestrante# com a carga horária de #horas#, realizado no dia #data#.'
  );
  const [ativo, setAtivo] = useState(true);
  const [modelos, setModelos] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDados() {
      const cursos = await api.get('cursos');
      setCursos(cursos.data);
      const local = await api.get('locais');
      setLocal(local.data);
      const modelo = await api.get('modelos');
      setModelos(modelo.data);
    }
    loadDados();
  }, []);

  async function handleAtivo(e) {
    ativo ? setAtivo(false) : setAtivo(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const evento = {
      curso_id,
      local_id,
      modelo_id,
      data,
      horaini,
      horafim,
      palestrante,
      titulo,
      descricao,
      dizeres,
      ativo,
    };

    dispatch(createEventoRequest(evento));
  }

  return (
    <>
      <Header />
      <Container>
        <Form.Label className="titulo">Cadastro de Eventos</Form.Label>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridData">
              <Form.Label>Data</Form.Label>
              <Form.Control
                name="data"
                onChange={e => setData(e.target.value)}
                required
                type="date"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHoraIni">
              <Form.Label>Hora inicial</Form.Label>
              <Form.Control
                name="horaini"
                required
                type="time"
                onChange={e => setHoraIni(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridHoraFim">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control
                name="horafim"
                required
                type="time"
                onChange={e => setHoraFim(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCurso">
              <Form.Label>Cursos</Form.Label>
              <Form.Control
                name="curso_id"
                onChange={e => setCurso(e.target.value) || null}
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
                name="local_id"
                onChange={e => setSala(e.target.value) || null}
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
            <Form.Group as={Col} controlId="formGridModelo">
              <Form.Control
                name="modelo_id"
                onChange={e => setModelo(e.target.value) || null}
                as="select"
              >
                <option>Modelo de certificado</option>
                {modelos.map(modelo => (
                  <option value={modelo.id} key={modelo.id}>
                    {modelo.descricao}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              name="palestrante"
              onChange={e => setPalestrante(e.target.value)}
              placeholder="Nome completo do Palestrante"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              name="titulo"
              onChange={e => setTitulo(e.target.value)}
              placeholder="Título do evento"
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Control
              name="descricao"
              onChange={e => setDescricao(e.target.value)}
              as="textarea"
              placeholder="Descrição"
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Control
              style={{ height: 80 }}
              name="dizeres"
              value={dizeres}
              onChange={e => setDizeres(e.target.value)}
              as="textarea"
            />
          </Form.Group>

          <Form.Group id="formGridCheckboxAtiv">
            <Form.Check
              name="ativo"
              label="Ativo"
              type="checkbox"
              defaultChecked={ativo}
              onClick={e => handleAtivo(ativo)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>
      </Container>
    </>
  );
}
