import React from 'react';
import image from '../../../d41586-023-00364-y_23996644.jpg';

const DealsCard = () => {
  return (
    <div className="card">
      <a className="card1" href="#">
        <img src={image} alt="ba" />
        <p>some title</p>
        <p className="small">some description.</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
};

export default DealsCard;
