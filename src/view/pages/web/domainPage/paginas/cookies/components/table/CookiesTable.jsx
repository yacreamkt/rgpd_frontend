import React, { useState } from "react";
import styles from "./CookiesTable.module.css";
import FieldTextFormat from '../../../../../../../utils/components/fieldtextformat/FieldTextFormat'
import PopUpNuevaCookie from '../popup/PopUpNuevaCookie'

const CookiesTable = () => {
  const cookiesData = [
    { id: 1, cookie: "_gac_", duration: "90 días", platform: "Google", purpose: "Analítica" },
    { id: 2, cookie: "AMP_TOKEN", duration: "30 segundos a 1 año", platform: "Google", purpose: "Analítica" },
    { id: 3, cookie: "NID", duration: "6 meses", platform: "Google", purpose: "Personalización" },
    { id: 4, cookie: "nTpXe.resume", duration: "1 mes", platform: "Google", purpose: "Analítica" },
    { id: 5, cookie: "YSC", duration: "Al cerrar sesión", platform: "Google", purpose: "Analítica" },
    { id: 6, cookie: "VISITOR_INFO1_LIVE", duration: "8 meses", platform: "Google", purpose: "Analítica" },
    { id: 7, cookie: "SSID", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 8, cookie: "SID", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 9, cookie: "SAPISID", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 10, cookie: "PREF", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 11, cookie: "LOGIN_INFO", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 12, cookie: "HSID", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 13, cookie: "APISID", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 14, cookie: "_gid", duration: "24 horas", platform: "Google", purpose: "Publicidad comportamental" },
    { id: 15, cookie: "_gat", duration: "1 minuto", platform: "Google", purpose: "Publicidad comportamental" },
    { id: 16, cookie: "_ga", duration: "2 años", platform: "Google", purpose: "Analítica" },
    { id: 17, cookie: "_utmz", duration: "6 meses a partir de su instalación o actualización", platform: "Google", purpose: "Analítica" },
    { id: 18, cookie: "_utmc", duration: "Sesión", platform: "Google", purpose: "Analítica" },
    { id: 19, cookie: "_utmb", duration: "30 minutos", platform: "Google", purpose: "Analítica" },
    { id: 20, cookie: "_utma", duration: "2 años a partir de su instalación o actualización", platform: "Google", purpose: "Analítica" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Número de filas por página
  const [selectedCookies, setSelectedCookies] = useState([]); // IDs seleccionados
  const [selectAll, setSelectAll] = useState(false); // Estado del "Select All"

  // Cálculo de datos para la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = cookiesData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(cookiesData.length / rowsPerPage);

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejar selección/deselección de "Select All"
  const handleSelectAll = () => {
    if (selectAll) {
      // Deseleccionar todos los elementos visibles en la página actual
      const deselected = currentRows.map((row) => row.id);
      setSelectedCookies(selectedCookies.filter((id) => !deselected.includes(id)));
    } else {
      // Seleccionar todos los elementos visibles en la página actual
      const selected = currentRows.map((row) => row.id);
      setSelectedCookies([...new Set([...selectedCookies, ...selected])]);
    }
    setSelectAll(!selectAll);
  };

  // Manejar selección de una fila
  const handleCheckboxChange = (id) => {
    if (selectedCookies.includes(id)) {
      setSelectedCookies(selectedCookies.filter((cookieId) => cookieId !== id));
    } else {
      setSelectedCookies([...selectedCookies, id]);
    }
  };

  const handleAddUrl = (url) => {
    console.log("Cookie añadida:", url);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Cookies del sitio web</h2>
        <button className={styles.addCookieBtn} onClick={() => setIsPopupOpen(true)}>+ Nueva cookie</button>
          <PopUpNuevaCookie
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onAdd={handleAddUrl}
          />
      </div>
      <div className={styles["separator"]}></div>
      {/* Buscador y borrar */}
      <div className={styles.serch_delete}>
        <div className={styles["text-input"]}>
          <FieldTextFormat
            placeholderValue="🔍 Buscar..."
            // label="Ejemplo: 14 días naturales"
            // value={text}
            // onChange={handleChange}
            // row={true}
          />
        </div>
        <button className={styles.deleteBtn}>Borrar seleccionados</button>
      </div>
      <table className={styles.cookiesTable}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={currentRows.every((row) => selectedCookies.includes(row.id))}
                onChange={handleSelectAll}
              />
            </th>
            <th>Cookie</th>
            <th>Duración</th>
            <th>Plataforma</th>
            <th>Finalidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((cookie) => (
            <tr key={cookie.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCookies.includes(cookie.id)}
                  onChange={() => handleCheckboxChange(cookie.id)}
                />
              </td>
              <td>{cookie.cookie}</td>
              <td>{cookie.duration}</td>
              <td>{cookie.platform}</td>
              <td>{cookie.purpose}</td>
              <td>
                <button className={styles.editBtn}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {/* Botón para ir a la primera página */}
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {/* Números de página */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.paginationBtn} ${currentPage === index + 1 ? styles.active : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {/* Botón para ir a la última página */}
        <button
          className={styles.paginationBtn}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default CookiesTable;
