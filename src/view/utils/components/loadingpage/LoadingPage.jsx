// import React from 'react';
// import styles from './LoadingrRueda.module.css'; // Importa el módulo CSS

// const LoadingPage = () => {
//   return (
//     <div className={styles.loadingContainer}>
//       <div className={styles.spinner}></div>
//     </div>
//   );
// };

// export default LoadingPage;

import React from 'react';
import styles from './LoadingCirculos.module.css'; // Importa el módulo CSS

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.bouncingDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
};

export default LoadingPage;
