import React from 'react';
import { Container } from './styles';
import Header from '~/components/Header';
import admcard from '~/assets/admcard.jpg'
import agrocard from '~/assets/agrocard.jpg'
import cccard from '~/assets/cccard.jpg'
import direitocard from '~/assets/direitocard.jpg'
import enfcard from '~/assets/enfcard.jpg'
import psiccard from '~/assets/psiccard.jpg'

export default function Cursos() {
  return (
    <>
      <Header />
      <Container>
        <ul key="adm">
          <img src={admcard} alt="admcard" />
        </ul>
        <ul key="adm">
          <img src={agrocard} alt="agrocard" />
        </ul>
        <ul key="adm">
          <img src={cccard} alt="cccard" />
        </ul>
        <ul key="adm">
          <img src={direitocard} alt="direitocard" />
        </ul>
        <ul key="adm">
          <img src={enfcard} alt="enfcard" />
        </ul>
        <ul key="adm">
          <img src={psiccard} alt="psiccard" />
        </ul>
      </Container>
    </>
  );
}
