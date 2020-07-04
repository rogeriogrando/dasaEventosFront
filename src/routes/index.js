import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Eventos from '../pages/Eventos';
import Profile from '../pages/Profile';
import CadLocais from '../pages/CadLocais';
import CadCursos from '../pages/CadCursos';
import CadEventos from '../pages/CadEventos';
import CadCoordenador from '../pages/CadCoordenador';
import UsuarioEventos from '../pages/UsuarioEventos';
import EventoPresencas from '../pages/EventoPresencas';
import ListaPresencas from '../pages/ListaPresencas';
import EventoCursos from '../pages/EventoCursos';
import CadCertificados from '../pages/CadCertificados';
import Certificados from '../pages/Certificados';
import teste from '../pages/teste';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/eventos" component={Eventos} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/usuarioeventos" component={UsuarioEventos} isPrivate />
      <Route path="/eventocursos" component={EventoCursos} isPrivate />
      <Route path="/usuariocertificados" component={Certificados} isPrivate />
      <PrivateRoute path="/cursos" component={CadCursos} isPrivate />
      <PrivateRoute
        path="/eventopresencas"
        component={EventoPresencas}
        isPrivate
      />
      <PrivateRoute path="/teste" component={teste} isPrivate />
      <PrivateRoute
        path="/listapresencas"
        component={ListaPresencas}
        isPrivate
      />
      <PrivateRoute path="/cadeventos" component={CadEventos} isPrivate />
      <PrivateRoute path="/cadlocais" component={CadLocais} isPrivate />
      <PrivateRoute path="/cadcoord" component={CadCoordenador} isPrivate />
      <PrivateRoute
        path="/cadcertificados"
        component={CadCertificados}
        isPrivate
      />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
