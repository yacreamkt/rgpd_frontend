import React, { useState } from "react";
import styles from "./ModeloDoc.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import PopUpDocument from "../../../components/popUp/PopUpDocument";

function ModeloDoc({ selectedSubsection, title }) {
  const { name, documents } = selectedSubsection;
  
  // Manejo del popup
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Función para abrir el popup y setear el doc seleccionado
  const handleShowPopup = (doc) => {
    setSelectedDoc(doc);
    setShowPopup(true);
  };

  // Función para cerrar el popup
  const handleClosePopup = () => {
    setSelectedDoc(null);
    setShowPopup(false);
  };

  return (
    <div className={styles.model}>
      <h4>{name}</h4>
      {documents && documents.length > 0 ? (
        documents.map((doc) => (
          <div className={styles.pdfCard} key={doc.id}>
            <FontAwesomeIcon icon={faFilePdf} className={styles.pdfIcon} />
            <div>
              <h5>{doc.title}</h5>
              
              {/* Botón que muestra el popup con el documento seleccionado */}
              <button
                onClick={() => handleShowPopup(doc)}
                className={styles.downloadButton}
              >
                Mostrar Documento
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay documentos disponibles para esta categoría.</p>
      )}

      {/* Renderiza el popup solo cuando haya un documento seleccionado */}
      {showPopup && selectedDoc && (
        <PopUpDocument
          sectionName={title}            // o si deseas: selectedSubsection.name
          documentTitle={selectedDoc.title}
          fileUrl={selectedDoc.file_url}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default ModeloDoc;
