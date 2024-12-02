import styles from './ContainerOptions.module.css';

function ContainerOptions({ title, text, buttons, buttonActions }) {
    return (
        <div className={styles["contenedor-general"]}>
            <h3>{title}</h3>
            <p>{text}</p>
            <div>
                {buttons && buttons.map((button, index) => (
                    <button
                        key={index}
                        className={styles.configButton}
                        onClick={buttonActions ? buttonActions[index] : undefined} // Asigna la acción correspondiente
                    >
                        {button}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ContainerOptions;
