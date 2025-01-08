const ApiConfig = {
    BASE_URL: process.env.REACT_APP_BASE_URL,
};

export default ApiConfig;

// const ApiConfig = {
//     BASE_URL: process.env.REACT_APP_BASE_URL, // Carga desde el archivo .env
//     TIMEOUT: process.env.REACT_APP_TIMEOUT || 5000, // Usa el valor del .env o un valor predeterminado
//     HEADERS: {
//         "Content-Type": "application/json",
//         // Puedes incluir un token si es necesario, o también cargarlo desde el .env
//         Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN || "default_token"}`, 
//     },
// };

// export default ApiConfig;
