import React, { useState } from 'react';
import styles from './DomainPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Menu from './OptionsMenu';
import TextosLegalesPage from './paginas/textoslegales/TextosLegalesPage';
import CaracteristicasPage from './paginas/caracteristicas/CaracteristicasPage';
import AvisoLegalPage from './paginas/avisolegal/AvisoLegalPage';
import PrivacidadPage from './paginas/privacidad/PrivacidadPage';
import CookiesPage from './paginas/cookies/CookiesPage';
import FormulariosPage from './paginas/formularios/FormulariosPage';
import CCPage from './paginas/condicionesdecontratacion/CondicionesContratacionPage';
import PopUpDeleteDomain from './popup/PopUpDeleteDomain';

function DomainPage({ domain, onNavigate, domainId }) {
    const [activeContent, setActiveContent] = useState('Textos legales');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleItemClick = (item) => {
        setActiveContent(item); // Cambia el contenido según la opción seleccionada
    };

    const handleDomainDeleted = () => {
        setIsPopupOpen(false);
        onNavigate('web', null, null, null);
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'Características':
                return <CaracteristicasPage domai={domain} id={domainId} setActiveContent={setActiveContent} />;
            case 'Aviso legal':
                return <AvisoLegalPage id={domainId} setActiveContent={setActiveContent} />;
            case 'Privacidad':
                return <PrivacidadPage id={domainId} setActiveContent={setActiveContent} />;
            case 'Cookies':
                return <CookiesPage setActiveContent={setActiveContent} />;
            case 'Formularios':
                return <FormulariosPage setActiveContent={setActiveContent} />;
            case 'Condiciones de contratacion':
                return <CCPage id={domainId} setActiveContent={setActiveContent} />;
            default:
                return <TextosLegalesPage setActiveContent={setActiveContent} />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_header}>
                <div className={styles.name_back}>
                    <button onClick={() => onNavigate('web')} className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <h2 className={styles.title}>{domain}</h2>
                </div>
                <div>
                    <button
                        className={styles.deleteButton}
                        onClick={() => setIsPopupOpen(true)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <PopUpDeleteDomain
                        isOpen={isPopupOpen}
                        onClose={() => setIsPopupOpen(false)}
                        id={domainId}
                        onDeleted={handleDomainDeleted}
                    />
                </div>
            </div>
            <div className={styles['container-dominios']}>
            <div className={styles[`header__row__webMenu header__bottom`]}>
                <Menu
                    className="header__menu__nav"
                    onItemClick={handleItemClick} // Cambia el estado en DomainPage
                    activeContent={activeContent} // Pasa el estado actual al menú
                />
            </div>

                {renderContent()}
            </div>
        </div>
    );
}

export default DomainPage;
