import React from 'react';
import styles from './ProgressBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const ProgressBar = ({ currentStep, totalSteps, positions, onStepClick }) => {
  const firstPos = positions[0];
  const lastPos = positions[positions.length - 1];

  const lineTop = firstPos;
  const lineHeight = lastPos - firstPos; 

  let fillHeight = 0;
  if (currentStep > 1) {
    fillHeight = positions[currentStep - 1] - firstPos;
  }

  const totalHeight = lastPos - 15;

  return (
    <div
      className={styles.progressBar}
      style={{
        height: `${totalHeight}px`,
      }}
    >
      {/* Línea gris */}
      <div
        className={styles.line}
        style={{
          top: `${lineTop}px`,
          height: `${lineHeight}px`,
        }}
      />
      
      {/* Línea verde */}
      <div
        className={styles.lineFill}
        style={{
          top: `${lineTop}px`,
          height: `${fillHeight}px`,
        }}
      />

      <div className={styles.steps}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div
              key={index}
              className={`${styles.step} ${isActive ? styles.active : ''}`}
              style={{
                top: `${positions[index]}px`,
              }}
              onClick={() => onStepClick(stepNumber)}
            >
              <span className={styles.circle}>
                {isActive ? (
                  <FontAwesomeIcon icon={faCircleCheck} className={styles['icon']}/>
                ) : (
                  <FontAwesomeIcon icon={faCircleXmark} className={styles['icon']}/>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
