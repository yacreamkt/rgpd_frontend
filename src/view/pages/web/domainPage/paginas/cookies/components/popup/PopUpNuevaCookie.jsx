import React, { useState } from "react";
import styles from "./PopUpNuevaCookie.module.css";

const PopUpNuevaWeb = ({ isOpen, onClose, onAdd }) => {
  const [cookie, setcookie] = useState("");

  const handleAdd = () => {
    if (cookie.trim()) {
      onAdd(cookie);
      setcookie("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Añadir nueva cookie</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.header2}>
          <p>Seleccione las cookies que utiliza su página web:</p>
        </div>
        <div className={styles.body}>
          <div className={styles["items-cookies"]}></div>
          <div className={styles["items-cookies"]}></div>
        </div>
        <div className={styles["container-otras-cookies"]}>
          <button className={styles.otrascookies}>
            + Otras cookies
          </button>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.addButton} onClick={handleAdd}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpNuevaWeb;
