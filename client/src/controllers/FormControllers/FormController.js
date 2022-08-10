import { useEffect } from 'react';
import { useFormik } from 'formik';

import { Form } from 'components';
import { useForm } from 'contexts';

export default function FormController({
    fields,
    onSubmit = () => 0,
    validate,
    validationSchema,
    children,
}) {
    const { setContent } = useForm();

    useEffect(() => {
        setContent('');
    }, [setContent]);

    const handleChange = (e) => setContent(e.target.value);

    const formik = useFormik({
        initialValues: fields.reduce((acc, { id }) => ({ ...acc, [id]: '' }), {}),
        onSubmit,
        validate,
        validateOnChange: false,
        validationSchema,
    });
    const formikFields = fields.map(({ id, helperText = () => 0, ...field }) => ({
        id,
        ...field,
        error: Boolean(formik.touched[id] && formik.errors[id]),
        helperText: helperText(formik.values[id]) || (formik.touched[id] && formik.errors[id]),
        onChange: formik.handleChange,
        value: formik.values[id],
    }));

    return <Form {...{ formik, fields: formikFields, children, handleChange }} />;
}
