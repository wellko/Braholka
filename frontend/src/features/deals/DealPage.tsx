import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOneDeal } from './DealsThunks';
import { selectDeal, selectDealsLoading } from './DealsSlice';
import DotSpinner from '../../components/UI/DotSpinner/DotSpinner';
import { apiUrl } from '../../constants';
import { selectUser } from '../users/UsersSlice';
import Chat from '../../components/UI/Chat/Chat';
import { Grid } from '@mui/material';

const DealPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deal = useAppSelector(selectDeal);
  const loading = useAppSelector(selectDealsLoading);
  const imagePath = deal ? apiUrl + deal.image : undefined;
  useEffect(() => {
    if (id) {
      dispatch(getOneDeal(id));
    }
  }, [id, dispatch]);
  return (
    <Grid container>
      {loading && <DotSpinner />}
      {deal && (
        <>
          <h1 className="dealPage-header">{deal.title}</h1>
          <div className="clearfix">
            <img className="dealPage-image" src={imagePath} alt="product" />
            <p>{deal.description}</p>
          </div>
          {user && <Chat />}
        </>
      )}
    </Grid>
  );
};

export default DealPage;
