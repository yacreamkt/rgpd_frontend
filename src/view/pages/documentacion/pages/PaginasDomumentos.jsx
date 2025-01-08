import React, { useState } from "react";
import styles from './PaginasDomumentos.module.css';
import MenuDocumentos from './components/menuDoc/MenuDocumentos';
import InfoDocumentos from './components/Info/InfoDocumentos';
import ModeloDoc from './components/modelo/ModeloDoc';

function PaginasDomumentos({ formData }) {
  // Estado para el elemento seleccionado
  const [selectedDocument, setSelectedDocument] = useState({
    title: '',
    subitem: '',
  });

  // Procesar las categorías dinámicamente a partir de formData
  const menuItems = formData?.sections.map((section) => ({
    title: section.name, // Nombre de la categoría
    subitems: section.subsections.map((subsection) => subsection.name), // Subcategorías
  })) || []; // Si formData no está disponible, usar un array vacío

  return (
    <div className={styles.container}>
      <div className={styles['container-documents']}>
        <div className={styles['content-info']}>
          {/* Sidebar */}
          <MenuDocumentos
            menuItems={menuItems}
            onDocumentSelect={(title, subitem) => setSelectedDocument({ title, subitem })}
          />

          {/* Main Content */}
          <InfoDocumentos
            title={selectedDocument.title}
            subitems={selectedDocument.subitem}
          />

          {/* Modelo PDF */}
          <ModeloDoc />
        </div>
      </div>
    </div>
  );
}

export default PaginasDomumentos;
