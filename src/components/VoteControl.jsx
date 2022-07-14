import { ButtonGroup, IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function VoteControl({
    downvotes,
    handleDownvote,
    handleUpvote,
    upvotes,
    vote
}) {

    return (
        <ButtonGroup orientation='vertical'>
            <Tooltip title='upvote' placement='right'>
                <IconButton
                    disableRipple
                    onClick={handleUpvote}
                >
                    <ArrowDropUpIcon
                        color={vote === 'upvote' ? 'warning' : 'standard'}
                        sx={{ fontSize: 50 }}
                    />
                </IconButton>
            </Tooltip>
            <Typography style={{ margin: -10, textAlign: 'center' }}>
                {upvotes - downvotes}
            </Typography>
            <Tooltip title='downvote' placement='right'>
                <IconButton
                    disableRipple
                    onClick={handleDownvote}
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