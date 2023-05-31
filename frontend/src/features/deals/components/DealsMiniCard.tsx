import React, { useState } from 'react';
import { DealTypeProps } from '../../../types';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteDeal, getDealsByOwner } from '../DealsThunks';
import { selectUser } from '../../users/UsersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface Props {
  deal: DealTypeProps;
}

const DealsMiniCard: React.FC<Props> = ({ deal }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const onDeleteBtnClick = () => {
    setOpen(true);
  };
  const handleConfirm = async () => {
    setOpen(false);
    await dispatch(deleteDeal(deal._id));
    if (user) {
      await dispatch(getDealsByOwner(user._id));
    }
  };

  return (
    <div className="DealsMiniCard-container">
      <p>{deal.title}</p>
      {!deal.isPublished && <p>Не опубликовано!</p>}
      <button
        onClick={() => {
          navigate('/deals/' + deal._id + '/edit');
        }}
        type="button"
      >
        <ModeEditIcon />
      </button>
      <button onClick={onDeleteBtnClick}>
        <DeleteIcon />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Удалить {deal.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Вы уверены что хотите удалить {deal.title} ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleConfirm}>Удалить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DealsMiniCard;
