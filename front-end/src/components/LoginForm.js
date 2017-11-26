import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './LoginForm.css';

class LoginForm extends Component {
  render() {
    return (
      <div className='login-form-wrapper'>
        <h1>Piglet</h1>
        <div className='login-form'>
          <TextField 
            name='username' 
            value={this.props.username} 
            onChange={this.props.onChangeMethod} 
            onKeyPress={this.props.onKeyPressMethod} 
            hintText='Username' 
          />
          <TextField 
            name='password' 
            value={this.props.password} 
            onChange={this.props.onChangeMethod}
            onKeyPress={this.props.onKeyPressMethod} 
            hintText='Password' 
            type='password' 
          />
          <FlatButton label='Login' primary= {true} onClick={this.props.onClickMethod} />
        </div>
      </div>
    );
  }
}

export default LoginForm;