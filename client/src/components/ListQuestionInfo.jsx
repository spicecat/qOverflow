import { Typography } from "@mui/material"
export default function ListQuestionInfo({upvotes, downvotes, answers, views, inline}){
    return inline? (
        <>
              <Typography display = 'inline' variant='body1'>{upvotes - downvotes} votes | </Typography>
              <Typography display = 'inline' variant='body1'>{answers} answers | </Typography>
              <Typography display = 'inline' variant='body1'>{views} views</Typography>
        </>
    ) : (
        <>
              <Typography display = 'block' variant='body1'>{upvotes - downvotes} votes</Typography>
              <Typography display = 'block' variant='body1'>{answers} answers</Typography>
              <Typography display = 'block' variant='body1'>{views} views</Typography>
        </>
    )
}