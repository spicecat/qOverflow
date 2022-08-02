import { Card, CardContent, Grid } from '@mui/material';

import { ForgotPasswordForm } from 'controllers/FormControllers';

export default function ForgotPassword() {
    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Grid item xs='auto' />
            <Grid item xs={11} sm={7} md={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <ForgotPasswordForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs='auto' />
        </Grid>
    );
}
