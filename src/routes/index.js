import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import PrivateRoute from './PrivateRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPasswordMail from '../pages/ResetPasswordMail';
import ResetPassword from '../pages/ResetPassword';
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
import CadAssinaturas from '../pages/CadAssinaturas';
import ListaParticipantes from '../pages/ListaParticipantes';
import CadListaParticipantes from '../pages/CadListaParticipantes';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/resetpasswordmail" component={ResetPasswordMail} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/eventos" component={Eventos} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/usuarioeventos" component={UsuarioEventos} isPrivate />
      <Route path="/eventocursos" component={EventoCursos} isPrivate />
      <Route path="/usuariocertificados" component={Certificados} isPrivate />
      <PrivateRoute path="/cadcursos" component={CadCursos} isPrivate />
      <PrivateRoute
        path="/eventopresencas"
        component={EventoPresencas}
        isPrivate
      />

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
      <PrivateRoute
        path="/cadassinaturas"
        component={CadAssinaturas}
        isPrivate
      />
      <PrivateRoute
        path="/listaparticipantes"
        component={ListaParticipantes}
        isPrivate
      />
      <PrivateRoute
        path="/cadlistaparticipantes"
        component={CadListaParticipantes}
        isPrivate
      />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
