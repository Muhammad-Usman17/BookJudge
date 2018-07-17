// lib
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// src
import './Header.css';
import history from '../../utils/history';

const Header = props =>
  <div className="Header-root">
    <AppBar position="static">
      <Toolbar>
        <div className="Header-flex">
          <Typography variant="title" color="inherit" className="Header-Name">
            Book Judge
          </Typography>
          <Button
            className="Header-Button"
            onClick={() => {
              history.push('/');
            }}
          >
            Home
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  </div>;
export default Header;
