/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Form from './Form';
import Input from './Input';
import ErrMessage from './ErrMessage';
import Button from 'components/Button';
import P from 'components/P';
import CenteredSection from './CenteredSection';

import { 
  login,
  register,
  changeEmail,
  changePassword,
  toggleLoader, 
  checkAuth,
  toggleAuth,
} from './actions';

import {
  user,
  email, 
  password, 
  isLogin,
  isLoading,
  isAuthenticated,
  authErr,
} from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.checkAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(nextProps.user));
      this.props.router.push('/dashboard');
    }
  }
  render() {
    if (this.props.authErr) {
      console.log(this.props)
    }
    return (
      <CenteredSection>
        
        <Form onSubmit={this.props.isLogin ? this.props.onLogin : this.props.onRegister} >
          <Input
            placeholder='Enter Email'
            type='text'
            onChange={this.props.onChangeEmail}
          />        
          <Input
            placeholder='Enter Password'
            type='password'
            onChange={this.props.onChangePassword}
          />    
          <Button message={this.props.isLogin ? 'LOGIN' : 'REGISTER'} />
        </Form>
        
        <div onClick={this.props.toggleAuth}>
          <P message={this.props.isLogin ? 'Need an account?' : 'Have an account?'} />
        />
        </div>
        
        {this.props.authErr &&
          <ErrMessage>{this.props.authErr}</ErrMessage>
        }
      </CenteredSection>
    );
  }
}

HomePage.propTypes = {
  checkAuth: React.PropTypes.func,
  toggleAuth: React.PropTypes.func,
  onChangeEmail: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(checkAuth()),
    toggleAuth: () => dispatch(toggleAuth()),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onLogin: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(toggleLoader());
      dispatch(login());
    },
    onRegister: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(toggleLoader());
      dispatch(register());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  user: user(),
  email: email(),
  authErr: authErr(),
  isLogin: isLogin(),
  password: password(),
  isLoading: isLoading(),
  isAuthenticated: isAuthenticated()
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);