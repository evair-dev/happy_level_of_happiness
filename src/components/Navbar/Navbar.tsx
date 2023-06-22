import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import { CustomDialog } from '@/components/CustomDialog';
import { FavoriteTable } from '@/components/Navbar/FavoriteTable';
import { dialogOpenSubject$ } from '@/components/CustomDialog/CustomDialog.tsx';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Navbar: React.FC = () => {

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
    <>
      <CustomDialog>
        <FavoriteTable />
      </CustomDialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Employee Happiness
          </Typography>
          <IconButton color="secondary" aria-label="favorites" component="label" onClick={handleClick}>
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
