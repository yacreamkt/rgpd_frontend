import { useState } from "react";
import styles from './CondicionesContratacion.module.css'
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'
import CheckBoxFormat from '../../../../../utils/components/checkboxform/CheckBoxFormat'
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat'

function CCPage() {
  const [formData, setFormData] = useState({
    envio: {
      contratado_servicio_mensajería: 'Si',
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
          formId="registro de usuarios"
        />

        {/* // */}
        <p>En mi web, realizo la venta de...</p>
        <div className={styles['productos-servicios']}>
          <CheckBoxFormat
            key="1"
            formId="1"
            ask="Productos"
            updateState={() => {}}
          />
          <CheckBoxFormat
            key="2"
            formId="3"
            ask="Servicios"
            updateState={() => {}}
          />
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
        <p>Desistimiento:</p>
        <div className={styles['check-desistimiento']}>
          <p>Opciones para excluir el desistimiento:</p>
          <CheckListDesistimiento updateOptionState={() => {}}/>
        </div>
      </div>

      <div className={styles["separator"]}></div>

      <div className={styles['formularios-question']}>
        <p>Pago:</p>
        <div className={styles['check-desistimiento']}>
          <p>Formas de pago</p>
          <CheckListPago updateOptionState={() => {}}/>
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
              <CheckBoxFormat
                key="1"
                formId="1"
                ask="Servicio urgente"
                updateState={() => {}}
              />
              <CheckBoxFormat
                key="2"
                formId="3"
                ask="Envío gratuito"
                updateState={() => {}}
              />
              <CheckBoxFormat
                key="1"
                formId="1"
                ask="Punto de recogida"
                updateState={() => {}}
              />
              <CheckBoxFormat
                key="2"
                formId="3"
                ask="Otros"
                updateState={() => {}}
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


function CheckListPago ({updateOptionState}){
  return(
    <div className={styles['form-checklist']}>
    {[
    { id: "pregunta1", ask: "Tarjeta de crédito" },
    { id: "pregunta2", ask: "Transferencia bancaria" },
    { id: "pregunta3", ask: "Paypal" },
    { id: "pregunta4", ask: "Contrareembolso" },
    { id: "pregunta5", ask: "Otros" },
    ].map((option) => (
      <CheckBoxFormat
        key={option.id}
        formId={option.id}
        ask={option.ask}
        updateState={updateOptionState} // Pasamos el callback al componente hijo
      />
    ))}
    </div>
  );
}


function CheckListDesistimiento ({updateOptionState}){
  return(
    <div className={styles['form-checklist']}>
    {[
    { id: "pregunta1", ask: "Servicio ya iniciado y pérdida del derecho de desistimiento una vez ejecutado por completo" },
    { id: "pregunta2", ask: "Precio de los bienes o servicios depende de fluctuaciones del mercado financiero" },
    { id: "pregunta3", ask: "Bienes o productos confeccionados conforme a las especificaciones del consumidor o personalizados" },
    { id: "pregunta4", ask: "Productos que pueden caducar con rapidez" },
    { id: "pregunta5", ask: "Productos precintados y no aptos para ser devueltos por razones de higiene, que pueden desprecintarse tras la entrega" },
    { id: "pregunta6", ask: "Productos mezclados de forma indisociable con otros tras la entrega" },
    { id: "pregunta7", ask: "Productos que son bebidas alcohólicas con precio acordado en el momento de celebrar la venta" },
    { id: "pregunta8", ask: "Servicio de operaciones de reparación o mantenimiento a petición del consumidor, con uso de piezas adicionales" },
    { id: "pregunta9", ask: "Suministro de grabaciones sonoras o de vídeo precintadas o de programas informáticos que pueden ser desprecintados tras la entrega" },
    { id: "pregunta10", ask: "Suministro de prensa diaria, publicaciones periódicas o revistas (a excepción de los productos de suscripción)" },
    { id: "pregunta11", ask: "Contratación celebrada mediante subasta pública" },
    { id: "pregunta12", ask: "Servicios de alojamiento (distintos de vivienda), transporte de bienes, alquiler de vehículos, comida o servicios relacionados con actividades de esparcimiento con fecha específica" },
    { id: "pregunta11", ask: "Suministro de contenido digital que no se presta en un soporte material, habiendo comenzado la ejecución del servicio" },
    ].map((option) => (
      <CheckBoxFormat
        key={option.id}
        formId={option.id}
        ask={option.ask}
        updateState={updateOptionState} // Pasamos el callback al componente hijo
      />
    ))}
    </div>
  );
}
