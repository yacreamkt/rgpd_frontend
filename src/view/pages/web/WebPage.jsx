import React, { useState, useEffect } from "react";
import styles from './Web.module.css';
import PopUpNuevaWeb from "./popup/PopUpNuevaWeb";
import { getRegisterDomains } from "../../../data/datasource/remote/service/websites/domain/HandlesDomain";

function WebPages({ onNavigate }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [websites, setWebsites] = useState([]); // Estado para almacenar los sitios web
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual
  const itemsPerPage = 10; // Número de elementos por página

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const data = await getRegisterDomains(); // Llama al API

        // Ordenar los sitios por `updated_at` del más reciente al menos reciente
        const sortedWebsites = data.websites.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setWebsites(sortedWebsites); // Almacena los sitios web ordenados
      } catch (err) {
        setError("Error al cargar los sitios web");
        console.error(err);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchWebsites();
  }, []);

  const handleAddUrl = (newWebsite) => {
    // Agregar el nuevo sitio web al estado actual
    setWebsites((prevWebsites) => [newWebsite, ...prevWebsites]);
  };

  // Cálculo de los índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = websites.slice(indexOfFirstItem, indexOfLastItem);

  // Número total de páginas
  const totalPages = Math.ceil(websites.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <h2 className={styles.title}>Mis sitios web</h2>
        <div>
          <button
            className={styles.addButton}
            onClick={() => setIsPopupOpen(true)}
          >
            + Nueva web
          </button>
          <PopUpNuevaWeb
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onAdd={handleAddUrl} // Pasa la función handleAddUrl
          />
        </div>
      </div>
      <div className={styles['container-dominios']}>
        {loading && <p>Cargando...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Dominio</th>
                  <th>Última actualización</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((website) => (
                  <tr key={website.id}>
                    <td
                      className={styles['new-web']}
                      onClick={() => onNavigate('domain', website.domain, website.id, null)}
                    >
                      <div className={styles['texto-dominio']}>{website.domain}</div>
                    </td>
                    <td className={styles['texto-update']}>
                      {new Date(website.updated_at).toLocaleDateString()} {/* Convierte la fecha */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && ( // Solo muestra la paginación si hay más de una página
              <div className={styles.pagination}>
                {/* Botón Anterior */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &laquo; Anterior
                </button>

                {/* Números de Página */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? styles.activePage : ''}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Botón Siguiente */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Siguiente &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WebPages;
