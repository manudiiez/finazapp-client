
"use client"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegisterForm.form';
import styles from '../forms.module.scss'
import { User } from '@/api/user';
import Swal from 'sweetalert2';
import { useState } from 'react';
import Loader from '@/components/shared/Loader';
import { signIn } from 'next-auth/react';

const RegisterForm = () => {
    const userCtrl = new User()
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setLoading(true)
                const data = await userCtrl.register(formValue)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                await Toast.fire({
                    icon: "success",
                    title: "Usuario registrado correctamente"
                });
                await signIn("credentials", {
                    email: data.user.email,
                    password: formValue.password,
                    redirect: true,
                    callbackUrl: '/'
                });
                setLoading(false)
            } catch (error) {
                console.log(error);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                });
                Toast.fire({
                    icon: "error",
                    title: error[0]
                });
                setLoading(false)
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="text"
                    placeholder="Escriba su email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
            </div>
            <div className={styles.formInputsContainer}>
                <div>
                    <label htmlFor="firstname">Nombre</label>
                    <input
                        name="firstname"
                        type="text"
                        placeholder="Nombre"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={formik.errors.firstname}
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        name="lastname"
                        type="text"
                        placeholder="Apellido"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.errors.lastname}
                    />
                </div>

            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
            </div>
            <button type="submit" disabled={loading} >{loading ? <Loader /> : "Crear"}</button>
        </form>
    )
}

export default RegisterForm