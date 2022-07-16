async function CreateAnswer(req, res, next) {
    const user = req.user;
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).send('Your request is missing information.');
    }

    const { success } = await createRequest('post', `/questions`, {
        creator: user,
        title,
        text,
    });

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = CreateAnswer;
