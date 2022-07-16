const createRequest = require('../../utils/api');

async function UpdateQuestionAnswerCommentVote(req, res, next) {
    const user = req.user;
    const { questionID, answerID, commentID } = req.params;
    const { operation } = req.body;

    if (!operation) {
        return res.status(400).send('Your request is missing something.');
    }

    const currentVote = await createRequest(
        'get',
        `/questions/${questionID}/answers/${answerID}/vote/${user}`
    );

    if (!currentVote.success) {
        return res.status(500).send('Something went wrong.');
    }

    if (operation === 'upvote') {
        if (currentVote.vote === 'upvoted') {
            res.status(400).send('You have already upvoted this question.');
        } else {
            if (currentVote.vote === 'downvoted') {
                await createRequest(
                    'patch',
                    `/questions/${questionID}/answers/${answerID}/vote/${user}`,
                    { operation: 'decrement', target: 'downvotes' }
                );
            }

            await createRequest(
                'patch',
                `/questions/${questionID}/answers/${answerID}/vote/${user}`,
                { operation: 'increment', target: 'upvotes' }
            );
        }
    } else {
        if (currentVote.vote === 'downvoted') {
            res.status(400).send('You have already downvoted this question.');
        } else {
            if (currentVote.vote === 'upvoted') {
                await createRequest(
                    'patch',
                    `/questions/${questionID}/answers/${answerID}/vote/${user}`,
                    { operation: 'decrement', target: 'upvotes' }
                );
            }

            await createRequest(
                'patch',
                `/questions/${questionID}/answers/${answerID}/vote/${user}`,
                { operation: 'increment', target: 'downvotes' }
            );
        }
    }
}

module.exports = UpdateQuestionAnswerCommentVote;
