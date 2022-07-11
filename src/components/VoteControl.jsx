import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function VoteControl({
    downvotes = 0,
    upvotes = 0
}) {

    return (
        <div style={{ textAlign: 'center' }}>
            <Tooltip title='upvote' placement='right'>
                <IconButton onClick={() => console.log(11)}>
                    <ArrowDropUpIcon />
                </IconButton>
            </Tooltip>
            <Typography>
                {downvotes + upvotes}
            </Typography>
            <Tooltip title='downvote' placement='right'>
                <IconButton>
                    <ArrowDropDownIcon />
                </IconButton>
            </Tooltip>
        </div>
    )
}