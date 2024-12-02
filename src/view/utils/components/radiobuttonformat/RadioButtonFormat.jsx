import styles from './RadioButtonFormat.module.css';
import classNames from 'classnames';

function RadioButtonFormat({ ask, options, formId, row = false, onChange, selectedValue }) {
    const handleOptionChange = (option) => {
        if (onChange) {
            onChange(option); // Notifica el cambio al componente padre
        }
    };

    return (
        <div
            className={classNames(styles['formulario-caracteristicas'], {
                [styles['row']]: row,
                [styles['column']]: !row,
            })}
        >
            <p>{ask}</p>
            <form className={styles['formulario']}>
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`${formId}-option-${index}`}
                            name={formId}
                            value={option}
                            checked={selectedValue === option} // Marca la opción seleccionada
                            onChange={() => handleOptionChange(option)}
                        />
                        <label htmlFor={`${formId}-option-${index}`}>{option}</label>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default RadioButtonFormat;
