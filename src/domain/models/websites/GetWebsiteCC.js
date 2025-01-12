function toGetWebsiteCC(json) {
    return JSON.parse(json);
}

function getWebsiteCCToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "getWebsiteCCToJson": getWebsiteCCToJson,
    "toGetWebsiteCC": toGetWebsiteCC,
};
