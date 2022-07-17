const createRequest = require('./api');
const config = require('../config.json');

const defaultAcc = { success: true, requests: [] };

async function paginatedFetch(
    url,
    objType,
    recentTimestamp = 0,
    acc = defaultAcc,
    after = ''
) {
    const { success, ...data } = await createRequest('get', url, { after });

    if (!success) return config.errorGeneric;
    if (!data.length) return acc;

    const newAcc = {
        success: true,
        requests: [...acc.requests, { success, data }],
    };
    const oldest = data[data.length - 1];
    if (oldest.createdAt < recentTimestamp) {
        return newAcc;
    }

    return paginatedFetch(
        url,
        objType,
        recentTimestamp,
        newAcc,
        oldest[`${objType}_id`]
    );
}

module.exports = paginatedFetch;
