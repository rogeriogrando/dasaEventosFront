import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import Header from '~/components/Header';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.usuario.profile);
  function handleSubmit(data) {
    console.tron.log(data);
  }
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <Header />
      <Container>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <Input name="nome" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="E-mail" />
          <hr />
          <Input name="oldPassword" type="password" placeholder="Senha atual" />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Nova senha"
          />
          <button type="submit">Atualizar perfil</button>
        </Form>
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </Container>
    </>
  );
}
