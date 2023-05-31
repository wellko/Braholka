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
        Привет, {user.displayName}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate('/addDeal');
          }}
        >
          Создать сделку
        </MenuItem>
        {user.role === 'admin' ? (
          <MenuItem
            onClick={() => {
              navigate('/addCategory');
            }}
          >
            Создать категорию
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            navigate('/myDeals');
          }}
        >
          Мои объявления
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await dispatch(logoutAction());
            navigate('/');
          }}
        >
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
