//This for Q and A
import { IconButton, Tooltip, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function Question({
    downvotes,
    upvotes
}) {

    return (
        <div>
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