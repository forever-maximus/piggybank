import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import {logout} from '../utils/loginHelpers';

class NavController extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleLogout = () => {
    logout()
    this.props.resetLoginToken();
  }
  
  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <div>
        <NavBar handleLogout={this.handleLogout} expanded={this.state.expanded} toggleExpand={this.toggleExpand} />
      </div>
    );
  }
}

export default NavController;