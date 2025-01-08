import ApiConfig from "../../../../../api/ApiConfig.js";
import requestOptionsDefault from './legalNotices.json';

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