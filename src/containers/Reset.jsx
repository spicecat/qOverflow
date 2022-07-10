import { Card, CardContent, Grid } from '@mui/material';
import { ResetForm } from '../controllers';

export default function Reset() {
    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <ResetForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
