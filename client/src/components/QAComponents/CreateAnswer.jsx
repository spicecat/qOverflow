import { Button, Card, CardContent, Tooltip } from '@mui/material';

import { AnswerForm } from 'controllers/FormControllers';
import MdPreview from 'components/MdPreview';

export default function CreateAnswer({ canAnswer, show, toggleShow }) {
    return (
        <div>
            <Tooltip
                title={
                    canAnswer
                        ? ''
                        : 'You need to be authenticated to answer or level 5 if the question is protected'
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
