import ReactMarkdown from 'react-markdown';
import { Paper, Typography, Button } from '@mui/material';

export default function MdPreview({ show, toggleShow, content }) {
    return (
        <div>
            <Button
                fullWidth
                onClick={toggleShow}
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: '1vh' }}
            >
                Show Markdown Preview
            </Button>
            {show && (
                <Paper variant='outlined'>
                    <Typography variant='h5'> Text Preview: </Typography>
                    <ReactMarkdown children={content} />
                </Paper>
            )}
        </div>
    );
}
