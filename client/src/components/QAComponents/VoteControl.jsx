import { ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

export default function VoteControl({
    canDownvote,
    canUpvote,
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
                <Tooltip title={canUpvote ? '' : 'Question must be open, not created by you, and you must be level 2 to upvote'}>
                    <span>
                        <IconButton
                            disabled={!canUpvote}
                            onClick={handleUpvote}
                        >
                            <ThumbUpOutlinedIcon color={vote === 'upvoted' ? 'warning' : 'standard'} />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={`${upvotes} / ${downvotes}`} placement='right'>
                    <Typography style={{ margin: 4, textAlign: 'center' }}>
                        {upvotes - downvotes}
                    </Typography>
                </Tooltip>
                <Tooltip title={canDownvote ? '' : 'Question must be open, not created by you, and you must be level 4 to downvote'}>
                    <span>
                        <IconButton
                            disabled={!canDownvote}
                            onClick={handleDownvote}
                        >
                            <ThumbDownOutlinedIcon color={vote === 'downvoted' ? 'warning' : 'standard'} />
                        </IconButton>
                    </span>
                </Tooltip>
            </ButtonGroup>
        </span >
    )
}