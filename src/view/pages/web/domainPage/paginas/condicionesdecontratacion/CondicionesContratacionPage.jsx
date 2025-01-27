import { useState, useEffect } from "react";
import { getCondicionesContratacion, patchCondicionesContratacion } from "../../../../../../data/datasource/remote/service/websites/condicionesdecontratacion/HandlesCondicionesContratacion";
import styles from './CondicionesContratacion.module.css'
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'
import CheckBoxFormat from '../../../../../utils/components/checkboxform/CheckBoxFormat'
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat'
import LoadingPage from '../../../../../utils/components/loadingpage/LoadingPage';
import classNames from 'classnames';

function CCPage({ id, setActiveContent }) {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos al montar el componente
    useEffect(() => {
      window.scrollTo(0, 0);
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

  // Manejar cambios en los checkboxes comercio_electronico
  const handleCheckboxChange = (form, ask, isSelected) => {
    try {
    setFormData((prev) => ({
        ...prev,
        [form]: {
            ...prev[form],
            purposes: prev[form].purposes.map((purpose) =>
                purpose.ask === ask ? { ...purpose, is_active: isSelected } : purpose
            ),
        },
      }));
    } catch (error) {
      alert("Error al guardar los datos");
    }
  };

  const handleQuestionChange = (section, field, value) => {
    setFormData((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
    }));
  };


  // cambios valores formularios
  const handleFormsChange = (section, field, value) => {
    setFormData((prev) => ({
        ...prev,
        [section]: {
            ...prev[section],
            [field]: value,
        },
    }));
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
          formId="registro_usuarios?"
          selectedValue={formData.comercio_electronico.registro_de_usuarios}
          onChange={(value) =>
            handleQuestionChange('comercio_electronico', 'registro_de_usuarios', value)
          }
        />

        {/* // */}
        <p>En mi web, realizo la venta de...</p>
        <div className={styles['productos-servicios']}>
          <CheckList 
              form="comercio_electronico"
              purposes={formData.comercio_electronico.purposes}
              onCheckboxChange={handleCheckboxChange}
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
              form="desistimiento"
              purposes={formData.desistimiento.purposes}
              onCheckboxChange={handleCheckboxChange}
          />
          <p>Plazo de desistimiento</p>
          <FieldTextFormat
            label={
              <>
                *Plazo del que dispone el cliente desde la recepción del pedido, para desistir voluntariamente su compra.<br />
                Ejemplo: 14 días naturales<br />
              </>
            }
            value={formData.desistimiento.plazo_de_desistimiento}
            onChange={(e) =>
              handleFormsChange('desistimiento', 'plazo_de_desistimiento', e.target.value)
            }
          />
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
        <p>Pago:</p>
        <div className={styles['check-desistimiento']}>
          <p>Formas de pago</p>
          <CheckList 
              form="pago"
              purposes={formData.pago.purposes}
              onCheckboxChange={handleCheckboxChange}
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
                  form="envio"
                  purposes={formData.envio.purposes}
                  onCheckboxChange={handleCheckboxChange}
                  row={true}
              />
            </div>
            <p>Plazo de entrega</p>
            <p className={styles['plazo-envio-mini-text']}>*Plazo que pasa desde el día de la confirmación del pedido, hasta que el cliente lo recibe.</p>
            <FieldTextFormat
              label="Ejemplo: 14 días naturales"
              value={formData.envio.Plazo_de_entrega}
              onChange={(e) =>
                handleFormsChange('envio', 'Plazo_de_entrega', e.target.value)
              }
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
              value={formData.Servicio_atencion_cliente.Horario}
              onChange={(e) =>
                handleFormsChange('Servicio_atencion_cliente', 'Horario', e.target.value)
              }
              // row={true}
            />
          <FieldTextFormat
              label="Teléfono"
              value={formData.Servicio_atencion_cliente.Teléfono}
              onChange={(e) =>
                handleFormsChange('Servicio_atencion_cliente', 'Teléfono', e.target.value)
              }
              // row={true}
            />
          <FieldTextFormat
              label="Email"
              value={formData.Servicio_atencion_cliente.Email}
              onChange={(e) =>
                handleFormsChange('Servicio_atencion_cliente', 'Email', e.target.value)
              }
              // row={true}
            />
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <SaveButton onClick={handleSaveButton} />
    </div>
  );
}

function CheckList({ form, purposes, onCheckboxChange, row = false }) {
  return (
    <div
    className={classNames(styles['form-checklist'], {
        [styles['row']]: row,
        [styles['column']]: !row,
    })}
>
      {/* <div className={styles['form-checklist']}> */}
          {purposes.map((purpose) => (
              <CheckBoxFormat
                  key={purpose.ask} // Asegúrate de que 'ask' sea único dentro de cada formulario
                  formId={purpose.ask}
                  ask={purpose.ask}
                  isSelected={purpose.is_active}
                  updateState={(id, isSelected) => onCheckboxChange(form, id, isSelected)}
                  row={row}
              />
          ))}
      </div>
  );
}

export default CCPage;