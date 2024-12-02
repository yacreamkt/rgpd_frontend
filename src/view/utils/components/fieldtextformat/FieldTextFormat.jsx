import React from "react";
import classNames from "classnames";
import styles from './FieldTextFormat.module.css';

function FieldTextFormat({ label, value, onChange, row = false, placeholderValue = ""}) {
  return (
    <div
      className={classNames(styles["field-text-format"], {
        [styles["row"]]: row, // Clase para fila
        [styles["column"]]: !row, // Clase para columna
      })}
    >
      <p className={classNames(styles["enunciado"], {
        [styles["center"]]: row,
        [styles["rigth"]]: !row,
      })}>
        {label}
      </p>
      <input
        className={styles["text-input"]}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholderValue}
      />
    </div>
  );
}

export default FieldTextFormat;
