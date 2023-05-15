import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDeals } from './DealsThunks';
import { Container } from '@mui/material';
import { selectDeals } from './DealsSlice';
import DealsCard from './components/DealsCard';

const DealsPage = () => {
  const deals = useAppSelector(selectDeals);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDeals());
  }, [dispatch]);
  return <Container>{deals && deals.map((el) => <DealsCard deal={el} key={Math.random()} />)}</Container>;
};

export default DealsPage;
