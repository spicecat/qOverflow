import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import ReactTimeAgo from 'react-time-ago';

export default function MailUnit({ sender, createdAt, subject, text }) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box style={{ width: '100%' }} display={'flex'}>
                    <Typography>From {sender}</Typography>
                    <span style={{ width: '1vw' }} />
                    <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
                    <span style={{ width: '2vw' }} />
                    <Typography>
                        <b>{subject}</b>
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <ReactMarkdown>{text}</ReactMarkdown>
            </AccordionDetails>
        </Accordion>
    );
}
