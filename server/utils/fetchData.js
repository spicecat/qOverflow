const createRequest = require('./api');

const defaultAcc = [];

async function fetchData(
    url,
    id,
    dataName,
    acc = defaultAcc,
    after = ''
) {
    const { success, [dataName]: data } = await createRequest('get', url, { after });

    if (!success || !data.length) return acc;

    const newAcc = [...acc, ...data];
    const last = data[data.length - 1];

    return fetchData(url, id, dataName, newAcc, last[id]);
}

module.exports = fetchData;
