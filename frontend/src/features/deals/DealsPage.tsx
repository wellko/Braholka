import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDeals } from './DealsThunks';
import { Container, Grid } from '@mui/material';
import { selectDeals } from './DealsSlice';
import DealsCard from './components/DealsCard';

const DealsPage = () => {
  const deals = useAppSelector(selectDeals);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);
  return (
    <Container>
      <Grid container>
        {deals &&
          deals.map((el) => (
            <Grid item xs={12} sm={5} md={4} key={Math.random()}>
              <DealsCard deal={el} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default DealsPage;
