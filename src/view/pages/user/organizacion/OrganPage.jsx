import styles from './OrganPage.module.css';
import React, { useState } from "react";
import FieldTextFormat from "../../../utils/components/fieldtextformat/FieldTextFormat";
import RadioButtonFormat from '../../../utils/components/radiobuttonformat/RadioButtonFormat';
import Dropdown from '../../../utils/components/dropdown/DropDown';

function OrganPage({ onNavigate }) {
  const [rSocial, setRsocial] = useState("Yacrea S.L.");
  const [nifCif, setnifCif] = useState("B02975340");
  const [email, setEmail] = useState("info@yacrea.com");
  const [telefono, setTelefono] = useState("910312386");
  const [nombre, setNombre] = useState("Luis Miguel Llamas Ayllón");
  const [dni, setDni] = useState("48157248D");
  const [direccion, setDireccion] = useState("C/ Águilas, 2");
  const [localidad, setLocalidad] = useState("Pinto");
  const [cp, setCp] = useState("28320");
  const [provincia, setProvincia] = useState("Madrid");
  const [authorization, setAuthorization] = useState("No"); // Maneja "Sí" o "No"
  const [profesion, setProfesion] = useState("No"); // Maneja "Sí" o "No"

  const handleNavigation = (destination) => {
    onNavigate(destination); // Navega a la página correspondiente
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <h2 className={styles.title}>Organización</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}></div>
            <h3 className={styles.companyName}>Luis Miguel Llamas Ayllón.</h3>
            <p className={styles.email}>miguel@yacrea.com</p>
          </div>
          <nav className={styles.navigation}>
            <p onClick={() => handleNavigation("perfil")}>Perfil</p>
            <p onClick={() => handleNavigation("organizacion")}>Organización</p>
            <p>Facturación</p>
          </nav>
        </div>
        <div className={styles.rightPanel}>
          <h3>Datos organización</h3>
          <form className={styles.form}>
            <div className={styles['form-row']}>
              <div className={styles['form-column']}>
                  <FieldTextFormat
                      label="Razón social"
                      value={rSocial}
                      onChange={(e) => setRsocial(e.target.value)}
                      placeholderValue="Introduce la Razón social"
                      row={true}
                  />
                  <FieldTextFormat
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholderValue="Introduce tu email"
                      row={true}
                  />
                  <Dropdown
                      label="Actividad"
                      row={true}
                  />
              </div>
              <div className={styles['form-column']}>
                <FieldTextFormat
                      label="NIF/CIF"
                      value={nifCif}
                      onChange={(e) => setnifCif(e.target.value)}
                      placeholderValue="Introduce tus apellidos"
                      row={true}
                  />
                  <FieldTextFormat
                      label="Teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholderValue="Introduce tu teléfono"
                      row={true}
                  />
              </div>
            </div>

            <h3>Responsable</h3>
            <div className={styles['form-row']}>
                <FieldTextFormat
                    label="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    row={true}
                />
            </div>

            <h3>Domicilio social</h3>
            <div className={styles['form-row']}>
              <div className={styles['form-column']}>
                <FieldTextFormat
                    label="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="Localidad"
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    row={true}
                />
              </div>
              <div className={styles['form-column']}>
                <FieldTextFormat
                    label="C.P."
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="Provincia"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                />
              </div>
            </div>

            <h3>Datos de inscripción en el Registro Mercantil</h3>
            <div className={styles['form-row']}>
              <div className={styles['form-column']}>
                <FieldTextFormat
                    label="Provincia"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="Sección"
                    // value={localidad}
                    // onChange={(e) => setLocalidad(e.target.value)}
                    row={true}
                />
              </div>
              <div className={styles['form-column']}>
                <FieldTextFormat
                    label="Libro/Tomo"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="Hoja"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                />
              </div>
              <div className={styles['form-column']}>
                <FieldTextFormat
                    label="Folio"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                />
                <FieldTextFormat
                    label="Inscripción"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                />
              </div>
            </div>

            <h3>¿Su actividad está sujeta a autorización administrativa?</h3>
            <RadioButtonFormat
              ask="Autorización administrativa"
              options={["Si", "No"]}
              formId="AUTORIZACIÓN_ADMINISTRATIVA_PREVIA"
              row={true}
              selectedValue={authorization}
              onChange={(value) => setAuthorization(value)} // Actualiza el estado al seleccionar
            />
            <div
              className={`${styles['additional-questions']} ${
                authorization === 'Si' ? styles['visible'] : styles['hidden']
              }`}
            >
              {/* Contenido adicional para "Sí" */}
              <div className={styles['form-column-questions-authorization']}>
                <FieldTextFormat
                    label="Datos de autorización"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Órgano competente de la supervisión"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                    center={true}
                />
              </div>
            </div>

            <h3>¿Ejerce una profesión regulada?</h3>
            <RadioButtonFormat
              ask="Profesión regulada"
              options={["Si", "No"]}
              formId="AUTORIZACIÓN_ADMINISTRATIVA_PREVIA"
              row={true}
              selectedValue={profesion}
              onChange={(value) => setProfesion(value)} // Actualiza el estado al seleccionar
            />
            <div
              className={`${styles['additional-questions']} ${
                profesion === 'Si' ? styles['visible'] : styles['hidden']
              }`}
            >
              {/* Contenido adicional para "Sí" */}
              <div className={styles['form-column-questions-profesion']}>
                <FieldTextFormat
                    label="Colegio profesional al que pertenezca"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Nº de colegiado"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Título académico oficial o profesional"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Estado de la UE en el que se expidió dicho título"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Normas profesionales aplicables al ejercicio de su profesión"
                    // value={cp}
                    // onChange={(e) => setCp(e.target.value)}
                    row={true}
                    center={true}
                />
                <FieldTextFormat
                    label="Medios a través de los cuales se puedan conocer las anteriores normas"
                    // value={provincia}
                    // onChange={(e) => setProvincia(e.target.value)}
                    row={true}
                    center={true}
                />
              </div>
            </div>


            <div className={styles['center-button']}>
                <button type="submit" className={styles.saveButton}>Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default OrganPage;
