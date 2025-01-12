import React, { useState, useEffect } from "react";
import styles from "./PopUpNuevaWeb.module.css";
import { postRegisterDomain } from "../../../../data/datasource/remote/service/websites/domain/HandlesDomain";
import { postRegisterCharacteristicsDefault } from "../../../../data/datasource/remote/service/websites/caracteristicas/HandlesCharacteristics";
import { postLegalNoticesDefault } from "../../../../data/datasource/remote/service/websites/legal-notices/HandlesLegalNotices";
import { postPrivacySettingsDefault } from "../../../../data/datasource/remote/service/websites/privacy-settings/HandlesDomain";
import { postHandlesCondicionesContratacionDefault } from "../../../../data/datasource/remote/service/websites/condicionesdecontratacion/HandlesCondicionesContratacion"

const PopUpNuevaWeb = ({ isOpen, onClose, onAdd }) => {
  const [url, setUrl] = useState(""); // Estado para la URL
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el botón "Añadir"

  // Efecto para limpiar los estados al cerrar el popup
  useEffect(() => {
    if (!isOpen) {
      setUrl(""); // Restablece el campo de texto
      setError(null); // Limpia cualquier error
      setIsSubmitting(false); // Resetea el estado de envío
    }
  }, [isOpen]); // Ejecuta esto cada vez que `isOpen` cambia

  const handleAdd = async () => {
    if (!url.trim()) {
      setError("La URL no puede estar vacía.");
      return;
    }

    setIsSubmitting(true);
    setError(null); // Limpia errores anteriores

    try {
      // Crea el objeto de datos que se enviará al backend
      const data = {
        domain: "https://" + url.trim(),
        server_type: "HOSTED",
        server_location: "EU_SPAIN",
        configuration: {},
        privacy_settings: {},
        form_settings: {},
      };

      // Llama a la función postRegisterWebsite
      const response = await postRegisterDomain(data);
      
      // Registrar Caracteristicas por defecto
      console.log(response.datos.id)
      await postRegisterCharacteristicsDefault(response.datos.id);
      await postLegalNoticesDefault(response.datos.id);
      await postPrivacySettingsDefault(response.datos.id);
      await postHandlesCondicionesContratacionDefault(response.datos.id);

      // Si la solicitud es exitosa, llama a onAdd con los datos del nuevo sitio
      onAdd(response.datos); // Asume que `response.datos` contiene el nuevo sitio web
      onClose(); // Cierra el popup
    } catch (error) {
      // Si el error tiene detalles específicos del backend, los mostramos
      const domainError = error.detalles?.domain?.[0]; // Extrae el mensaje específico de "domain"
      setError(domainError || error.error || "Hubo un error al registrar la página."); // Muestra el mensaje
    } finally {
      setIsSubmitting(false); // Habilita nuevamente el botón
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>Añadir nueva página web</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.body}>
          <label className={styles.label}>URL:</label>
          <input
            type="text"
            placeholder="ejemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>} {/* Muestra errores */}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.addButton}
            onClick={handleAdd}
            disabled={isSubmitting} // Deshabilita el botón mientras se envía
          >
            {isSubmitting ? "Añadiendo..." : "Añadir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpNuevaWeb;
