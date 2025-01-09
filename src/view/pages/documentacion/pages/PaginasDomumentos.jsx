import React, { useState } from "react";
import styles from './PaginasDomumentos.module.css';
import MenuDocumentos from './components/menuDoc/MenuDocumentos';
import InfoDocumentos from './components/Info/InfoDocumentos';
import ModeloDoc from './components/modelo/ModeloDoc';

function PaginasDomumentos({ onNavigate, formData }) {
  // Estado para el elemento (sección/subsección) seleccionado
  const [selectedDocument, setSelectedDocument] = useState({
    title: '',   // la sección
    subitem: '', // la subsección
  });

  // ARREGLO PARA EL MENÚ (solo texto)
  const menuItems = formData?.sections.map((section) => ({
    title: section.name,
    // subitems es un array de strings
    subitems: section.subsections.map((subsection) => subsection.name),
  })) || [];

  // ARREGLO COMPLETO PARA LOS DOCUMENTOS
  const files = formData?.sections.map((section) => ({
    title: section.name,
    subitems: section.subsections.map((subsection) => ({
      name: subsection.name,
      documents: subsection.documents,
    })),
  })) || [];

  // Función para encontrar la subsección seleccionada en `files`
  const getSelectedSubsection = () => {
    if (!selectedDocument.title || !selectedDocument.subitem) return null;

    // 1. Encuentra la sección
    const foundSection = files.find((f) => f.title === selectedDocument.title);
    if (!foundSection) return null;

    // 2. Encuentra la subsección dentro de esa sección
    const foundSubsec = foundSection.subitems.find(
      (s) => s.name === selectedDocument.subitem
    );

    return foundSubsec || null;
  };

  // Obtener la subsección con documentos según la selección
  const selectedSubsection = getSelectedSubsection();

  return (
    <div className={styles.container}>
      <div className={styles['container-documents']}>
        <div className={styles['content-info']}>
          {/* SIDEBAR */}
          <MenuDocumentos
            onNavigate={onNavigate}
            menuItems={menuItems}
            // Cuando el usuario hace clic en un subitem,
            // guardamos la sección (title) y la subsección (subitem) como strings
            onDocumentSelect={(title, subitem) => setSelectedDocument({ title, subitem })}
          />

          {/* CONTENEDOR PARA Main Content y Modelo PDF */}
          <div className={styles['main-model-container']}>
            {/* MAIN CONTENT */}
            <InfoDocumentos
              title={selectedDocument.title}
              subitems={selectedDocument.subitem}
            />

            {/* MODELO PDF: renderizamos solo si hay algo seleccionado */}
            {selectedSubsection ? (
              <ModeloDoc selectedSubsection={selectedSubsection} title={selectedDocument.title}/>
            ) : (
              <p>Seleccione una categoría para ver los documentos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginasDomumentos;

            // <InfoDocumentos
            //   title={selectedDocument.title}
            //   subitems={selectedDocument.subitem}
            // />
