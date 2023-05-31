import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeals } from './DealsSlice';
import { selectUser } from '../users/UsersSlice';
import { getDealsByOwner } from './DealsThunks';
import DealsMiniCard from './components/DealsMiniCard';

const MyDealsPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deals = useAppSelector(selectDeals);
  useEffect(() => {
    if (user) {
      dispatch(getDealsByOwner(user._id));
    }
  }, [user, dispatch]);
  return (
    <Container>
      <h2> Мои Объявления</h2>
      <Grid container gap={1}>
        {deals ? (
          deals.map((el) => (
            <Grid item xs={12} lg={5} key={el._id}>
              <DealsMiniCard deal={el} />
            </Grid>
          ))
        ) : (
          <h3>У вас нету объявлений</h3>
        )}
      </Grid>
    </Container>
  );
};

export default MyDealsPage;
