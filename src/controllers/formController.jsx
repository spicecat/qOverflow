import { useFormik } from 'formik'
import { Form } from '../components'

export default function FormController({ fields, initialValues, onSubmit, validationSchema }) {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return <Form {...{ formik, fields }} />
}