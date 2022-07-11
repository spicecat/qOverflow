import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function VoteControl({
    downvote,
    downvotes = 0,
    upvote,
    upvotes = 0,
    vote
}) {

    return (
        <div style={{ textAlign: 'center' }}>
            <Tooltip title='upvote' placement='right'>
                <IconButton onClick={upvote}>
                    <ArrowDropUpIcon />
                </IconButton>
            </Tooltip>
            <Typography>
                {downvotes + upvotes}
            </Typography>
            <Tooltip title='downvote' placement='right'>
                <IconButton onClick={downvote}>
                    <ArrowDropDownIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}