const Answer = require('../../db/models/Answer');
const config = require('../../config.json');

async function CreateAnswer(req, res, next) {
    const user = req.user;
    const { title, text } = req.body;
    const { questionID } = req.params;

    if (!title || !text) {
        return res.status(400).send(config.errorIncomplete);
    }

    const { success, answer } = await createRequest(
        'post',
        `/questions/${questionID}/answers`,
        {
            creator: user.username,
            text,
        }
    );

    if (!success) return res.status(500).send(config.errorGeneric);

    await Answer.create({ ...answer, id: answer.answer_id, questionID });

    return res.send({ success: true });
}

module.exports = CreateAnswer;
