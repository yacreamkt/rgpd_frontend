function toListWebsites(json) {
    return JSON.parse(json); // Convierte la cadena JSON a un objeto JS
}

// Util si voy a mandar datos al backend 

// function listWebsitesToJson(value) {
//     return JSON.stringify(value); // Convierte el objeto JS a una cadena JSON
// }

module.exports = {
    // listWebsitesToJson,
    toListWebsites,
};
