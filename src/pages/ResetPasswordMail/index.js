import React from 'react';
import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import logo from '~/assets/logo.ico';

import { resetPasswordMailRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
});

export default function ResetPasswordMail() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(data) {
    const { email } = data;
    dispatch(resetPasswordMailRequest(email));
  }
  return (
    <>
      <Container>
        <img src={logo} alt="Faesb" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu e-mail" />

          <button type="submit">
            {loading ? 'Enviando...' : 'Enviar e-mail'}
          </button>
        </Form>
      </Container>
    </>
  );
}
