import React from 'react';
import { Container } from './styles';
import Header from '~/components/Header';
import adm from '~/assets/adm.png';

export default function Cursos() {
  return (
    <>
      <Header />
      <Container>
        <ul key="adm">
          <img src={adm} alt="adm" />
          <strong>Administração</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
        <ul key="cont">
          <img src={adm} alt="adm" />
          <strong>Contábil</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
        <ul key="agr">
          <img src={adm} alt="adm" />
          <strong>Agronomia</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
        <ul key="adm">
          <img src={adm} alt="adm" />
          <strong>Administração</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
        <ul key="cont">
          <img src={adm} alt="adm" />
          <strong>Contábil</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
        <ul key="agr">
          <img src={adm} alt="adm" />
          <strong>Agronomia</strong>
          <button type="button" className="btn-acessar">
            Acessar Palestras
          </button>
        </ul>
      </Container>
    </>
  );
}
