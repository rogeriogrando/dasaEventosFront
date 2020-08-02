import React from 'react';
import { Container } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import logo from '~/assets/logo.ico';

import { resetPasswordRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  pass: Yup.string().required('Senha é obrigatório'),
  confirPass: Yup.string().required('Senha é obrigatório'),
});

export default function ResetPassword() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(data) {
    const { pass, confirPass } = data;
    const token = window.location.pathname.split('/')[2];
    dispatch(resetPasswordRequest(token, pass, confirPass));
  }

  return (
    <>
      <Container>
        <img src={logo} alt="Faesb" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="pass" type="password" placeholder="Nova senha" />
          <Input
            name="confirPass"
            type="password"
            placeholder="Confime Nova senha"
          />

          <button type="submit">
            {loading ? 'Alterando...' : 'Alterar senha'}
          </button>
        </Form>
      </Container>
    </>
  );
}
