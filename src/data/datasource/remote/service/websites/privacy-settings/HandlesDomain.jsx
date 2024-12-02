import ApiConfig from "../../../../../api/ApiConfig.js";
import requestOptionsDefault from './requestOptions.json';
// const { toGetWebsitePrivacitySettings } = require("../../../../../../domain/models/websites/GetWebsitePrivacitySettings.js");

// Registrar privacy-settings Default
export const postPrivacySettingsDefault = async (id) => {
  const url = `${ApiConfig.BASE_URL}/privacy-settings/${id}/create_privacy_settings/`;

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

// Registrar Privacy Settings
export const getPrivacySettings = async (id) => {
    const url = `${ApiConfig.BASE_URL}/privacy-settings/${id}/get_privacy_configuration/`;

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
        return jsonData.datos.privacy_settings // Convierte el JSON a un objeto estructurado
    } catch (error) {
        throw error; // Maneja errores de red o del backend
    }
};


// Por ahora toco usar el post ya que el patch no deja modificar el additional_settings
// Actualizar Características
export const patchPrivacySettings = async (id, updatedData) => {
    // const url = `${ApiConfig.BASE_URL}/privacy-settings/${id}/update_privacy_settings/`;
    const url = `${ApiConfig.BASE_URL}/privacy-settings/${id}/create_privacy_settings/`;
  
    try {
      const response = await fetch(url, {
        // method: "PATCH",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Serializar correctamente los datos
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }
  
      return await response.json(); // Devolver la respuesta del servidor
    } catch (error) {
      console.error("Error en patchPrivacySettings:", error);
      throw error; // Lanzar el error para ser manejado en el componente
    }
};
  