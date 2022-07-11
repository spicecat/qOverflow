import { IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
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
        // <div style={{ textAlign: 'center' }}>
        //     <Tooltip title='upvote' placement='right'>
        //         <IconButton onClick={upvote}>
        //             <ArrowDropUpIcon />
        //         </IconButton>
        //     </Tooltip>
        //     <Typography>
        //         {downvotes + upvotes}
        //     </Typography>
        //     <Tooltip title='downvote' placement='right'>
        //         <IconButton onClick={downvote}>
        //             <ArrowDropDownIcon />
        //         </IconButton>
        //     </Tooltip>
        // </div>
        <ToggleButtonGroup
            exclusive
            orientation='vertical'
        >
            <ToggleButton
                disableRipple
                style={{ borderRadius: 100, outlineWidth: 1, outlineStyle: 'solid' }}
                value='upvote'
            >
                <ArrowDropUpIcon />
            </ToggleButton>
            <Typography style={{ margin: 10, textAlign: 'center' }}>
                {downvotes + upvotes}
            </Typography>
            <ToggleButton
                disableRipple
                style={{ borderRadius: 100, outlineWidth: 0, outlineStyle: 'solid' }}
                value='downvote'
            >
                <ArrowDropDownIcon sx={{ fontSize: 50 }} color='success' />
            </ToggleButton>
        </ToggleButtonGroup >
    )
}