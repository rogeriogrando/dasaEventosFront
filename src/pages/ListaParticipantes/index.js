import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';

export default function ListaParticipantes() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function loadEventos() {
      const response = await api.get('todoseventos');
      setEventos(response.data);
    }
    loadEventos();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Nome do evento</th>
              <th>Data</th>
            </tr>
          </thead>
          {eventos.map(evento => (
            <tbody key={evento.id}>
              <tr>
                <th>{evento.titulo}</th>
                <th>{evento.data}</th>
                <th>
                  <Link
                    key={evento.id}
                    to={'/cadlistaparticipantes/' + evento.id}
                  >
                    Participantes
                  </Link>
                </th>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </>
  );
}
