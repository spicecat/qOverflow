import { ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

export default function VoteControl({
    canVote,
    downvotes,
    handleDownvote,
    handleUpvote,
    orientation = 'horizontal',
    upvotes,
    vote
}) {

    return (
        <Tooltip title={!canVote && "This question must be open and you must be level 2 to vote"}>
            <span style={{ marginRight: 8 }}>
                <ButtonGroup {...{ orientation, style: { alignItems: 'center' } }}>
                    <IconButton
                        disabled={!canVote}
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
                        disabled={!canVote}
                        onClick={handleDownvote}
                    >
                        <ThumbDownOutlinedIcon color={vote === 'downvoted' ? 'warning' : 'standard'} />
                    </IconButton>
                </ButtonGroup>
            </span >
        </Tooltip>
    )
}