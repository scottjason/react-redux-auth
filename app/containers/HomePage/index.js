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
import Button from 'components/Button';
import P from 'components/P';
import CenteredSection from './CenteredSection';

import { 
  changeEmail, 
  changePassword, 
  register, 
  toggleLoader, 
  checkAuth,
  toggleAuth,
} from './actions';

import {
  user,
  email, 
  password, 
  isValidEmail, 
  isValidPassword, 
  isLoading,
  isAuthenticated,
  isLogin
} from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    // this.props.checkAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(nextProps.user));
      this.props.router.push('/dashboard');
    }
  }
  render() {
    return (
      <CenteredSection>
        {this.props.isLoading &&
          <p> REQUEST IN PROGRESS </p>
        }
        
        <Form onSubmit={this.props.onRegister} >
          <Input
            placeholder='Enter Email'
            type='email'
            onChange={this.props.onChangeEmail}
          />        
          <Input
            placeholder='Enter Password'
            type='password'
            onChange={this.props.onChangePassword}
          />
    
          {this.props.isLogin && 
            <Button message={'LOGIN'} />
          }
          
          {!this.props.isLogin && 
            <Button message={'REGISTER'} 
            onClick={this.props.toggleAuth}
          />
          }
        </Form>
        
        <div onClick={this.props.toggleAuth}>
          {this.props.isLogin && 
            <P message={'Need an account?'} />
          }        
          {!this.props.isLogin && 
            <P message={'Have an account?'} />
          }
        </div>

      </CenteredSection>
    );
  }
}


HomePage.propTypes = {
  checkAuth: React.PropTypes.func,
  toggleAuth: React.PropTypes.func,
  onChangeEmail: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
  onRegister: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(checkAuth()),
    toggleAuth: () => dispatch(toggleAuth()),
    onChangeEmail: (evt) => dispatch(changeEmail(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
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
  isLogin: isLogin(),
  password: password(),
  isValidEmail: isValidEmail(),
  isValidPassword: isValidPassword(),
  isLoading: isLoading(),
  isAuthenticated: isAuthenticated()
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);