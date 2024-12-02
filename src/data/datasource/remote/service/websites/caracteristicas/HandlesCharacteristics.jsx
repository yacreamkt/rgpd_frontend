import ApiConfig from "../../../../../api/ApiConfig.js";
import requestOptionsDefault from './requestOptions.json';
const { toWebsiteCharacteristicsIDGet } = require("../../../../../../domain/models/websites/GetWebsiteCharacteristicsId.js");

// Registrar Características Default
export const postRegisterCharacteristicsDefault = async (id) => {
    const url = `${ApiConfig.BASE_URL}/website-characteristics/${id}/create_configuration/`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestOptionsDefault),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

// Traer Características Default
export const getCharacteristicsId = async (id) => {
    const url = `${ApiConfig.BASE_URL}/website-characteristics/${id}/get_website_details/`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Convierte la respuesta a JSON
            throw errorData; // Lanza el contenido completo del error
        }

        const jsonData = await response.json(); // Si es exitoso, obtiene el JSON
        return toWebsiteCharacteristicsIDGet(JSON.stringify(jsonData)); // Convierte el JSON a un objeto estructurado
    } catch (error) {
        throw error; // Maneja errores de red o del backend
    }
};

// Actualizar Características
export const putCharacteristicsId = async (id, updatedData) => {
    const url = `${ApiConfig.BASE_URL}/website-characteristics/${id}/update_full_configuration/`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ configuration: updatedData }), // Enviar datos actualizados
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
