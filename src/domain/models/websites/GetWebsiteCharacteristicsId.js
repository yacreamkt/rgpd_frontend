function toWebsiteCharacteristicsIDGet(json) {
    return JSON.parse(json);
}

function websiteCharacteristicsIDGetToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "websiteCharacteristicsIDGetToJson": websiteCharacteristicsIDGetToJson,
    "toWebsiteCharacteristicsIDGet": toWebsiteCharacteristicsIDGet,
};
