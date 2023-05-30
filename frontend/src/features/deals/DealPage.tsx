import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getOneDeal } from './DealsThunks';
import { selectDeal, selectDealsLoading } from './DealsSlice';
import DotSpinner from '../../components/UI/DotSpinner/DotSpinner';
import { apiUrl } from '../../constants';
import Chat from '../../components/UI/Chat/Chat';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid } from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

const DealPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const deal = useAppSelector(selectDeal);
  const loading = useAppSelector(selectDealsLoading);
  const imagePath = deal ? apiUrl + deal.image : undefined;
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
    </Container>
  );
};

export default DealPage;
