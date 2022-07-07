import { useFormik } from 'formik'
import { Form } from '../components'

export default function FormController({ fields, initialValues, onSubmit, validationSchema }) {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    const formikFields = fields.map(field => ({
        ...field,
        value: formik.values,
    }))

    return <Form {...{ formik, fields }} />
}