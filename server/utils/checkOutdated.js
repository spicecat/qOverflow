function checkOutdatedDataset(objects, expiry) {
    return objects.map((obj) => obj.updatedAt - expiry < Date.now()).length > 0;
}

function checkOutdated(object, expiry) {
    return object.createdAt + expiry < Date.now();
}

module.exports = checkOutdated;
