import ApiConfig from "../../../../../api/ApiConfig.js";
import requestOptionsDefault from './legalNotices.json';
const { toWebsiteLegalNotices } = require("../../../../../../domain/models/websites/GetWebsiteLegalNotices.js");

// Registrar legal-notices Default
export const postLegalNoticesDefault = async (id) => {
    const url = `${ApiConfig.BASE_URL}/legal-notices/${id}/create_legal_info/`;

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

// Traer legal-notices
export const getLegalNoticesId = async (id) => {
    const url = `${ApiConfig.BASE_URL}/legal-notices/${id}/get_legal_information/`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        const jsonData = await response.json();
        return toWebsiteLegalNotices(JSON.stringify(jsonData)); // Convierte el JSON a un objeto estructurado
    } catch (error) {
        throw error; // Maneja errores de red o del backend
    }
};

// Actualizar Características
export const patchLegalNoticesId  = async (id, updatedData) => {
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
