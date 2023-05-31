import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeals } from './DealsSlice';
import { Container, Grid } from '@mui/material';
import { getUnpublishedDeals } from './DealsThunks';
import DealsCard from './components/DealsCard';

const DealsUnpublished = () => {
  const dispatch = useAppDispatch();
  const deals = useAppSelector(selectDeals);
  useEffect(() => {
    dispatch(getUnpublishedDeals());
  }, [dispatch]);
  return (
    <Container>
      <h2 className="deal-color-purple">Не опубликованные</h2>
      <Grid container>
        {deals && deals.length ? (
          deals.map((el) => (
            <Grid key={el._id} item xs={12} sm={5} md={4}>
              {' '}
              <DealsCard deal={el} />{' '}
            </Grid>
          ))
        ) : (
          <h4>Объявлений нет</h4>
        )}
      </Grid>
    </Container>
  );
};

export default DealsUnpublished;
