import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.ico';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="faesb" />
          <Link to="/eventos">Eventos</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Rogério Grando</strong>
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
