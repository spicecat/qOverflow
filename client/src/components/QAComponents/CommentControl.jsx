import { Button, ButtonGroup, Typography } from '@mui/material'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Form } from 'controllers/FormControllers';

export default function CommentControl({
    commentFields,
    commentSchema,
    postComment,
    show,
    toggleShow
}) {

    return (
        <span>
            <ButtonGroup style={{ alignItems: 'center' }}>
                <Button
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
            </ButtonGroup>
            {show && (
                <Form
                    fields={commentFields}
                    onSubmit={postComment}
                    schema={commentSchema}
                />
            )}
        </span>
    )
}