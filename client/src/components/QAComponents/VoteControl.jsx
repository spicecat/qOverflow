import { ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

export default function VoteControl({
    disabled,
    downvotes,
    handleDownvote,
    handleUpvote,
    orientation = 'horizontal',
    upvotes,
    vote
}) {

    return (
        <span style={{ marginRight: 8 }}>
            <ButtonGroup {...{ orientation, style: { alignItems: 'center' } }}>
                <Tooltip title='upvote' placement='right'>
                    <IconButton
                        disabled={disabled}
                        onClick={handleUpvote}
                    >
                        <ThumbUpOutlinedIcon color={vote === 'upvoted' ? 'warning' : 'standard'} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={`${upvotes} / ${downvotes}`} placement='right'>
                    <Typography style={{ margin: 4, textAlign: 'center' }}>
                        {upvotes - downvotes}
                    </Typography>
                </Tooltip>
                <Tooltip title='downvote' placement='right'>
                    <IconButton
                        disabled={disabled}
                        onClick={handleUpvote}
                    >
                        <ThumbDownOutlinedIcon color={vote === 'downvoted' ? 'warning' : 'standard'} />
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        </span >
    )
}