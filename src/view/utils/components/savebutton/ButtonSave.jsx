import React from "react";
import styles from "./SaveButton.module.css";
const SaveButton = ({ onClick, text = "Guardar cambios", icon = "💾", className = "" }) => {
  return (
    <div className={styles["container-button"]}>
      <button className={`${styles.saveButton} ${className}`} onClick={onClick}>
        <span className={styles.icon}>{icon}</span>
        {text}
      </button>
    </div>
  );
};

export default SaveButton;
