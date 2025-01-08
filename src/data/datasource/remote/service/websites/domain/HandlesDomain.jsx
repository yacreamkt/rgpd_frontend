import ApiConfig from "../../../../../api/ApiConfig.js";
const { toListWebsites } = require("../../../../../../domain/models/websites/GetListWebsites.js");
const { toDeleteWebsite } = require("../../../../../../domain/models/websites/DeleteWebsite.js");

// Registrar dominio
export const postRegisterDomain = async (data) => {
    const url = `${ApiConfig.BASE_URL}/websites/register_website/`;

    try {
        const response = await fetch(url, {
            method: "POST", // Cambia a POST
            headers: {
                "Content-Type": "application/json", // Especifica el tipo de contenido
            },
            body: JSON.stringify(data), // Convierte el objeto `data` a un JSON string
        });

        // Si la respuesta no es exitosa, extrae y lanza el error del backend
        if (!response.ok) {
            const errorData = await response.json(); // Convierte la respuesta a JSON
            throw errorData; // Lanza el contenido completo del error
        }

        return response.json(); // Si es exitoso, retorna el JSON de la respuesta
    } catch (error) {
        // Si ocurre algún otro error de red, lánzalo directamente
        throw error;
    }
};

// Traes dominios
export const getRegisterDomains = async () => {
    const url = `${ApiConfig.BASE_URL}/websites/list_websites/`;

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
        return toListWebsites(JSON.stringify(jsonData));
    } catch (error) {
        throw error;
    }
};

// Delete dominio
export const deleteDomain = async (id) => {
    const url = `${ApiConfig.BASE_URL}/websites/${id}/delete_website/`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }

        const jsonResponse = await response.json();
        return toDeleteWebsite(JSON.stringify(jsonResponse));
    } catch (error) {
        throw error;
    }
};
