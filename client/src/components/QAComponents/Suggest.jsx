import {Tooltip, Button, Card, CardContent, Typography} from '@mui/material'
import { editQuestion } from 'services/questionsServices';
import EditFormController from "controllers/FormControllers/EditQuestionFormController";
import { useEffect, useState } from "react";
import { useUser, useQuestion } from 'contexts';
import { Markdown } from 'components';
export default function Suggest(){
    const [show, setShow] = useState(false);
    const [canSuggest, setCanSuggest] = useState(false)
    const {userData} = useUser();
    const {questionData} = useQuestion();
    const [ongoingEdit, setOngoingEdit] = useState({users : [], new : []})
    
    useEffect(()=>{
        setCanSuggest(userData.level >= 7)
        
        if(ongoingEdit.users.length > 0)setCanSuggest((userData.username !== ongoingEdit.users[0]))
        if(!questionData.loading) setOngoingEdit({users : questionData.edit, new : questionData.editText})
    },[userData, questionData, setCanSuggest])
   
    async function toggleShow(){
        if(questionData.edit.length === 0){
            setShow(!show)
        }else{
            const { status } = await editQuestion(questionData.question_id);
        }
        
    }

    

    return (
        <div>
            <Tooltip
                title= {
                    canSuggest
                        ? ''
                        : 'You need to be level 7'}
            >
                <span>
                    <Button disabled={!canSuggest} variant='contained' onClick={toggleShow}>
                        Add Suggestion
                    </Button>
                </span>
            </Tooltip>
            {show && (
                <Card>
                    <CardContent>
                        <EditFormController />
                    </CardContent>
                </Card>
            )}
            {ongoingEdit.users.length > 0 &&
                <Card>
                    <CardContent>
                        <Markdown {...{content: ongoingEdit.new[0]}}/>
                        <Markdown {...{content: ongoingEdit.new[1]}}/>
                    </CardContent>
                    <Typography> {ongoingEdit.users} have voted to edit the question </Typography>
                </Card>
                
            }


        </div>
    );
}