import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Button, ButtonGroup, Tooltip, Typography } from '@mui/material';

import { Form } from 'controllers/FormControllers';

export default function CommentControl({
    canComment,
    commentFields,
    commentSchema,
    postComment,
    show,
    toggleShow,
}) {
    return (
        <span>
            <ButtonGroup style={{ alignItems: 'center' }}>
                <Tooltip
                    title={
                        canComment
                            ? ''
                            : 'You must be level 3 to comment or level 5 if this question is protected'
                    }
                >
                    <span>
                        <Button
                            disabled={!canComment}
                            color='inherit'
                            disableRipple
                            onClick={toggleShow}
                            size='small'
                            startIcon={<AddCommentOutlinedIcon />}
                            style={{ textTransform: 'none' }}
                            variant='text'
                        >
                            <Typography>Comment</Typography>
                        </Button>
                    </span>
                </Tooltip>
            </ButtonGroup>
            {show && <Form fields={commentFields} onSubmit={postComment} schema={commentSchema} />}
        </span>
    );
}
