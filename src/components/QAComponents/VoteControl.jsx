import { ButtonGroup, Tooltip, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

export default function VoteControl({
    downvotes,
    handleDownvote,
    handleUpvote,
    orientation = 'horizontal',
    upvotes,
    vote
}) {

    return (
        <span style={{ marginRight: 8 }}>
            <ButtonGroup {...{ orientation, style: { alignItems: 'center'} }} >
                <Tooltip title='upvote' placement='right'>
                    <ThumbUpOutlinedIcon
                        color={vote === 'upvoted' ? 'warning' : 'standard'}
                        onClick={handleUpvote}
                    />
                </Tooltip>
                <Tooltip title={`${upvotes} / ${downvotes}`} placement='right'>
                    <Typography style={{ margin: 4, textAlign: 'center' }}>
                        {upvotes - downvotes}
                    </Typography>
                </Tooltip>
                <Tooltip title='downvote' placement='right'>
                    <ThumbDownOutlinedIcon
                        color={vote === 'downvoted' ? 'warning' : 'standard'}
                        onClick={handleDownvote}
                    />
                </Tooltip>
            </ButtonGroup >
        </span >
    )
}