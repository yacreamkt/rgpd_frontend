import React, { useState, useEffect } from "react";
import styles from "./PopUpDeleteDomain.module.css";
import { deleteDomain } from "../../../../../data/datasource/remote/service/websites/domain/HandlesDomain";

const PopUpDeleteDomain = ({ isOpen, onClose, id, onDeleted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitting(false); // Resetea el estado de envío
    }
  }, [isOpen]);

  const handleDeleteDomain = async () => {
    setIsSubmitting(true);

    try {
      // Llama a la función deleteDomain con el ID proporcionado
      console.log(id)
      await deleteDomain(id);

      // Si la solicitud es exitosa, llama a onDeleted
      onDeleted();
    } catch (error) {
      console.error("Error al eliminar el dominio:", error);
    } finally {
      setIsSubmitting(false); // Habilita nuevamente el botón
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Eliminar dominio</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <p>¿Desea eliminar el dominio?</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.addButton}
            onClick={handleDeleteDomain}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpDeleteDomain;
