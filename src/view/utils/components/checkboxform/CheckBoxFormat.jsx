import styles from './CheckBoxFormat.module.css';

function CheckBoxFormat({ ask, formId, isSelected, updateState }) {
    const handleOptionChange = () => {
        updateState(formId, !isSelected); // Actualiza el estado en el componente padre
    };

    return (
        <div className={styles['formulario-caracteristicas']}>
            <form className={styles['formulario-check']}>
                <input
                    type="checkbox"
                    id={formId}
                    name={formId}
                    value={ask}
                    checked={isSelected} // Vincula directamente con el estado del padre
                    onChange={handleOptionChange} // Manejador de cambio
                />
                <label className={styles['ask-text']} htmlFor={formId}>{ask}</label>
            </form>
        </div>
    );
}

export default CheckBoxFormat;
