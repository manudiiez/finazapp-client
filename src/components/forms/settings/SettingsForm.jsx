"use client"
import { useState } from 'react';
import styles from '../forms.module.scss'
import { User } from '@/api/user';
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';

const SettingsForm = ({ user, token }) => {

    const userCtrl = new User()

    const [values, setValues] = useState({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        await userCtrl.update(values, token)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Swal.fire({
            title: "Para editar el usuario, es necesario cerrar la sesión",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Cerrar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await Toast.fire({
                    icon: "success",
                    title: `Usuario editado!!`
                })
                signOut({ callbackUrl: '/join/login' })
            }
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };
    return (
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="text"
                    placeholder="Escriba su email"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formInputsContainer}>
                <div>
                    <label htmlFor="firstname">Nombre</label>
                    <input
                        name="firstname"
                        type="text"
                        required
                        placeholder="Nombre"
                        value={values.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        name="lastname"
                        type="text"
                        required
                        placeholder="Apellido"
                        value={values.lastname}
                        onChange={handleChange}
                    />
                </div>

            </div>
            <button type="submit">Editar</button>
        </form>
    )
}

export default SettingsForm