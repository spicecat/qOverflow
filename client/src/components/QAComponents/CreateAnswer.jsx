import { Button, Card, CardContent, Tooltip } from '@mui/material';

import { MdPreview } from 'controllers';
import { AnswerForm } from 'controllers/FormControllers';

export default function CreateAnswer({ canAnswer, show, toggleShow }) {
    return (
        <div style = {{display : 'inline'}}>
            <Tooltip
                title={
                    canAnswer
                        ? ''
                        : 'You need to be authenticated to answer or level 6 if the question is protected'
                }
            >
                <span>
                    <Button disabled={!canAnswer} variant='contained' onClick={toggleShow}>
                        Add Answer
                    </Button>
                </span>
            </Tooltip>
            {show && (
                <Card>
                    <CardContent>
                        <AnswerForm {...{ toggleShow }} />
                        <MdPreview />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
