import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Grid, Tooltip, Typography } from '@mui/material';

function Badge({
    title = 'Good Question',
    text = 'dadsfjads;fkj',
    rank = 'Gold'
}) {
    const color = {
        Gold: '#ffd700',
        Silver: '#c0c0c0',
        Bronze: '#cd7f32'
    }

    return (
        <Tooltip title={text} placement='bottom'>
            <div>
                <WorkspacePremiumIcon fontSize='large' style={{ color: color[rank] }} />
                <Typography>{title}</Typography>
            </div>
        </Tooltip>
    );
}
export default function Badges({ badges: { obtained, unobtained } }) {
    const badgesGrid = (badges) => badges.map((badge) => (
        <Grid item xs={2} sm={4} md={4} key={badge.title}>
            <Badge {...{ ...badge }} />
        </Grid>
    ))

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={8} md={12}>
                    <Typography variant='h5'>Obtained Badges</Typography>
                </Grid>
                {badgesGrid(obtained)}
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={8} md={12}>
                    <Typography variant='h5'>Unobtained Badges</Typography>
                </Grid>
                {badgesGrid(unobtained)}
            </Grid>
        </>
    );
}
