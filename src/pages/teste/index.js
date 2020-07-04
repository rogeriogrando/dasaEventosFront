import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import api from '~/services/api';

export default function Teste() {
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    console.tron.log(data.image[0].name);
    console.tron.log(data);
    const certificado = new FormData();
    certificado.append('file', data.image[0]);
    const response = await api.post('modelos', certificado);
    console.tron.log(response);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register}
        type="file"
        id="certificado"
        accept="image/*"
        name="image"
      />
      <button>Submit</button>
    </form>
  );
}
