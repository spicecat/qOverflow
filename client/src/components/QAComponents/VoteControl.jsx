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
                    <IconButton
                        disabled={disabled}
                        onClick={handleUpvote}
                    >
                        <ThumbUpOutlinedIcon color={vote === 'upvoted' ? 'warning' : 'standard'} />
                    </IconButton>
                <Tooltip title={`${upvotes} / ${downvotes}`} placement='right'>
                    <Typography style={{ margin: 4, textAlign: 'center' }}>
                        {upvotes - downvotes}
                    </Typography>
                </Tooltip>
                    <IconButton
                        disabled={disabled}
                        onClick={handleDownvote}
                    >
                        <ThumbDownOutlinedIcon color={vote === 'downvoted' ? 'warning' : 'standard'} />
                    </IconButton>
            </ButtonGroup>
        </span >
    )
}