import React from 'react';
import { DealTypeProps } from '../../../types';
import { apiUrl } from '../../../constants';

interface props {
  deal: DealTypeProps;
}

const DealsCard: React.FC<props> = ({ deal }) => {
  const imagePath = apiUrl + deal.image;
  return (
    <div className="card">
      <a className="card1" href="#">
        <img src={imagePath} alt={deal.title} />
        <p>{deal.title}</p>
        <p className="small">{deal.category.name}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
};

export default DealsCard;
