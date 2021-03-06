import { Card, CardContent } from '@mui/material';
import React from 'react';
import { Inbox, SendMail } from 'controllers';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'contexts';
import { MdPreview } from 'components';

export default function Mail() {
    return (
        <Card>
            <CardContent>
                <SendMail />
                <MdPreview/>
            </CardContent>
            <CardContent>
                <Inbox />
            </CardContent>
        </Card>
    );
}
