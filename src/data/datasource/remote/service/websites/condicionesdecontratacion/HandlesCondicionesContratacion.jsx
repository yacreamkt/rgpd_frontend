import ApiConfig from "../../../../../api/ApiConfig.js";
import requestOptionsDefault from './requestOptions.json';
// const { toGetWebsiteCC } = require("../../../../../../domain/models/websites/GetWebsiteCC.js");


// Registrar Condiciones Contratacion
export const postHandlesCondicionesContratacionDefault = async (id) => {
    const url = `${ApiConfig.BASE_URL}/contract-conditions/${id}/create_contract_conditions/`;

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

// Traer Condiciones Contratacion
export const getCondicionesContratacion= async (id) => {
    const url = `${ApiConfig.BASE_URL}/contract-conditions/${id}/get_contract_conditions/`;

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
        // return toGetWebsiteCC(JSON.stringify(jsonData)); // Convierte el JSON a un objeto estructurado
        return jsonData.datos.commerce_settings.basic_settings;
    } catch (error) {
        throw error; // Maneja errores de red o del backend
    }
};

// Registrar Condiciones Contratacion
export const patchCondicionesContratacion= async (id, updatedData) => {
    const url = `${ApiConfig.BASE_URL}/contract-conditions/${id}/create_contract_conditions/`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
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