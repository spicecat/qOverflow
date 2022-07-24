import { useForm } from 'contexts';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper, Typography, Button } from '@mui/material';

export default function MdPreview() {
    const [preview, setPreview] = useState(false);
    const { content } = useForm();

    function handleClick() {
        setPreview(!preview);
    }

    return (
        <div>
            <Button
                fullWidth
                onClick={handleClick}
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: '1vh' }}
            >
                Show Markdown Preview
            </Button>
            {preview && (
                <Paper variant="outlined">
                    <Typography variant="h5"> Text Preview: </Typography>
                    <ReactMarkdown children={content} />
                </Paper>
            )}
        </div>
    );
}
