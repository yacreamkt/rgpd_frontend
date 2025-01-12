import { useState, useEffect } from "react";
import { getCondicionesContratacion, patchCondicionesContratacion } from "../../../../../../data/datasource/remote/service/websites/condicionesdecontratacion/HandlesCondicionesContratacion";
import styles from './CondicionesContratacion.module.css'
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'
import CheckBoxFormat from '../../../../../utils/components/checkboxform/CheckBoxFormat'
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat'
import LoadingPage from '../../../../../utils/components/loadingpage/LoadingPage';

function CCPage({id, setActiveContent }) {
    const [formData, setFormData] = useState(null);
    // const [purposes, setPurposes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar datos al montar el componente
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getCondicionesContratacion(id);
              setFormData(response); // Inicializar formData con la configuración
              setLoading(false);
          } catch (error) {
              alert("Error al cargar los datos:", error);
              setLoading(false);
          }
      };

      fetchData();
  }, [id]);

  const handleQuestionChange = (section, field, value) => {
    setFormData((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
    }));
  };
  
  // // Manejar cambios en los checkboxes
  // const handleCheckboxChange = (checkboxId, isSelected) => {
  //   setPurposes((prev) =>
  //     prev.map((purpose) =>
  //       purpose.id === checkboxId ? { ...purpose, is_active: isSelected } : purpose
  //     )
  //   );
  // };

  const handleTogglePurpose = (section, index) => {
    setFormData((prev) => {
      // Clonamos el array de 'purposes' dentro de la sección
      const newPurposes = [...prev[section].purposes];
      // Invertimos el valor de 'is_active'
      newPurposes[index].is_active = !newPurposes[index].is_active;
  
      return {
        ...prev,
        [section]: {
          ...prev[section],
          purposes: newPurposes,
        },
      };
    });
  };
  

  const handleSaveButton = async () => {
    try {
      await patchCondicionesContratacion(id, formData);
      alert("Datos guardados con éxito");
      setActiveContent('Textos legales');
    } catch (error) {
      alert("Error al guardar los datos");
    }
  };
  

  if (loading) {
    return <LoadingPage/>;
  }

  if (!formData) {
      return <p>Error al cargar los datos.</p>;
  }

  return (
    <div className={styles['container-caracteristicas']}>
      {/* Primer Texto */}
      <div className={styles['information']}>
        <h5>CONFIGURACIÓN DE LAS CONDICIONES DE CONTRATACIÓN Y TÉRMINOS DE USO</h5>
        <p className={styles['first-text']}>
          Comercio electrónico:
        </p>
      </div>

      {/* Preguntas*/}
      <div className={styles['formularios-question']}>
        <QuestionsFormat
          ask="¿Dispone de registro de usuarios?"
          options={["Si", "No"]}
          formId="registro-usuarios-cc"
          selectedValue={formData.comercio_electronico.registro_de_usuarios}
          onChange={(value) =>
              handleQuestionChange('comercio_electronico', 'registro_de_usuarios', value)
          }
        />

        {/* // */}
        <p>En mi web, realizo la venta de...</p>
        <div className={styles['productos-servicios']}>
          <CheckList
            purposes = {formData.comercio_electronico.purposes}
            // onCheckboxChange={handleCheckboxChange} 
            row={true}
          />
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
      <p>Desistimiento:</p>
      <div className={styles['check-desistimiento']}>
        <p>Opciones para excluir el desistimiento:</p>
        
        <CheckList
          purposes={formData.desistimiento.purposes}
          onCheckboxChange={(index) => handleTogglePurpose("desistimiento", index)}
          row={false}
        />

        {/* Aquí podrías añadir, por ejemplo, el plazo de desistimiento si es editable */}
        <p>{formData.desistimiento.plazo_de_desistimiento.pregunta}</p>
        <FieldTextFormat
          label={formData.desistimiento.plazo_de_desistimiento.ejemplo}
          // value={...}
          // onChange={...}
        />
      </div>
    </div>


      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
        <p>Pago:</p>
        <div className={styles['check-desistimiento']}>
          <p>Formas de pago</p>
          <CheckList 
            purposes={formData.pago.purposes}
            onCheckboxChange={(index) => handleTogglePurpose("pago", index)}
            row={true}
          />
        </div>
      </div>

      <div className={styles["separator"]}></div>


      <div className={styles['formularios-question']}>
        <p>Envío:</p>
        <div className={styles['check-desistimiento']}>
          <QuestionsFormat
            ask="¿Tiene contratado un servicio de mensajería?"
            options={["Si", "No"]}
            formId="envio?"
            row={true}
            selectedValue={formData.envio.contratado_servicio_mensajería}
            onChange={(value) =>
              handleQuestionChange('envio', 'contratado_servicio_mensajería', value)
            }
          />

          <div
            className={`${styles['additional-questions']} ${
              formData.envio.contratado_servicio_mensajería === 'Si'
                ? styles['visible']
                : styles['hidden']
              }`}
          >
            <p className={styles['metodos-envios']}>Métodos de envío</p>
            <div className={styles['productos-servicios']}>
              <CheckList 
                purposes={formData.envio.Métodos_de_envío.purposes}
                onCheckboxChange={(index) => handleTogglePurpose("envio", index)}
                row={true}
              />
            </div>
            <p>Plazo de entrega</p>
            <p className={styles['plazo-envio-mini-text']}>*Plazo que pasa desde el día de la confirmación del pedido, hasta que el cliente lo recibe.</p>
            <FieldTextFormat
              label="Ejemplo: 14 días naturales"
              // value={text}
              // onChange={handleChange}
              // row={true}
            />
          </div>
          <div
            className={`${styles['space-no']} ${
              formData.envio.contratado_servicio_mensajería === 'No'
                ? styles['active']
                : ''
            }`}
          ></div>   
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
        <p>Servicio atención al cliente:</p>
        <div className={styles['check-desistimiento']}>
          <FieldTextFormat
              label="Horario"
              // value={text}
              // onChange={handleChange}
              // row={true}
            />
          <FieldTextFormat
              label="Teléfono"
              // value={text}
              // onChange={handleChange}
              // row={true}
            />
          <FieldTextFormat
              label="Email"
              // value={text}
              // onChange={handleChange}
              // row={true}
            />
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <SaveButton onClick={handleSaveButton} />
    </div>
  );
}


export default CCPage;

function CheckList({ purposes, onCheckboxChange, row = false }) {
  return (
    <div
      className={`${styles['form-checklist']} ${
        row ? styles['row-layout'] : styles['column-layout']
      }`}
    >
      {purposes.map((purpose, index) => (
        <CheckBoxFormat
          key={`${purpose.ask}-${index}`} // clave única
          formId={`purpose-${index}`}     // formId único
          ask={purpose.ask}
          isSelected={purpose.is_active}
          updateState={() => onCheckboxChange(index)}
        />
      ))}
    </div>
  );
}
