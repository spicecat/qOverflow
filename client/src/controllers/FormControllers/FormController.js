import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useQuestion } from 'contexts';
import { Form } from 'components';
import { useForm } from 'contexts';

export default function FormController({
    fields,
    onSubmit = () => 0,
    validate,
    validationSchema,
    children,
    initialValues = {}
}) {


    const { setContent } = useForm();

    useEffect(() => {
        setContent('');

    }, [setContent]);

    const handleChange = (e) => {
        if (e.target.id === 'text') setContent(e.target.value);
    };

    const formik = useFormik({
        initialValues: fields.reduce((acc, { id }) => ({ ...acc, [id]: initialValues[id] || '' }), {}),
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
