import React, { useState, useEffect } from 'react';
import style from './index.module.css';

export const LoadingProgressBar = ({ isLoading }) => {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const increasePersent = setInterval(() => {
      setAmount(prev => {
        if (prev >= 94) clearInterval(increasePersent);
        return ++prev;
      });
    }, 8000);
    return () => clearInterval(increasePersent);
	}, [isLoading]);
  return (
    <div className={style.skillBarWrapper}>
      <div className={style.skillBarContainer}>
        <div className={style.skillBarValue} style={{ width: `${amount}%` }}>
          <div className={style.skillBarAmount}>{amount} %</div>
        </div>
      </div>
      <div className={style.skillBarInfo}>
        Скачивание может занимать длительное время
      </div>
    </div>
  );
};
