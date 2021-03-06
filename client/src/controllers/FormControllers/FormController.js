import { useFormik } from 'formik';
import { Form } from 'components';

export default function FormController({
    fields,
    onSubmit = () => 0,
    validate,
    validationSchema,
    children,
}) {
    const formik = useFormik({
        initialValues: fields.reduce(
            (acc, { id }) => ({ ...acc, [id]: '' }),
            {}
        ),
        onSubmit,
        validate,
        validateOnChange: false,
        validationSchema,
    });

    const formikFields = fields.map(
        ({ id, helperText = () => 0, ...field }) => ({
            id,
            ...field,
            error: Boolean(formik.touched[id] && formik.errors[id]),
            helperText:
                helperText(formik.values[id]) ||
                (formik.touched[id] && formik.errors[id]),
            onChange: formik.handleChange,
            value: formik.values[id],
        })
    );

    return Form({
        formik,
        fields: formikFields,
        children,
    });
}
