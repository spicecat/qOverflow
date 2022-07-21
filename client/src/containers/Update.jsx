import { Card, CardContent, Grid } from '@mui/material';
import { UpdateForm } from 'controllers/FormControllers';

export default function Register() {
    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '92vh' }}
        >
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <UpdateForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
