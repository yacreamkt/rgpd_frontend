function toDeleteWebsite(json) {
    return JSON.parse(json);
}

function deleteWebsiteToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "deleteWebsiteToJson": deleteWebsiteToJson,
    "toDeleteWebsite": toDeleteWebsite,
};
