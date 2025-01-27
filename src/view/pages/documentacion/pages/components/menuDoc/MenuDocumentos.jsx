import React, { useState } from "react";
import styles from './MenuDocumentos.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function MenuDocumentos({ menuItems, onDocumentSelect, onNavigate }) {
  const [activeItem, setActiveItem] = useState(null); 
  const [expandedItem, setExpandedItem] = useState(null); 
  const [selectedSubItem, setSelectedSubItem] = useState(null); // Nuevo estado para el subítem seleccionado

  const handleItemClick = (itemTitle) => {
    setActiveItem(itemTitle);
    setExpandedItem(prev => (prev === itemTitle ? null : itemTitle));
  };

  const handleSubItemClick = (e, title, subitem) => {
    e.stopPropagation(); 
    setActiveItem(title);
    setExpandedItem(title); 
    setSelectedSubItem(subitem); // Actualiza el subítem seleccionado
    onDocumentSelect(title, subitem);
  };

  const handleNavigation = (back) => {
    onNavigate(back, null, null, null);
  };

  return (
    <div className={styles.sidebar}>
      <p className={styles.backLink} onClick={() => handleNavigation("documentacion")}>
        ◀️ Centro de Documentación
      </p>
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
            <ul
              className={`${styles.submenu} ${expandedItem === item.title ? styles.expanded : ""}`}
            >
              {item.subitems.map((subitem, index) => (
                <li
                  key={index}
                  className={`${styles.submenuItem} ${
                    selectedSubItem === subitem ? styles.selected : ""
                  }`} // Aplica la clase si el subítem está seleccionado
                  onClick={(e) => handleSubItemClick(e, item.title, subitem)}
                >
                  {subitem}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDocumentos;
