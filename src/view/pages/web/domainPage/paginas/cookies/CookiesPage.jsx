import React from 'react';
import styles from './Cookies.module.css'
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'
import CookiesTable from "./components/table/CookiesTable";

function CookiesPage({ setActiveContent }) {

  const handleSaveButton = () => {
    console.log("Guardado:");
    setActiveContent('Textos legales');
  };

  return (
    <div className={styles['container-caracteristicas']}>
      {/* Primer Texto */}
      <div className={styles['information']}>
        <h5>¿QUÉ SON LAS COOKIES?</h5>
        <p>
          Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información. Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información obtenida, se pueden utilizar para reconocer al usuario y mejorar el servicio ofrecido.
        </p>
      </div>

      {/* Pregunta*/}
      <div className={styles['cookies-question']}>
        <QuestionsFormat
          ask="¿Su página dispone de Cookies?"
          options={["Si", "No"]}
          formId="Tiene Cookies?"
        />
      </div>

      {/* Lista Cookies del sitio web */}
      <CookiesTable/>


      <SaveButton onClick={handleSaveButton} />
    </div>
  );
}
export default CookiesPage;
