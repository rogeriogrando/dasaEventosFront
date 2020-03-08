import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '~/assets/logo.ico';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.usuario.profile);
  const [papeis, setPapeis] = useState(false);

  useEffect(() => {
    const papel = profile.papel;
    if (papel === "coordenador" || papel === "admin") {
      setPapeis(true);
    } else {
      setPapeis(false);
    }
     
  }, []);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="faesb" />
          <Link to="/eventos">Todos os Eventos</Link>
        </nav>
        <nav>
        {papeis && <Link to="/admeditusuarios" className="nav-item nav-link">Admin</Link>}
        </nav>
        <nav>
          <Link to="/Cursos">Filtrar por Cursos</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.nome}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Rogerio Grando"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
