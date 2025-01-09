import React, { useState } from "react";
import styles from '../../PaginasDomumentos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function MenuDocumentos({ menuItems, onDocumentSelect, onNavigate }) {
  const [activeItem, setActiveItem] = useState(null); // Elemento seleccionado
  const [expandedItem, setExpandedItem] = useState(null); // Elemento con submenú desplegado

  const handleItemClick = (item) => {
    setActiveItem(item); // Actualiza el elemento activo
    setExpandedItem(item === expandedItem ? null : item); // Alterna el desplegado
  };

  const handleSubItemClick = (title, subitem) => {
    onDocumentSelect(title, subitem); // Llama a la función pasada desde el padre
  };

  const handleNavigation = (back) => {
    onNavigate(back, null, null, null);
  }

  return (
    <div className={styles.sidebar}>
      {/* ⬅ */}
      <p className={styles.backLink} onClick={() => handleNavigation("documentacion")} >◀️ Centro de Documentación</p> 
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.title}
            className={`${styles.menuItem} ${activeItem === item.title ? styles.active : ""}`}
            onClick={() => handleItemClick(item.title)}
          >
            <div className={styles.menuHeader}>
              {item.title}
              <FontAwesomeIcon
                icon={expandedItem === item.title ? faMinus : faPlus}
                className={styles.toggleIcon}
              />
            </div>
            {expandedItem === item.title && (
              <ul className={styles.submenu}>
                {item.subitems.map((subitem, index) => (
                  <li
                    key={index}
                    className={styles.submenuItem}
                    onClick={() => handleSubItemClick(item.title, subitem)}
                  >
                    {subitem}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDocumentos;
