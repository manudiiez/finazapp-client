import * as Yup from 'yup'

export const initialValues = (type) => {
    return {
        note: "",
        amount: "",
        type,
        date: "",
    }
}

export const validationSchema = () => {
    return Yup.object({
        note: Yup.string(),
        amount: Yup.number().required(true),
        type: Yup.string().required(true),
        date: Yup.string().required(true),
    })
}
