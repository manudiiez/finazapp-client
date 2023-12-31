"use client"
import Link from "next/link"
import { IconLogout, IconUser } from "./shared/Icons"
import { signOut, useSession } from "next-auth/react"
import { toast } from 'sonner';
import styles from '@/styles/components/userButton.module.scss'
const UserButton = () => {

    const logout = async () => {
        toast('¿Estas seguro?', {
            action: {
                label: 'Cerrar',
                onClick: () => signOut({ callbackUrl: '/join/login' }),
            },
            duration: 3000
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