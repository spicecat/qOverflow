import { useFormik } from 'formik'
import { Form } from '../components'

export default function FormController({ fields, onSubmit, validationSchema }) {
    const formik = useFormik({
        initialValues: fields.reduce((o, i) => ({ ...o, [i.id]: '' }), {}),
        onSubmit,
        validationSchema
    })
    const formikFields = fields.map(({ id, ...field }) => ({
        id, ...field,
        error: Boolean(formik.touched[id] && formik.errors[id]),
        helperText: formik.touched[id] && (formik.errors[id]),
        onChange: formik.handleChange,
        value: formik.values[id],
    }))
    console.log(formik, formikFields)

    return <Form {...{ formik, fields: formikFields }} />
}