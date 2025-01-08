// Header.js
import React, { useState } from "react";
import icono from "../../../../assets/icono.png";
import Menu from "./Menu";
import "./Header.css";
import "./Sidebar.css";
import ProfileOptions from "./components/ProfileOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";

function Header({ onNavigate }) { // Recibe onNavigate como prop
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleContactClick = () => {
    alert("Abriendo información de contacto...");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="header">
      {/* Primera fila: Logo e iconos */}
      <div className="header__row header__top">
        <div className="header__logo">
          {/* Icono de hamburguesa y barra lateral */}
          <div className="hamburger-icon" onClick={toggleSidebar}>
            ☰
          </div>
          <img src={icono} alt="Logo de Grupo Ático34" className="logotipo" />
        </div>
        <div className="header__icons">
          {/* Botón de contacto */}
          <span
            className="icon contact-icon"
            title="Contacto"
            onClick={handleContactClick}
          >
            <FontAwesomeIcon icon={faPhone} />
          </span>
          {/* Menú de opciones de perfil */}
          <ProfileOptions
            clientId="0122151"
            organizationName="Yacrea S.L."
            onLogout={handleLogout}
            onNavigate={onNavigate} // Pasa onNavigate
          />
        </div>
      </div>

      {/* Menú inferior en desktop */}
      <div className={`header__row header__bottom ${sidebarOpen ? "hidden" : ""}`}>
        <Menu className="header__menu__nav" onItemClick={onNavigate} /> {/* Pasa onNavigate */}
      </div>

      {/* Overlay */}
      <div
        className={`overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar__header">
          <button className="sidebar__close" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <div className="sidebar__content">
          <Menu className="sidebar__menu" onItemClick={onNavigate} /> {/* Pasa onNavigate */}
        </div>
      </div>
    </header>
  );
}

export default Header;
