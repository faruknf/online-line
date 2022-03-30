import React from 'react';
import walkGif from '../../assets/walk.gif';

export default function LineItem({ userId }) {
  return (
    <div className="line__item">
      <div className="item__info">{userId}</div>
      <img src={walkGif} alt="img" />
    </div>
  );
}
