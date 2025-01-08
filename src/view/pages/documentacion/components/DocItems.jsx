import React from 'react';
import styles from '../Doc.module.css';

const DocItems = ({ title, items }) => {
  return (
    <div className={styles.categoryCard}>
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocItems;
