// Header.js
import React, { useState } from "react";
import icono from "../../../../assets/icono.png";
import Menu from "./Menu";
import "./Header.css";
import "./Sidebar.css";
import ProfileOptions from "./components/ProfileOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faX } from "@fortawesome/free-solid-svg-icons";

function Header({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // AÑADE este estado para controlar el item activo
  const [activeItem, setActiveItem] = useState('WEB');

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

  // AÑADE este método para cambiar de item y navegar
  // Lo usará el <Menu /> en vez de tener su propio estado.
  const handleMenuItemClick = (page) => {
    onNavigate(page);
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
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Menú inferior en desktop */}
      <div className={`header__row header__bottom ${sidebarOpen ? "hidden" : ""}`}>
        {/*
          Pasamos:
          - className
          - activeItem (quién está activo)
          - setActiveItem (para actualizar el activo)
          - onItemClick (para navegar)
        */}
        <Menu
          className="header__menu__nav"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onItemClick={handleMenuItemClick}
        />
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
          <Menu
            className="sidebar__menu"
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            onItemClick={(page) => {
              handleMenuItemClick(page);
              toggleSidebar(); // Cerramos el sidebar al navegar
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
