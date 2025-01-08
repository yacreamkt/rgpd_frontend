// import React, { useState } from "react";
import styles from '../../PaginasDomumentos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

function ModeloDoc ({ onNavigate, formData }) {
  return (
    <>
          {/* Modelo PDF */}
          <div className={styles.model}>
            <h4>Modelo</h4>
            <div className={styles.pdfCard}>
              <FontAwesomeIcon icon={faFilePdf} className={styles.pdfIcon} />
              <div>
                <h5>Cláusula información - Contrato</h5>
                <button className={styles.downloadButton}>Descargar PDF</button>
              </div>
            </div>
            <div className={styles.pdfCard}>
              <FontAwesomeIcon icon={faFilePdf} className={styles.pdfIcon} />
              <div>
                <h5>Cláusula información - Contrato (Versión inglés)</h5>
                <button className={styles.downloadButton}>Descargar PDF</button>
              </div>
            </div>
            <p>
              Si tienes cualquier duda sobre este documento, <p>contacta con tu abogado</p>.
            </p>
          </div>
    </>
  );
}

export default ModeloDoc;
