import React, { useState, useEffect, useRef } from 'react';
import styles from './TextosLegales.module.css';
import ContainerOptions from './components/ContenedorOpciones';
import texts from './texts.json';
import ProgressBar from './components/ProgressBar';

function TextosLegalesPage({ setActiveContent }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [positions, setPositions] = useState([]); // Guarda posiciones dinámicas

  const containerRefs = useRef([]); // Refs para los elementos de la columna derecha

  const items = texts.TextosLegalesItems;

  // Calcula las posiciones dinámicas basadas en los elementos
  const updatePositions = () => {
    const newPositions = containerRefs.current.map((ref) =>
      ref
        ? ref.getBoundingClientRect().top +
          ref.getBoundingClientRect().height / 2 -
          containerRefs.current[0].getBoundingClientRect().top -
          containerRefs.current[0].getBoundingClientRect().height / 2
        : 0
    );
    setPositions(newPositions);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Actualiza las posiciones al montar el componente y al redimensionar la ventana
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const handleButtonClick = (action, title) => {
    if (action === '⚙️ Configurar') {
      setActiveContent(title);
    } else if (action.startsWith('⬇️')) {
      const pdfLinks = {
        'Aviso legal': '/docs/Aviso legal.pdf',
        'Privacidad': '/docs/Privacidad.pdf',
        'Cookies': '/docs/Cookies.pdf',
        '⬇️ Descargar condiciones': '/docs/Condiciones de contratación.pdf',
        '⬇️ Descargar términos': '/docs/Términos y condiciones contratación.pdf',
      };
      const link = pdfLinks[title];
      if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.download = link.split('/').pop();
        a.click();
      } else {
        alert('Archivo no encontrado.');
      }
    }
  };

  return (
    <div className={styles['textos-legales-container']}>
      <div className={styles['columna1']}>
        <p className={styles['parrafo']}>
          A continuación encontrará paso a paso qué acciones deberá realizar para que su página web cumpla la normativa. 
          A medida que vaya completando cada paso se irá desbloqueando el siguiente.
        </p>
        <div className={styles['fila-content']}>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={Object.keys(items).length}
            positions={positions}
            onStepClick={(step) => setCurrentStep(step)}
          />
          <ContentConfig
            items={items}
            handleButtonClick={handleButtonClick}
            containerRefs={containerRefs} // Pasa los refs
          />
        </div>
      </div>

      <div className={styles['columna2']}>
        <p>Notificaciones</p>
      </div>
    </div>
  );
}

export default TextosLegalesPage;

const ContentConfig = ({ items, handleButtonClick, containerRefs }) => {
  return (
    <div>
      {Object.keys(items).map((key, index) => {
        const item = items[key];
        const buttons = Object.values(item).filter(
          (value) => value.startsWith('⬇️') || value.startsWith('⚙️')
        );
        const buttonActions = buttons.map((button) => () =>
          handleButtonClick(button, item.title)
        );

        return (
          <div
            key={key}
            ref={(el) => (containerRefs.current[index] = el)} // Asigna la referencia
          >
            <ContainerOptions
              title={item.title}
              text={item.text}
              buttons={buttons}
              buttonActions={buttonActions}
            />
          </div>
        );
      })}
    </div>
  );
};
