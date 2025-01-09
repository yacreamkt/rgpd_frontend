import React, { useState } from "react";
import FieldTextFormat from "../../../utils/components/fieldtextformat/FieldTextFormat";
import styles from './PerfilPage.module.css';

function PerfilPage({ onNavigate }) {
  const [nombre, setNombre] = useState("Luis Miguel");
  const [apellidos, setApellidos] = useState("Llamas Ayllón");
  const [email, setEmail] = useState("miguel@yacrea.com");
  const [telefono, setTelefono] = useState("613041111");

  const handleNavigation = (destination) => {
    onNavigate(destination, null, null, null); // Navega a la página correspondiente
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <h2 className={styles.title}>Mi perfil</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}></div>
            <h3 className={styles.companyName}>Yacrea S.L.</h3>
            <p className={styles.email}>miguel@yacrea.com</p>
          </div>
          <nav className={styles.navigation}>
            <p onClick={() => handleNavigation("perfil")}>Perfil</p>
            <p onClick={() => handleNavigation("organizacion")}>Organización</p>
            <p>Facturación</p>
          </nav>
        </div>
        <div className={styles.rightPanel}>
          <h3>Datos personales</h3>
          <form className={styles.form}>
            <div className={styles['form-row']}>
              <div className={styles['form-column']}>
                  <FieldTextFormat
                      label="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholderValue="Introduce tu nombre"
                      row={true}
                      center={false}
                  />
                  <FieldTextFormat
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholderValue="Introduce tu email"
                      row={true}
                      center={false}
                  />
              </div>
              <div className={styles['form-column']}>
                  <FieldTextFormat
                      label="Apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      placeholderValue="Introduce tus apellidos"
                      row={true}
                      center={false}
                  />
                  <FieldTextFormat
                      label="Teléfono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholderValue="Introduce tu teléfono"
                      row={true}
                      center={false}
                  />
              </div>
            </div>

            <h3>Datos de acceso</h3>
            <div className={styles['form-row']}>
              <div className={styles['form-column']}>
                  <FieldTextFormat
                      label="Usuario"
                      value="B02975340"
                      onChange={() => {}}
                      placeholderValue=""
                      row={true}
                      center={false}
                  />

                  <FieldTextFormat
                      label="Contraseña"
                      value="*********"
                      onChange={() => {}}
                      placeholderValue=""
                      row={true}
                      center={false}
                  />
              </div>
                <button type="button" className={styles['modificar-clave']}>Modificar contraseña</button>
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

export default PerfilPage;
