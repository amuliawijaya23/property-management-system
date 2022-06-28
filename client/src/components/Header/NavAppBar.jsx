import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector } from 'react-redux';

export default function NavAppBar(props) {
  const user = useSelector((state) => state.user.value);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={
              user.isAuthenticated ? 
              props.openDrawer : 
              () => console.log('NOT AUTHORIZED')
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProperTee
          </Typography>
          {user.isAuthenticated && (
            <Button 
              onClick={() => props.logout({ returnTo: window.location.origin })}
              color="inherit"
            >
              Logout
            </Button>
          )}
          {!user.isAuthenticated && (
            <Button
              onClick={() => props.loginWithRedirect()}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};