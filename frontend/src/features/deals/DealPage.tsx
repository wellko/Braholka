import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOneDeal } from './DealsThunks';
import { selectDeal, selectDealsLoading } from './DealsSlice';
import DotSpinner from '../../components/UI/DotSpinner/DotSpinner';
import { apiUrl } from '../../constants';

const DealPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const deal = useAppSelector(selectDeal);
  const loading = useAppSelector(selectDealsLoading);
  const imagePath = deal && apiUrl + deal.image;
  useEffect(() => {
    if (id) {
      dispatch(getOneDeal(id));
    }
  }, [id, dispatch]);
  return (
    <div>
      {loading && <DotSpinner />}
      {deal && (
        <>
          <h1 className="dealPage-header">{deal.title}</h1>
          <div className="clearfix">
            <img className="dealPage-image" src={imagePath!} alt="product" />
            <p>{deal.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DealPage;
