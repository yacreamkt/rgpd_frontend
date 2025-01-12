import React, { useState, useEffect   } from 'react';
import { patchLegalNoticesId, getLegalNoticesId } from "../../../../../../data/datasource/remote/service/websites/legal-notices/HandlesLegalNotices";
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave'
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat'
import RadioButtonFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat'
import styles from './AvisoLegal.module.css'
import LoadingPage from '../../../../../utils/components/loadingpage/LoadingPage';


function AvisoLegalPage ({id, setActiveContent}) {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

    // Cargar datos al montar el componente
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await getLegalNoticesId(id);
              setFormData(response.datos.legal_info); // Inicializar formData con la configuración
              setLoading(false);
          } catch (error) {
              alert("Error al cargar los datos:", error);
              setLoading(false);
          }
      };

      fetchData();
  }, [id]);

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
          await patchLegalNoticesId(id, formData); // Pasar formData con los cambios
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
      <div className={styles['information']}>
        <h5>¿QUÉ ES EL AVISO LEGAL?</h5>
        <p>
          El aviso legal es el documento que recoge las cuestiones que la Ley de Servicios de la Información (LSSI) obliga a incluir prácticamente en todas las webs, concretamente en aquellos prestadores de servicios de la sociedad de la información, es decir personas físicas o jurídicas, que realicen actividades económicas por internet u otros medios telemáticos siempre que la dirección y gestión de su negocio esté centralizada en España o posea una sucursal, oficina o cualquier otro tipo de establecimiento permanente situado en España.
        </p>
      </div>
      
      {/* DATOS DE INSCRIPCIÓN EN EL REGISTRO */}
      <div className={styles['ask-format']}>
        <div className={styles['information']}>
          <h5>DATOS DE INSCRIPCIÓN EN EL REGISTRO</h5>
          <DatosInscripcionRegistro 
            formData={formData}
            handleFormsChange={handleFormsChange}
          />
        </div>
      </div>

      {/* AUTORIZACIÓN ADMINISTRATIVA PREVIA */}
      <div className={styles['ask-format']}>
        <div className={styles['information']}>
          <h5>AUTORIZACIÓN ADMINISTRATIVA PREVIA</h5>
          <p>
            Por actividad sujeta a autorización administrativa se entiende aquella empresa que para empezar a trabajar requiere de un permiso de una administración, por ejemplo: Agencias de viajes, servicios de alquiler turísticos, armerías, centros y servicios sanitarios, etc.
          </p>
          <RadioButtonFormat
            ask="¿Su actividad está sujeta a autorización administrativa?"
            options={["Si", "No"]}
            formId=" AUTORIZACIÓN ADMINISTRATIVA PREVIA 1"
            row={true}
            selectedValue={formData.administrative_authorization.authorization_yes_no}
            onChange={(value) =>
              handleFormsChange('administrative_authorization', 'authorization_yes_no', value)
            }
          />
          <div
            className={`${styles['additional-questions']} ${
              formData.administrative_authorization.authorization_yes_no === 'Si'
                ? styles['visible']
                : styles['hidden']
            }`}
          >
            <div className={styles["field-items"]}>
              <AutorizacionAdministrativaPrevia
                  formData={formData}
                  handleFormsChange={handleFormsChange}
              />
            </div>
          </div>

          <div
            className={`${styles['space-no']} ${
              formData.administrative_authorization.administrative_authorization === 'No'
                ? styles['active']
                  : ''
            }`}
          ></div>
        </div>
      </div>

      {/* DATOS DE PROFESIÓN REGULADA */}
      <div className={styles['ask-format']}>
        <div className={styles['information']}>
          <h5>DATOS DE PROFESIÓN REGULADA</h5>
          <p>
            Cumplimente los siguientes campos si realiza una profesión regulada, es decir, aquellas que sí se pueden ejercer mediante unas condiciones determinadas por una ley, norma legislativa o con unos estudios oficiales como por ejemplo: dentista, ingeniero, farmacéutico, arquitecto...
          </p>
          <RadioButtonFormat
            ask="¿Ejerce una profesión regulada?"
            options={["Si", "No"]}
            formId="DATOS DE PROFESIÓN REGULADA"
            row={true}
            selectedValue={formData.professional_association.professional_yes_no}
            onChange={(value) =>
              handleFormsChange('professional_association', 'professional_yes_no', value)
            }
          />
            <div
              className={`${styles['additional-questions']} ${
                formData.professional_association.professional_yes_no === 'Si'
                  ? styles['visible']
                  : styles['hidden']
              }`}
            >
            <div className={styles["field-items"]}>
              <DatosProfesionRegulada
                  formData={formData}
                  handleFormsChange={handleFormsChange}
              />
            </div>
          </div>
          <div
            className={`${styles['space-no']} ${
              formData.professional_association.ejerce_profesión_regulada === 'No'
                ? styles['active']
                  : ''
            }`}
          ></div>
        </div>
      </div>

      <SaveButton onClick={handleSaveButton} />
    </div>
  );
}

export default AvisoLegalPage;

function DatosProfesionRegulada({ formData, handleFormsChange }) {
  return (
      <>
          <FieldTextFormat
              label="Colegio profesional al que pertenezca"
              value={formData.professional_association.association_name}
              onChange={(e) =>
                handleFormsChange('professional_association', 'association_name', e.target.value)
              }
              row={false}
          />
          <FieldTextFormat
              label="Nº de colegiado"
              value={formData.professional_association.member_number}
              onChange={(e) =>
                handleFormsChange('professional_association', 'member_number', e.target.value)
              }
              row={false}
          />
          <FieldTextFormat
              label="Título académico oficial o profesional"
              value={formData.professional_association.professional_academic_title}
              onChange={(e) =>
                handleFormsChange('professional_association', 'professional_academic_title', e.target.value)
              }
              row={false}
          />
          <FieldTextFormat
              label="Estado de la UE en el que se expidió dicho título"
              value={formData.professional_association.eu_state}
              onChange={(e) =>
                handleFormsChange('professional_association', 'eu_state', e.target.value)
              }
              row={false}
          />
          <FieldTextFormat
              label="Normas profesionales aplicables al ejercicio de su profesión"
              value={formData.professional_association.professional_standards_applicable}
              onChange={(e) =>
                handleFormsChange('professional_association', 'professional_standards_applicable', e.target.value)
              }
              row={false}
          />
          <FieldTextFormat
              label="Medios a través de los cuales se puedan conocer las anteriores normas"
              value={formData.professional_association.means_through_which}
              onChange={(e) =>
                handleFormsChange('professional_association', 'means_through_which', e.target.value)
              }
              row={false}
          />
      </>
  );
}


function AutorizacionAdministrativaPrevia ({ formData, handleFormsChange }) {
  return(
    <>
      <FieldTextFormat
        label="Datos de autorización"
        value={formData.administrative_authorization.authorization_data}
        onChange={(e) =>
          handleFormsChange('administrative_authorization', 'authorization_data', e.target.value)
        }
        row={false}
      />
      <FieldTextFormat
        label="Órgano competente de la supervisión"
        value={formData.administrative_authorization.competent_supervisory_body}
        onChange={(e) =>
          handleFormsChange('administrative_authorization', 'competent_supervisory_body', e.target.value)
        }
        row={false}
      />
  </>
  );
}

function DatosInscripcionRegistro ({ formData, handleFormsChange }) {
  return (
    <div className={styles["registro-items"]}>
      <FieldTextFormat
        label="Provincia"
        value={formData.registration_data.province}
        onChange={(e) =>
          handleFormsChange('registration_data', 'province', e.target.value)
        }
        row={true}
      />
      <FieldTextFormat
        label={`Tomo e.j. "99999"`}
        value={formData.registration_data.tome}
        onChange={(e) =>
          handleFormsChange('registration_data', 'tome', e.target.value)
        }
        row={true}
      />
      <FieldTextFormat
        label={`Folio e.j. "10"`}
        value={formData.registration_data.folio}
        onChange={(e) =>
          handleFormsChange('registration_data', 'folio', e.target.value)
        }
        row={true}
      />
      <FieldTextFormat
        label={`Sección e.j. "3"`}
        value={formData.registration_data.section}
        onChange={(e) =>
          handleFormsChange('registration_data', 'section', e.target.value)
        }
        row={true}
      />
      <FieldTextFormat
        label={`Hoja e.j. "M-343434"`}
        value={formData.registration_data.sheet}
        onChange={(e) =>
          handleFormsChange('registration_data', 'sheet', e.target.value)
        }
        row={true}
      />
      <FieldTextFormat
        label={`Inscripción e.j. "1"`}
        value={formData.registration_data.registration}
        onChange={(e) =>
          handleFormsChange('registration_data', 'registration', e.target.value)
        }
        row={true}
      />
    </div>
  );
}