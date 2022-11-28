import React from 'react'
import styles from './InfoBox.module.scss'
import Card from '../Card/Card'

const InfoBox = ({cardClass, title, count, icon}) => {
  return (
    <div className={styles['info-box']}>
        <Card cardClass={cardClass}>
            <h4>{title}</h4>
            <span>
                <h3>{count}</h3>
                {icon}
            </span>
        </Card>
    </div>
  )
}

export default InfoBox