function toWebsiteLegalNotices(json) {
    return JSON.parse(json);
}

function websiteLegalNoticesToJson(value) {
    return JSON.stringify(value);
}

module.exports = {
    "websiteLegalNoticesToJson": websiteLegalNoticesToJson,
    "toWebsiteLegalNotices": toWebsiteLegalNotices,
};
