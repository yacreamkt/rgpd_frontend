import React from 'react';
import styles from './TextosLegales.module.css';
import ContainerOptions from './components/ContenedorOpciones';
import texts from './texts.json';

function TextosLegalesPage({ setActiveContent }) {
    const items = texts.TextosLegalesItems;

    // Mapea las rutas de los documentos con los nombres
    const pdfLinks1 = {
        'Aviso legal': '/docs/Aviso legal.pdf',
        'Privacidad': '/docs/Privacidad.pdf',
        'Cookies': '/docs/Cookies.pdf',
    };
    // Mapea las rutas de los documentos con los nombres específicos
    const pdfLinks = {
        '⬇️ Descargar condiciones': '/docs/Condiciones de contratación.pdf',
        '⬇️ Descargar términos': '/docs/Términos y condiciones contratación.pdf'
    };

    const handleButtonClick = (action, title) => {
        if (action === '⚙️ Configurar') {
            setActiveContent(title); // Cambia la página activa en el padre
        } else if (action.startsWith('⬇️')) {
            const link1 = pdfLinks1[title];
            const link2 = pdfLinks[action]; // Busca el archivo según el nombre del botón
            if (link1) {
                // Descarga directa del archivo
                const a = document.createElement('a');
                a.href = link1;
                a.download = link1.split('/').pop(); // Nombre del archivo
                a.click();
            }else if (link2){
                if (link2) {
                    // Descarga directa del archivo
                    const a = document.createElement('a');
                    a.href = link2;
                    a.download = link2.split('/').pop(); // Nombre del archivo
                    a.click();
                }
            }else {
                alert('Archivo no encontrado.');
            }
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
