import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDeals } from './DealsSlice';
import { Container } from '@mui/material';
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
      <h2>Не опубликованные</h2>
      {deals && deals.length ? deals.map((el) => <DealsCard deal={el} key={el._id} />) : <h4>Объявлений нет</h4>}
    </Container>
  );
};

export default DealsUnpublished;
