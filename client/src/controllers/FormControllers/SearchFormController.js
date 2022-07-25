import { useSearchParams } from 'react-router-dom';

import { Form } from 'controllers/FormControllers';
import { searchFields } from 'services/fields';
import { searchSchema } from 'services/schemas';

export default function SearchFormController() {
    const [, setSearchParams] = useSearchParams();

    const cleanObject = (data) =>
        Object.entries(data)
            .filter(([, v]) => v)

    const search = (fields) => {
        setSearchParams(cleanObject(fields), { replace: true });
    }

    return (
        Form({
            fields: searchFields,
            onSubmit: search,
            validationSchema: searchSchema,
        })
    )

}