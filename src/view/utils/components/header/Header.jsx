import React, { useState } from "react";
import icono from "../../../../assets/icono.png";
import Menu from "./Menu";
import "./Header.css";
import "./Sidebar.css";

import ProfileOptions from "./components/ProfileOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Función para alternar la barra lateral
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Acción al hacer clic en el ícono de contacto
  const handleContactClick = () => {
    alert("Abriendo información de contacto...");
  };


  // Acción al hacer clic en desconectar
  const handleLogout = () => {
    // Limpiar datos de sesión y recargar página
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload(); // Recarga la página para redirigir al login
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
            />
        </div>
      </div>

      {/* Menú inferior en desktop */}
      <div className={`header__row header__bottom ${sidebarOpen ? "hidden" : ""}`}>
        <Menu className="header__menu__nav" onItemClick={(item) => console.log(item)} />
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
          <Menu className="sidebar__menu" onItemClick={(item) => console.log(item)} />
        </div>
      </div>
    </header>
  );
}

export default Header;
