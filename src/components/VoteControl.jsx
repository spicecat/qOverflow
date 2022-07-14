import { ButtonGroup, Tooltip, Typography } from '@mui/material';
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
                <ArrowDropUpIcon
                    color={vote === 'upvote' ? 'warning' : 'standard'}
                    onClick={handleUpvote}
                    sx={{ fontSize: 50 }}
                />
            </Tooltip>
            <Typography style={{ margin: -10, textAlign: 'center' }}>
                {upvotes - downvotes}
            </Typography>
            <Tooltip title='downvote' placement='right'>
                <ArrowDropDownIcon
                    color={vote === 'downvote' ? 'warning' : 'standard'}
                    onClick={handleDownvote}
                    sx={{ fontSize: 50 }}
                />
            </Tooltip>
        </ButtonGroup >
    )
}