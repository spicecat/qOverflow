import { ButtonGroup, IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
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
        <ButtonGroup orientation='vertical'>
            <Tooltip title='upvote' placement='right'>
                <IconButton
                    disableRipple
                    onClick={upvote}
                >
                    <ArrowDropUpIcon
                        color={vote === 'upvote' ? 'warning' : 'standard'}
                        sx={{ fontSize: 50 }}
                    />
                </IconButton>
            </Tooltip>
            <Typography style={{ margin: 0, textAlign: 'center' }}>
                {downvotes + upvotes}
            </Typography>
            <Tooltip title='downvote' placement='right'>
                <IconButton
                    disableRipple
                    onClick={downvote}
                >
                    <ArrowDropDownIcon
                        color={vote === 'downvote' ? 'warning' : 'standard'}
                        sx={{ fontSize: 50 }}
                    />
                </IconButton>
            </Tooltip>
        </ButtonGroup >
    )
}