import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../../features/users/UsersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button sx={{ paddingBottom: '10px' }} onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={async () => {
            await dispatch(logoutAction());
            navigate('/');
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
