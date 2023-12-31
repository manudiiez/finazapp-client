import * as Yup from 'yup'

export const initialValues = () => {
    return {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    })
}
