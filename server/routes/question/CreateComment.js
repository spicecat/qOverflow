async function CreateComment(req, res, next) {
    const user = req.user;
    const { questionID } = req.params;
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Your request is missing information.');
    }

    const { success } = await createRequest(
        'post',
        `/questions/${questionID}/comments`,
        {
            creator: user,
            text,
        }
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = CreateComment;
