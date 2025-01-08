import ApiConfig from "../../../../api/ApiConfig";

// Login 
export const getAllDocuments = async () => {
    const url = `${ApiConfig.BASE_URL}/documents/organized_documents/`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // Si el servidor devuelve un error, capturamos los detalles
            const errorData = await response.json();
            // eslint-disable-next-line no-throw-literal
            throw { status: response.status, ...errorData }; // Incluye el código de estado y el mensaje del error
        }

        // Procesar el cuerpo de la respuesta como JSON
        const result = await response.json();
        console.log("Datos obtenidos:", result); // Verifica aquí los datos
        return result;
    } catch (error) {
        // Re-lanza el error para manejarlo en el cliente
        throw error;
    }
};
