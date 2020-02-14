import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Eventos from '../pages/Eventos';
import Profile from '../pages/Profile';
import Cursos from '../pages/Cursos';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/eventos" component={Eventos} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/cursos" component={Cursos} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
