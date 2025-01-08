function toGetWebsitePrivacitySettings(json) {
    return JSON.parse(json);
}

function getWebsitePrivacitySettingsToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "getWebsitePrivacitySettingsToJson": getWebsitePrivacitySettingsToJson,
    "toGetWebsitePrivacitySettings": toGetWebsitePrivacitySettings,
};
