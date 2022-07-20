import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MailUnit(sender, createdAt, subject, text) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Subject: {subject}</Typography>
                <Typography>From {sender} at {new Date(createdAt * 1000)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant='body1'>{text}</Typography>
            </AccordionDetails>
        </Accordion>
    );
}
