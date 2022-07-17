function isExpired(object, expiry) {
    return object.createdAt + expiry < Date.now();
}

module.exports = isExpired;
