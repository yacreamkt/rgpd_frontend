import React, { useState, useEffect   } from 'react';
import QuestionsFormat from '../../../../../utils/components/radiobuttonformat/RadioButtonFormat';
import styles from './Caracteristicas.module.css';
import SaveButton from '../../../../../utils/components/savebutton/ButtonSave';
import FieldTextFormat from '../../../../../utils/components/fieldtextformat/FieldTextFormat';
import { getCharacteristicsId, putCharacteristicsId } from "../../../../../../data/datasource/remote/service/websites/caracteristicas/HandlesCharacteristics";
import LoadingPage from '../../../../../utils/components/loadingpage/LoadingPage';

function CaracteristicasPage({ domai, id }) {
    const [text, setText] = useState(domai);
    const [formData, setFormData] = useState(null); // Inicialmente vacío
    const [loading, setLoading] = useState(true); // Indicador de carga

    // Cargar datos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCharacteristicsId(id); // Obtener datos del servidor
                setFormData(response.datos.configuration); // Inicializar formData con la configuración
                setLoading(false); // Desactivar el indicador de carga
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (event) => {
        setText(event.target.value);
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

    const handleSaveButton = async () => {
        try {
            console.log("Datos a enviar:", formData);
            await putCharacteristicsId(id, formData); // Pasar formData con los cambios
            alert("Datos guardados con éxito");
        } catch (error) {
            console.error("Error al guardar los datos:", error);
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
                <h5>LEGISLACIÓN VIGENTE</h5>
                <p>
                    Toda web que realiza actividades comerciales en España debería cumplir las siguientes leyes: Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD) y Ley de Servicios de la Sociedad de la Información (LSSI).
                </p>
            </div>

            {/* Características de la web */}
            <div className={styles['information']}>
                <h5>CARACTERÍSTICAS DE LA WEB</h5>
                <FieldTextFormat
                    label="Datos de autorización"
                    value={text}
                    onChange={handleChange}
                    row={true}
                />
            </div>

            {/* Comercio electrónico */}
            <div className={styles['ask-format']}>
                <p className={styles['enunciado']}>Comercio electrónico:</p>
                <div className={styles['form-desing']}>
                    <QuestionsFormat
                        ask="¿Se pueden realizar compras o contrataciones en el sitio web?"
                        options={['Si', 'No']}
                        formId="Comercio electrónico 1"
                        selectedValue={formData.comercio_electronico.compras_contrataciones_disponibles}
                        onChange={(value) =>
                            handleQuestionChange('comercio_electronico', 'compras_contrataciones_disponibles', value)
                        }
                    />
                    <div
                        className={`${styles['additional-questions']} ${
                            formData.comercio_electronico.compras_contrataciones_disponibles === 'Si'
                                ? styles['visible']
                                : styles['hidden']
                        }`}
                    >
                        <QuestionsFormat
                            ask="¿Qué ofrece en su tienda online?"
                            options={['Productos', 'Servicios']}
                            formId="Comercio electrónico 2"
                            selectedValue={formData.comercio_electronico.oferta_tienda_online}
                            onChange={(value) =>
                                handleQuestionChange('comercio_electronico', 'oferta_tienda_online', value)
                            }
                        />
                        <QuestionsFormat
                            ask="¿Tiene contratado un servicio de mensajería?"
                            options={['Si', 'No']}
                            formId="Comercio electrónico 3"
                            selectedValue={formData.comercio_electronico.servicio_mensajeria_contratado}
                            onChange={(value) =>
                                handleQuestionChange('comercio_electronico', 'servicio_mensajeria_contratado', value)
                            }
                        />
                    </div>
                    <div
                        className={`${styles['space-no']} ${
                            formData.comercio_electronico.compras_contrataciones_disponibles === 'No'
                                ? styles['active']
                                : ''
                        }`}
                    ></div>
                </div>
            </div>

            {/* Servidor */}
            <div className={styles['ask-format']}>
                <p className={styles['enunciado']}>Servidor:</p>
                <div className={styles['form-desing']}>
                    <QuestionsFormat
                        ask="Propiedad del servidor:"
                        options={['Contratado a proveedor de hosting', 'Propio']}
                        formId="Servidor 3"
                        selectedValue={formData.servidor.propiedad}
                        onChange={(value) =>
                            handleQuestionChange('servidor', 'propiedad', value)
                        }
                    />
                    <QuestionsFormat
                        ask="Ubicación física del servidor"
                        options={['España', 'Europa', 'EEUU', 'Otro país']}
                        formId="Servidor 4"
                        selectedValue={formData.servidor.ubicacion_fisica}
                        onChange={(value) =>
                            handleQuestionChange('servidor', 'ubicacion_fisica', value)
                        }
                    />
                    <p className={styles['link-ip']}>
                      Para conocer el país haga
                      <a
                        className={styles['link-ip-a']}
                        href="https://check-host.net/ip-info?host=www.yacrea.com"
                        target="_blank" 
                        rel="noopener noreferrer"
                        >
                          clic aquí
                      </a>
                    </p>
                </div>
            </div>

            {/* Seguridad */}
            <div className={styles['ask-format']}>
                <p className={styles['enunciado']}>Seguridad:</p>
                <div className={styles['form-desing']}>
                    <QuestionsFormat
                        ask="¿El sitio web tiene instalado un certificado SSL?"
                        options={['Si', 'No']}
                        formId="Seguridad 1"
                        selectedValue={formData.seguridad.certificado_ssl_instalado}
                        onChange={(value) =>
                            handleQuestionChange('seguridad', 'certificado_ssl_instalado', value)
                        }
                    />
                     <p className={styles['link-ip']}>Dispone de certificado si la URL comienza por "https://" en vez de "http://"</p>
                </div>
            </div>

            <SaveButton onClick={handleSaveButton} />
        </div>
    );
}

export default CaracteristicasPage;
