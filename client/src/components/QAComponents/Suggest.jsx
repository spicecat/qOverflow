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
        
        
        if(!questionData.loading) setOngoingEdit({users : questionData.edit, new : questionData.editText})
    },[userData, questionData, setCanSuggest])
   
    async function toggleShow(){
        if(questionData.edit.length === 0 || userData.username !== ongoingEdit.users[0]){
            setShow(!show)
        }else{
            const { status } = await editQuestion(questionData.question_id);
            window.location.reload(false);
        }
        
    }

    

    return (
        <div style = {{display : 'inline', marginLeft : '10px'}}>
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
                        New Title: <Markdown {...{content: ongoingEdit.new[1]}}/>
                        New Text: <Markdown {...{content: ongoingEdit.new[0]}}/>
                    </CardContent>
                    <Typography> {ongoingEdit.users} has voted to edit the question </Typography>
                </Card>
                
            }


        </div>
    );
}