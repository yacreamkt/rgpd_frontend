import React, { useState } from "react";
import classNames from "classnames";
import styles from './DropDown.module.css';

const DropDown = ({ label, row = false, center = false}) => {
  const actividades = [
    "Arquitectura",
    "Asesoría, gestoría, contabilidad",
    "Asociación",
    "Carpintería",
    "Centro de estética",
    "Centro educativo",
    "Centro educativo (enseñanza reglada)",
    "Clínica dental",
    "Coaching",
    "Colegio profesional",
    "Comercio",
    "Comercio online",
    "Comunicación",
    "Comunidad de propietarios",
    "Construcción",
    "Consultoría",
    "Decoración e interiorismo",
    "Desconocida",
    "Detective",
    "Diseño/desarrollo web",
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div
      className={classNames(styles["field-text-format"], {
        [styles["row"]]: row, // Clase para fila
        [styles["column"]]: !row, // Clase para columna
      })}
    >
    <p className={classNames(styles["enunciado"], {
        [styles["center"]]: center,
        [styles["rigth"]]: !center,
      })}>
        {label}
    </p>
      <select
        className={styles["text-input"]}
        id="actividades-dropdown"
        value={selectedOption}
        onChange={handleSelect}

      >
        <option value="" disabled>
          Seleccionar una opción
        </option>
        {actividades.map((actividad, index) => (
          <option key={index} value={actividad}>
            {actividad}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
