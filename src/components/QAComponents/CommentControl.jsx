import { ButtonGroup, Typography } from '@mui/material'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { Form } from 'controllers/FormControllers';
import { commentFields } from 'services/fields';
import { commentSchema } from 'services/schemas';

export default function CommentControl() {

    return (
        <span>
            <ButtonGroup style={{ alignItems: 'center' }}>
                <AddCommentOutlinedIcon />
                <Typography m={1}>
                    Comment
                </Typography>
            </ButtonGroup>
            <Form
                fields={commentFields}
                onSubmit={() => console.log(123)}
                schema={commentSchema}
            />
        </span>
    )
}