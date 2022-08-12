import { MailUnit } from 'components';
import { PaginatedList } from 'controllers';
import { getMail } from 'services/mailServices';

export default function InboxController() {
    const getData = () => getMail().then(({ messages }) => messages);

    return <PaginatedList {...{ Component: MailUnit, getData, rowsPerPage: 15 }} />;
}
