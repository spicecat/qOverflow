import { Card, CardContent } from '@mui/material';
import React from 'react';
import { Inbox, SendMail } from 'controllers';

export default function Mail() {
    return (
        <Card>
            <CardContent>
                <SendMail />
            </CardContent>
            <CardContent>
                <Inbox />
            </CardContent>
        </Card>
    );
}
