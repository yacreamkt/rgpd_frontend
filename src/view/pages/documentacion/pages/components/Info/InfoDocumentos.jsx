import { useEffect, useState } from 'react';
import styles from '../../PaginasDomumentos.module.css';
// import path from '../../../../../utils/docsText'

function InfoDocumentos({ title, subitems }) {
  const [documentData, setDocumentData] = useState([]);

  useEffect(() => {
    // Formar la ruta al archivo JSON basado en `title` y `subitems`
    const folderName = title;
    const fileName = `${subitems}.json`;
    const filePath = `/docsText/${folderName}/${fileName}`;

    // Cargar los datos del archivo JSON
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setDocumentData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, [title, subitems]);

  return (
    <>
      {/* Main Content */}
      <div className={styles.mainContent}>
        <h2 className={styles.title}>
          {title} › {subitems}
        </h2>
        <div className={styles.content}>
          {documentData.map((item, index) => (
            <div key={index}>
              <h3>{item.subtitulo}</h3>
              {Array.isArray(item.content) ? (
                <ul>
                  {item.content.map((listItem, idx) => (
                    <li key={idx}>{listItem}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InfoDocumentos;
