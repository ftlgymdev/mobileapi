function previewAsset(fileBaseUrl, fileBasePath, filePath, fileName) {
    if (!fileBaseUrl || !fileBasePath || !filePath || !fileName) {
        return `${process.env.BASE_URL_HORIZON || 'http://localhost:3000'}/assets/img/default.png`;
    }
    return `${fileBaseUrl}${fileBasePath}${filePath}${fileName}`;
}

module.exports = {
    previewAsset
};