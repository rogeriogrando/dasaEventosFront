import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import { Container } from './styles';
import Header from '~/components/Header';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function loadEventos() {
      const response = await api.get('eventos');
      setEventos(response.data);
    }
    loadEventos();
  }, []);

  return (
    <>
      <Header />
      <Container>
        {eventos.map(evento => (
          <ul key={evento.id}>
              <strong>{evento.descricao}</strong>
              <span>{evento.data}</span>
              <span>{evento.sala.nome}</span>
              {1 === 1 ? (
                <button type="button" className="btn-confirmacao">
                  Quero participar
                </button>
              ) : (
                <button type="button" className="btn-desmarcar">
                  Desmarcar minha presença
                </button>
              )}
          </ul>
        ))}
      </Container>
    </>
  );
}
