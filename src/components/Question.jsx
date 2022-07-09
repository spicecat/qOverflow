import { IconButton, ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function Question({
    answers,
    comments,
    creator,
    createdAt,
    downvotes,
    hasAcceptedAnswer,
    status,
    title,
    text,
    upvotes,
    views
}) {
    //This for Q and A
    return (
        <ListItem>
            <div>
                <Tooltip title='upvote' placement='right'>
                    <IconButton onClick={() => console.log(11)}>
                        <ArrowDropUpIcon />
                    </IconButton>
                </Tooltip>
                <br />
                <Tooltip title='downvote' placement='right'>
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    )
}