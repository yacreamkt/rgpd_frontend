import ApiConfig from "../../../../api/ApiConfig";

// Login 
export const postLoginService = async (data) => {
    const url = `${ApiConfig.BASE_URL}/auth/login/`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Si el servidor devuelve un error, capturamos los detalles
            const errorData = await response.json();
            // eslint-disable-next-line no-throw-literal
            throw { status: response.status, ...errorData }; // Incluye el código de estado y el mensaje del error
        }

        return await response.json(); // Devuelve los datos si la solicitud fue exitosa
    } catch (error) {
        // Re-lanza el error para manejarlo en el cliente
        throw error;
    }
};
