import React from 'react';
import { AppBar, Grid, styled, Toolbar } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { selectUser } from '../../../features/users/UsersSlice';
import logo from '../../../public/logo.png';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2, bgcolor: '#8707ff', boxShadow: 'inset 0px 0px 10px #FFF' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <Grid container item xs={12} sm={3}>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
