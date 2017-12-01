import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import './NavBar.css';

const titleStyle = {
  fontFamily: 'Pacifico'
}

const drawerStyle = {
  zIndex: 1000,
  top: '64px',
  transition: 'transform, width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
}

class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar 
          title='Piggy Bank' 
          titleStyle={titleStyle}
          iconElementRight={<FlatButton label='Logout' />} 
          onRightIconButtonTouchTap={this.props.handleLogout} 
          onLeftIconButtonTouchTap={this.props.toggleExpand}
        />
        <Drawer open={true} width={this.props.expanded ? 180 : 60} containerStyle={drawerStyle}>
          <MenuItem leftIcon={<i className="fa fa-home navIcon" aria-hidden="true"></i>}>Dashboard</MenuItem>
          <Divider />
          <MenuItem leftIcon={<i className="fa fa-cog navIcon" aria-hidden="true"></i>}>Settings</MenuItem>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default NavBar;