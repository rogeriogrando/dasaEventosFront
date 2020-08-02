import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Figure, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import logo from '~/assets/logo.ico';

import { Container } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.usuario.profile);
  const [papeis, setPapeis] = useState(false);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const papel = profile.papel;
    if (papel === 'coordenador' || papel === 'admin') {
      setPapeis(true);
    } else {
      setPapeis(false);
    }
  }, [profile.papel]);

  function handleSignOut() {
    dispatch(signOut());
  }

  async function handleLoadCurso() {
    if (!cursos[0]) {
      const response = await api.get('cursos');
      setCursos(response.data);
    }
  }

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand>
          <Nav className="figure-img">
            <Figure.Image src={logo} />
          </Nav>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link key="profile" href="/profile">
              Perfil
            </Nav.Link>
            <Nav.Link key="meuseventos" href="/usuarioeventos">
              Meus eventos
            </Nav.Link>
            <Nav.Link key="meuscertificados" href="/usuariocertificados">
              Certificados
            </Nav.Link>
            {papeis && (
              <Nav.Link key="eventopresencas" href="/eventopresencas">
                Lista de presenças
              </Nav.Link>
            )}

            <NavDropdown
              key="cursos"
              title="Eventos"
              id="collasible-nav-dropdown"
              onClick={handleLoadCurso}
            >
              {cursos.map(curso => (
                <NavDropdown.Item
                  key={curso.id}
                  title="EventosCursos"
                  href={`/eventocursos?id=${curso.id}`}
                >
                  {curso.nome}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="todos" href={'/eventos'}>
                Todos
              </NavDropdown.Item>
            </NavDropdown>

            {papeis && (
              <NavDropdown
                key="cadastros"
                title="Cadastros"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item key="cadassinaturas" href="/cadassinaturas">
                  Assinaturas
                </NavDropdown.Item>
                <NavDropdown.Item key="cadcoord" href="/cadcoord">
                  Coordenador
                </NavDropdown.Item>
                <NavDropdown.Item key="cadcursos" href="/cadcursos">
                  Cursos
                </NavDropdown.Item>
                <NavDropdown.Item key="cadeventos" href="/cadeventos">
                  Eventos
                </NavDropdown.Item>
                <NavDropdown.Item
                  key="listaparticipantes"
                  href="/listaparticipantes"
                >
                  Lista de participantes
                </NavDropdown.Item>
                <NavDropdown.Item key="cadlocais" href="/cadlocais">
                  Local do evento
                </NavDropdown.Item>
                <NavDropdown.Item key="cadcertificados" href="/cadcertificados">
                  Modelos de Certificados
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="profile">
                Bem vindo: <a href="/profile">{profile.nome} </a>
              </Navbar.Text>
              <Button variant="info" onClick={handleSignOut} href="/">
                Sair
              </Button>
            </Navbar.Collapse>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
