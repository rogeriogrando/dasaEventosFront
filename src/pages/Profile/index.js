import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import Header from '~/components/Header';
import { updateProfileRequest } from '~/store/modules/usuario/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.usuario.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
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
          <Input name="oldPass" type="password" placeholder="Senha atual" />
          <Input name="pass" type="password" placeholder="Nova senha" />
          <Input
            name="confirPass"
            type="password"
            placeholder="Confime Nova senha"
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
