import React from 'react';
import { signOut } from '~/store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

export default function RouterWapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const dispatch = useDispatch();
  const { signed } = store.getState().auth;
  if (!signed && isPrivate) {
    dispatch(signOut());
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    dispatch(signOut());
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouterWapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouterWapper.defaultProps = {
  isPrivate: false,
};
