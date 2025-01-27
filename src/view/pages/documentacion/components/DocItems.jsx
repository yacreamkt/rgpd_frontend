import React from 'react';
import styles from './DocItems.module.css';

const DocItems = ({ title, items }) => {
  return (
    <div className={styles.categoryCard}>
      <h4>{title}</h4>
      {/* <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      <p className={styles['text-saber-mas']}>
        Saber más...
      </p>
    </div>
  );
};

export default DocItems;
