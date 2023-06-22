import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';


const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
