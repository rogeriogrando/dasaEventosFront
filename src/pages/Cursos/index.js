import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Header from '~/components/Header';
import adm from '~/assets/adm.png'
import agro from '~/assets/agro.png'
import cont from '~/assets/cont.png'
import dir from '~/assets/dir.png'
import enf from '~/assets/enf.png'
import psi from '~/assets/psi.png'

export default function Cursos() {
  return (
    <>
      <Header />
      <Container>
        <ul key="adm">
          <Link to="/eventos">
            <img src={adm} alt="adm"/>          
          </Link>
        </ul>
        <ul key="agro">
          <Link to="/eventos">
            <img src={agro} alt="agro" />
          </Link>
        </ul>        
        <ul key="cont">
          <Link to="/eventos">
            <img src={cont} alt="cont" />
          </Link>
        </ul>
        <ul key="dir">
          <Link to="/eventos">
            <img src={dir} alt="dir" />
          </Link>
        </ul>
        <ul key="enf">
          <Link to="/eventos">
            <img src={enf} alt="enf" />
          </Link>
        </ul>
        <ul key="psi">
          <Link to="/eventos">
            <img src={psi} alt="psi" />
          </Link>
        </ul>
      </Container>
    </>
  );
}
