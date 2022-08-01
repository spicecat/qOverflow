import { Button, Card, CardContent, Tooltip } from "@mui/material"
import { AnswerForm } from "controllers/FormControllers"
import { useState } from "react"
import MdPreview from "./MdPreview"
export default function CreateAnswer({canAnswer, question_id}){
    const [show, setShow] = useState(false)
    

    function toggleShow(){
        setShow(!show)
    }
    return(
        <div>
            <Tooltip title = {canAnswer ? null : "you need to be authenticated to answer or level 5 if the question is protected"}>
                <span>
                    <Button disabled = {!canAnswer} variant = "contained" onClick = {toggleShow}>Add Answer</Button>
                </span>
            </Tooltip>
            {show ? 
            <Card>
                <CardContent>
                    <AnswerForm {...{question_id}} />
                    <MdPreview/>
                </CardContent>
            </Card>
            
            : null}
            
        
        </div>
    )
}

