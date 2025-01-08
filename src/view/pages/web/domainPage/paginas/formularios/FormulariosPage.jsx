import { useState } from "react";
import styles from './Formularios.module.css'
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'


function FormulariosPage() {
  const [formData, setFormData] = useState({
    formulario: {
      tiene_formulario: 'Si',
    },
  });

  const handleQuestionChange = (section, field, value) => {
    setFormData((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
    }));
  };

  const handleSaveButton = () => {
    console.log("Guardado:");
  };

  return (
    <div className={styles['container-caracteristicas']}>
      {/* Primer Texto */}
      <div className={styles['information']}>
        <h5>CONFIGURACIÓN DE LOS FORMULARIOS</h5>
        <p className={styles['first-text']}>
          Formularios web:
        </p>
      </div>

      {/* Pregunta*/}
      <div className={styles['formularios-question']}>
        <QuestionsFormat
          ask="¿Su web tiene formularios?"
          options={["Si", "No"]}
          formId="Tiene Formularios?"
          row={true}
          selectedValue={formData.formulario.tiene_formulario}
          onChange={(value) =>
            handleQuestionChange('formulario', 'tiene_formulario', value)
          }
        />
      </div>

      <div
        className={`${styles['additional-questions']} ${
          formData.formulario.tiene_formulario === 'Si'
            ? styles['visible']
            : styles['hidden']
          }`}
      >
      <h5 className={styles['mensaje-formularios']}>
        A continuación encontrará ejemplos de los formularios más comunes de una página web. Por favor, seleccione aquellos que tenga la suya:
      </h5>

      {/* Lista Cookies del sitio web */}
      </div>
      <div
        className={`${styles['space-no']} ${
          formData.formulario.tiene_formulario === 'No'
            ? styles['active']
              : ''
        }`}
      ></div>

      <SaveButton onClick={handleSaveButton} />
    </div>
  );
}

export default FormulariosPage;
