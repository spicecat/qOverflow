const Question = require('server/db/models/Question')
const User = require('server/db/models/User')
const createRequest = require('server/utils/api');
async function HandleBounty(req,res){
    const {user, hasAcceptedAnswer, amount, isOpen, hasBounty} = req.body;
    const {question_id} = req.params;
    

    const userPull = await createRequest(
        'get',
        `/users/${user}`
    );

    const questionPull =  await createRequest(
        'get',
        `/questions/${question_id}`
    );
    const question = questionPull.question;
    
    if(userPull.success){
        const {points} = userPull.user;
        if(points >= 75 && isOpen && !hasAcceptedAnswer && !hasBounty){
            if(amount >= 75 && amount <= 500){
                if(points - amount >= 75){
                    //updates question
                    await Question.findByIdAndUpdate(question_id, {hasBounty : amount});
                    //updates user in api
                    await createRequest('patch', `/users/${user}/points`, {
                        operation: 'decrement',
                        amount: amount,
                    });
                    //updates user in db
                    await User.findOneAndUpdate(
                        { username: user },
                        { $inc: { points: -1 * amount } }
                    );
                }else{
                    return res.status(403).send("This operation would leave you with less than 75 points")
                }
            }else{
                return res.status(403).send("Must be between 75 and 500 points")
            }
        }else{
            return res.status(403).send("Need to be level 4")
        }
    }

}

module.exports = HandleBounty;