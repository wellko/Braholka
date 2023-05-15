import React from 'react';
import image from '../../../d41586-023-00364-y_23996644.jpg';
import { DealTypeProps } from '../../../types';

interface props {
  deal: DealTypeProps;
}

const DealsCard: React.FC<props> = ({ deal }) => {
  return (
    <div className="card">
      <a className="card1" href="#">
        <img src={image} alt="ba" />
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
