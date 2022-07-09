import { Card, CardContent } from '@mui/material';
import React from 'react';
import { SendMailController, MailController } from '../controllers';

export default function Mail() {
    return (
        <Card>
            <CardContent>
                <SendMailController />
            </CardContent>
            <CardContent>
                <MailController />
            </CardContent>
        </Card>
    );
}
