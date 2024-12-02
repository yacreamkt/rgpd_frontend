import React from 'react';
import styles from './TextosLegales.module.css';
import ContainerOptions from './components/ContenedorOpciones';
import texts from './texts.json';

function TextosLegalesPage({ setActiveContent }) {
    const items = texts.TextosLegalesItems;

    const handleButtonClick = (action, title) => {
        if (action === '⚙️ Configurar') {
            setActiveContent(title); // Cambia la página activa en el padre
        } else if (action.startsWith('⬇️')) {
            alert(`Acción: ${action}`);
        }
    };

    return (
        <div className={styles['textos-legales-container']}>
            <div className={styles['columna1']}>
                <p>
                    A continuación encontrará paso a paso qué acciones deberá realizar para que su página web cumpla la normativa. A medida que vaya completando cada paso se irá desbloqueando el siguiente.
                </p>
                {Object.keys(items).map((key) => {
                    const item = items[key];
                    const buttons = Object.values(item).filter(value => value.startsWith('⬇️') || value.startsWith('⚙️'));
                    const buttonActions = buttons.map(button => () => handleButtonClick(button, item.title));

                    return (
                        <ContainerOptions
                            key={key}
                            title={item.title}
                            text={item.text}
                            buttons={buttons}
                            buttonActions={buttonActions}
                        />
                    );
                })}
            </div>
            <div className={styles['columna2']}>
                <p>Notificaciones</p>
            </div>
        </div>
    );
}

export default TextosLegalesPage;
