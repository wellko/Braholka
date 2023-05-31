import React, { useState } from 'react';
import { DealTypeProps } from '../../../types';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteDeal, getDealsByOwner } from '../DealsThunks';
import { selectUser } from '../../users/UsersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';

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
  const imagePath = apiUrl + deal.image;
  const handleConfirm = async () => {
    setOpen(false);
    await dispatch(deleteDeal(deal._id));
    if (user) {
      await dispatch(getDealsByOwner(user._id));
    }
  };

  return (
    <div className="dealsMiniCard-container">
      <Grid container justifyContent="space-between">
        <Grid item>
          <img className="dealsMiniCard-image" src={imagePath} alt="some picture" />
        </Grid>
        <Grid item xs={8} sm={7}>
          <p>{deal.title}</p>
          {!deal.isPublished && <p className="deal-color-red">Не опубликовано!</p>}
        </Grid>
        <Grid item xs={12} sm={2}>
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
        </Grid>
      </Grid>
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
