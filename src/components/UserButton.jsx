"use client"
import Link from "next/link"
import { IconLogout, IconUser } from "./shared/Icons"
import { signOut, useSession } from "next-auth/react"
import styles from '@/styles/components/userButton.module.scss'
import Swal from "sweetalert2";
const UserButton = () => {

    const logout = async () => {
        Swal.fire({
            title: "Cerrar sesion?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Cerrar",
            denyButtonText: `Cancelar`
        }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: "success",
                    title: "Cerrando sesion!!"
                }).then(() => {
                    signOut({ callbackUrl: '/join/login' })
                })
            }
        });
    }
    const { session: data, status } = useSession()
    if (status === "unauthenticated" || status === "loading") {
        return (
            <Link href="/join/login">
                <IconUser />
            </Link>
        )
    }
    return (
        <button onClick={logout} className={styles.button}>
            <IconLogout className={styles.icon} />
        </button>
    )
}

export default UserButton