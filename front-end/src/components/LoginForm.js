import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './LoginForm.css';

class LoginForm extends Component {
  render() {
    return (
      <div className='login-form-wrapper'>
        <h1>Piggy Bank</h1>
        <div className='login-form'>
          <div>
            <i className="fa fa-user fa-lg login-icon" aria-hidden="true"></i>
            <TextField 
              name='username' 
              value={this.props.username} 
              onChange={this.props.onChangeMethod} 
              onKeyPress={this.props.onKeyPressMethod} 
              hintText='Username' 
            />
          </div>
          <div>
            <i className="fa fa-key fa-lg login-icon" aria-hidden="true"></i>
            <TextField 
              name='password' 
              value={this.props.password} 
              onChange={this.props.onChangeMethod}
              onKeyPress={this.props.onKeyPressMethod} 
              hintText='Password' 
              type='password' 
            />
          </div>
          <FlatButton label='Login' primary={true} onClick={this.props.onClickMethod} />
        </div>
      </div>
    );
  }
}

export default LoginForm;