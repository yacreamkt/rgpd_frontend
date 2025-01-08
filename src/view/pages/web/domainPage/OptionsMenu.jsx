import React from 'react';

function OptionsMenu({ className, onItemClick, activeContent }) {
    const handleClick = (item) => {
        onItemClick(item); // Notifica a DomainPage qué ítem fue seleccionado
    };

    return (
        <nav className={className}>
            <ul>
                <li 
                    className={activeContent === 'Textos legales' ? 'active' : ''} 
                    onClick={() => handleClick('Textos legales')}>
                    Textos legales
                </li>
                <li 
                    className={activeContent === 'Características' ? 'active' : ''} 
                    onClick={() => handleClick('Características')}>
                    Características
                </li>
                <li 
                    className={activeContent === 'Aviso legal' ? 'active' : ''} 
                    onClick={() => handleClick('Aviso legal')}>
                    Aviso legal
                </li>
                <li 
                    className={activeContent === 'Privacidad' ? 'active' : ''} 
                    onClick={() => handleClick('Privacidad')}>
                    Privacidad
                </li>
                <li 
                    className={activeContent === 'Cookies' ? 'active' : ''} 
                    onClick={() => handleClick('Cookies')}>
                    Cookies
                </li>
                <li 
                    className={activeContent === 'Formularios' ? 'active' : ''} 
                    onClick={() => handleClick('Formularios')}>
                    Formularios
                </li>
                <li 
                    className={activeContent === 'Condiciones de contratacion' ? 'active' : ''} 
                    onClick={() => handleClick('Condiciones de contratacion')}>
                    Condiciones de contratacion
                </li>
            </ul>
        </nav>
    );
}

export default OptionsMenu;
