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

              {/* Caso 1: content es un string */}
              {/* Caso 2: content es un array con posible texto + lista */}
              {typeof item.content === 'string' ? (
                <p className={styles['info-page']}>{item.content}</p>
              ) : Array.isArray(item.content) ? (
                <>
                  {/* Si es un array y tiene al menos 1 elemento */}
                  {item.content.length > 0 && (
                    <p className={styles['info-page']}>{item.content[0]}</p>
                  )}

                  {/* Si hay más de un elemento, interpretamos los siguientes como ítems de lista */}
                  {item.content.length > 1 && (
                    <ul>
                      {item.content.slice(1).map((listItem, idx) => (
                        <li key={idx}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InfoDocumentos;
