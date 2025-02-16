// Menu.js
import React from 'react';

function Menu({ className, onItemClick, activeItem, setActiveItem }) {
  const handleClick = (item) => {
    // Actualiza el activeItem en el padre
    setActiveItem(item);

    // Mapeo de rutas
    const pageMap = {
      'INICIO': 'inicio',
      'TERCEROS': 'terceros',
      'EMPLEADOS': 'empleados',
      'TRATAMIENTOS': 'tratamientos',
      'RIESGOS': 'riesgos',
      'RECURSOS': 'recursos',
      'WEB': 'web',
      'DPO': 'dpo',
      'ACADEMY': 'academy',
      'DOCUMENTACIÓN': 'documentacion',
    };
    const page = pageMap[item] || 'web';

    // Llama al callback que navega
    onItemClick(page);
  };

  return (
    <nav className={className}>
      <ul>
        <li 
          className={activeItem === 'INICIO' ? 'active' : ''}
          onClick={() => handleClick('INICIO')}
        >
          INICIO
        </li>
        <li 
          className={activeItem === 'TERCEROS' ? 'active' : ''}
          onClick={() => handleClick('TERCEROS')}
        >
          TERCEROS
        </li>
        <li 
          className={activeItem === 'EMPLEADOS' ? 'active' : ''}
          onClick={() => handleClick('EMPLEADOS')}
        >
          EMPLEADOS
        </li>
        <li 
          className={activeItem === 'TRATAMIENTOS' ? 'active' : ''}
          onClick={() => handleClick('TRATAMIENTOS')}
        >
          TRATAMIENTOS
        </li>
        <li 
          className={activeItem === 'RIESGOS' ? 'active' : ''}
          onClick={() => handleClick('RIESGOS')}
        >
          RIESGOS
        </li>
        <li 
          className={activeItem === 'RECURSOS' ? 'active' : ''}
          onClick={() => handleClick('RECURSOS')}
        >
          RECURSOS
        </li>
        <li 
          className={activeItem === 'WEB' ? 'active' : ''}
          onClick={() => handleClick('WEB')}
        >
          WEB
        </li>
        <li 
          className={activeItem === 'DPO' ? 'active' : ''}
          onClick={() => handleClick('DPO')}
        >
          DPO
        </li>
        <li 
          className={activeItem === 'ACADEMY' ? 'active' : ''}
          onClick={() => handleClick('ACADEMY')}
        >
          ACADEMY
        </li>
        <li 
          className={activeItem === 'DOCUMENTACIÓN' ? 'active' : ''}
          onClick={() => handleClick('DOCUMENTACIÓN')}
        >
          DOCUMENTACIÓN
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
