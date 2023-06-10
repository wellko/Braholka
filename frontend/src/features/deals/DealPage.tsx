import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteDeal, getOneDeal, publishDeal } from './DealsThunks';
import { selectDeal, selectDealsLoading } from './DealsSlice';
import DotSpinner from '../../components/UI/DotSpinner/DotSpinner';
import { apiUrl } from '../../constants';
import Chat from '../../components/UI/Chat/Chat';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { selectUser } from '../users/UsersSlice';

const DealPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deal = useAppSelector(selectDeal);
  const loading = useAppSelector(selectDealsLoading);
  const imagePath = deal ? apiUrl + deal.image : undefined;
  const onDeleteBtnClick = () => {
    setOpen(true);
  };
  const handleConfirm = async () => {
    setOpen(false);
    if (id) {
      await dispatch(deleteDeal(id));
    }
    navigate('/deals/unPublished');
  };
  const publishConfirm = async () => {
    if (deal) {
      dispatch(publishDeal(deal._id));
    }
    navigate('/deals/unPublished');
  };
  useEffect(() => {
    if (id) {
      dispatch(getOneDeal(id));
    }
  }, [id, dispatch]);
  return (
    <Container>
      <Grid container>
        {loading && <DotSpinner />}
        {deal && (
          <>
            <Grid item xs={12} md={6}>
              <h2 className="dealPage-header">{deal.title}</h2>
              {!deal.isPublished && <h3 className="deal-color-red">Не опубликовано</h3>}
              <img src={imagePath} alt="product" className="dealPage-image" />
              <Accordion>
                <AccordionSummary expandIcon={<QuestionMarkOutlinedIcon />}>
                  <p className="dealPage-accordion">
                    состояние : <span className="dealPage-bold">{deal.condition} </span>
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="dealPage-accordion">
                    <span className="dealPage-bold">Новое</span> : вещь ниразу не использовали
                  </p>
                  <p className="dealPage-accordion">
                    <span className="dealPage-bold">Идеальное</span> : вещь использовали несколько раз
                  </p>
                  <p className="dealPage-accordion">
                    <span className="dealPage-bold">Очень хорошее</span> : вещь использовали более чем 5 раз, обращались
                    очень бережно
                  </p>
                  <p className="dealPage-accordion">
                    <span className="dealPage-bold">Удовлетворительное</span> : вещь использовали много раз
                  </p>
                </AccordionDetails>
              </Accordion>
              <p>{deal.description}</p>
              {deal.purchasePrice > 0 ? (
                <p>цена выкупа : {deal.purchasePrice} сом</p>
              ) : (
                <p>обмен на : {deal.tradeOn}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Chat />
            </Grid>
          </>
        )}
      </Grid>
      {user && user.role === 'admin' && deal && !deal.isPublished && (
        <>
          <Button
            disabled={loading}
            sx={{ marginX: '10px' }}
            variant="outlined"
            color="primary"
            onClick={publishConfirm}
          >
            Опубликовать
          </Button>
          <Button disabled={loading} variant="outlined" color="warning" onClick={onDeleteBtnClick}>
            Удалить
          </Button>
        </>
      )}
      {deal && (
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
      )}
    </Container>
  );
};

export default DealPage;
