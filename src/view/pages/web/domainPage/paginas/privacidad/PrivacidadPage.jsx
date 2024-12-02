import { useState, useEffect } from "react";
import styles from './Privacidad.module.css';
import CheckBoxFormat from '../../../../../utils/components/checkboxform/CheckBoxFormat';
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave';
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat';
import { getPrivacySettings, patchPrivacySettings  } from "../../../../../../data/datasource/remote/service/websites/privacy-settings/HandlesDomain";
import LoadingPage from '../../../../../utils/components/loadingpage/LoadingPage';

function PrivacidadPage({id}) {
  const [text, setText] = useState(""); // Para almacenar texto adicional
  const [purposes, setPurposes] = useState([]); // Estado dinámico para preguntas
  const [loading, setLoading] = useState(true); // Indicador de carga

    // Cargar datos al montar el componente
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getPrivacySettings(id);
              setPurposes(response.purposes);
              setText(response.additional_settings)
              setLoading(false);
          } catch (error) {
              alert("Error al cargar los datos:", error);
              setLoading(false);
          }
      };

      fetchData();
  }, [id]);

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (checkboxId, isSelected) => {
    setPurposes((prev) =>
      prev.map((purpose) =>
        purpose.id === checkboxId ? { ...purpose, is_active: isSelected } : purpose
      )
    );
  };

  // Manejar botón de guardar
  const handleSaveButton = async () => {
    const updatedData = purposes.map(({ ask, is_active }) => ({
      ask,
      is_active,
    }));

    const payload = {
      purposes: updatedData,
      additional_settings: text, // Agregar el valor del campo de texto
    };

    try {
      await patchPrivacySettings(id, payload);
      alert("Privacidad actualizadas correctamente.");
    } catch (error) {
      console.error("Error al guardar configuraciones:", error);
      alert("Error al guardar las configuraciones.");
    }
  };

  const handleChange = (event) => {
    setText(event.target.value); // Actualizar el estado de texto
  };


  if (loading) {
      return <LoadingPage/>;
  }

  if (!purposes) {
      return <p>Error al cargar los datos.</p>;
  }

  return (
    <div className={styles['container-caracteristicas']}>
        <>
          {/* Primer Texto */}
          <div className={styles['information']}>
            <h5>¿QUÉ ES LA POLÍTICA DE PRIVACIDAD?</h5>
            <p>
              Documento legal que, como empresario, debo tener para informar a mis clientes y usuarios sobre los medios a través de los cuales he obtenido sus datos de carácter personal y sobre el tratamiento que voy a realizar con ellos.
            </p>
          </div>

          {/* Segundo Texto */}
          <div className={styles['ask-format']}>
            <div className={styles['information']}>
              <h5>FINALIDADES DEL TRATAMIENTO</h5>
              <p className={styles['parrafo-preguntas']}>
                Señalar el motivo por el que se van a tratar los datos personales de los usuarios en la página web:
              </p>
              <CheckList purposes={purposes} onCheckboxChange={handleCheckboxChange} />
              <FieldTextFormat
                label="Otras finalidades:"
                value={text}
                onChange={handleChange}
              />
            </div>
          </div>
          <SaveButton onClick={handleSaveButton} />
        </>
    </div>
  );
}

function CheckList({ purposes, onCheckboxChange }) {
  return (
    <div className={styles['form-checklist']}>
      {purposes.map((purpose) => (
        <CheckBoxFormat
          key={purpose.id}
          formId={purpose.id}
          ask={purpose.ask}
          isSelected={purpose.is_active}
          updateState={onCheckboxChange} // Pasamos el callback al componente hijo
        />
      ))}
    </div>
  );
}

export default PrivacidadPage;