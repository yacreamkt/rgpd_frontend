import React, { useState } from "react";
import styles from "./ProfileOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding, faChartBar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileOptions = ({ onLogout, clientId, organizationName, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleNavigation = (destination) => {
    setIsOpen(false);
    onNavigate(destination, null, null, null); // Navega a la página correspondiente
  };

  return (
    <div className={styles.profileOptions}>
      {/* Botón de perfil */}
      <div className={styles.profileIcon} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser} />
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className={styles.profileMenu}>
          <div className={styles.profileHeader}>
            <p>
              <strong>ID CLIENTE:</strong> {clientId}
            </p>
            <p>{organizationName}</p>
          </div>
          <ul className={styles.profileMenuList}>
            <li onClick={() => handleNavigation("perfil")}>
              <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
              <span>Perfil</span>
            </li>
            <li onClick={() => handleNavigation("organizacion")}>
              <FontAwesomeIcon icon={faBuilding} className={styles.menuIcon} />
              <span>Organización</span>
            </li>
            {/* <li onClick={() => handleNavigation("facturacion")}> */}
            <li>
              <FontAwesomeIcon icon={faChartBar} className={styles.menuIcon} />
              <span>Facturación</span>
            </li>
          </ul>
          <button className={styles.logoutButton} onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileOptions;
