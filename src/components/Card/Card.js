import React from 'react';
import styles from './Card.module.scss';

const Card = ({children, classCard}) => {
  return (
    <div className={`${styles.card} ${classCard}`}>
        {children}
    </div>
  )
}

export default Card