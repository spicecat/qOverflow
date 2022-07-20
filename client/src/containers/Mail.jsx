import { Card, CardContent } from '@mui/material';
import React from 'react';
import { Inbox, SendMail } from 'controllers';
import { MdPreview } from 'components';

export default function Mail() {
    return (
        <Card>
            <CardContent>
                <SendMail />
                <MdPreview />
            </CardContent>
            <CardContent>
                <Inbox />
            </CardContent>
        </Card>
    );
}
