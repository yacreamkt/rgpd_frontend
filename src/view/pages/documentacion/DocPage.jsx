import React, { useState, useEffect } from 'react';
import styles from './Doc.module.css';
import DocItems from './components/DocItems';
import LoadingPage from '../../utils/components/loadingpage/LoadingPage';
import { getAllDocuments } from '../../../data/datasource/remote/service/docs/DocsService';

const DocPage = ({onNavigate}) => {
    const [formData, setFormData] = useState(null); // Inicialmente vacío
    const [loading, setLoading] = useState(true); // Indicador de carga

    // Cargar datos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDocuments(); // Obtener datos del servidor
                setFormData(response.data); // Usar la clave `data` del objeto de respuesta
                setLoading(false); // Desactivar el indicador de carga
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNavigation = (destination) => {
      onNavigate(destination, formData); // Navega a la página correspondiente
    };
  

    if (loading) {
        return <LoadingPage />;
    }

    if (!formData) {
        return <p>Error al cargar los datos.</p>;
    }

    // Procesar las categorías dinámicamente a partir de formData
    const categories = formData.sections.map((section) => ({
        title: section.name, // Toma el nombre de la sección como título
        items: section.subsections.map((subsection) => subsection.name), // Extrae los nombres de las subsecciones como items
    }));

    return (
        <div className={styles.container}>
            <div className={styles['container-dominios']}>
                <div className={styles.header}>
                    <h1>Centro de documentación</h1>
                    <p>A continuación encontrarás más de 40 documentos descargables para cubrir todas tus necesidades sobre protección de datos que necesites.</p>
                </div>

                <div className={styles['search-bar']}>
                    <div className={styles.featuredSection}>
                        <div className={styles.featuredImage}></div>
                        <div className={styles.featuredInfo}>
                            <h2>Documento de Seguridad</h2>
                            <p>Este es el principal documento. Contiene las medidas de índole técnica y organizativa para garantizar la seguridad de los datos.</p>
                            <button className={styles.downloadButton}>Descargar PDF</button>
                        </div>
                    </div>

                    <div className={styles.mostDownloaded}>
                        <h3>Modelos más descargados</h3>
                        <ul>
                            <li>Carta de videovigilancia</li>
                            <li>Compromiso de confidencialidad - Empleados</li>
                            <li>Consentimiento datos biométricos - Empleados</li>
                            <li>Cláusula de información - Contratos</li>
                            <li>Encargado de tratamiento - Contratos</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.categories} onClick={() => handleNavigation("paginasDomumentos")}>
                    {categories.map((category, index) => (
                        <DocItems key={index} title={category.title} items={category.items} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocPage;
