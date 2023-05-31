import React, { useEffect } from 'react';
import { Container } from '@mui/material';
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
      {deals ? deals.map((el) => <DealsMiniCard deal={el} key={el._id} />) : <h3>У вас нету объявлений</h3>}
    </Container>
  );
};

export default MyDealsPage;
