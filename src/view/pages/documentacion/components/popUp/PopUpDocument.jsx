import React from "react";
import styles from "./PopUpDocument.module.css";

function PopUpDocument({ sectionName, documentTitle, fileUrl, onClose }) {
  // Definir el src para el iframe
  let iframeSrc = fileUrl;
  if (!fileUrl.endsWith(".pdf")) {
    iframeSrc = `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;
  }

  // Descargar el documento
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = documentTitle;
    link.click();
  };

  // Copiar el enlace al portapapeles
  const handleCopyLink = () => {
    // navigator.clipboard.writeText(fileUrl);
    // alert("Enlace copiado al portapapeles");
  };

  // Imprimir el documento
  const handlePrint = () => {
    const printWindow = window.open(fileUrl, "_blank");
    printWindow.print();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Encabezado */}
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{sectionName}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Título del documento */}
        <h3 className={styles.documentTitle}>{documentTitle}</h3>

        {/* Opciones */}
        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={handleCopyLink}>
            Copiar enlace
          </button>
          <button className={styles.actionButton} onClick={handlePrint}>
            Imprimir
          </button>
          <button className={styles.actionButton} onClick={handleDownload}>
            Descargar
          </button>
        </div>

        {/* Vista previa */}
        <div className={styles.contentPreview}>
          <iframe
            src={iframeSrc}
            title="Vista previa del documento"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default PopUpDocument;
