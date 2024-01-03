"use client"
import styles from '@/styles/components/modal.module.scss'
import { IconClose } from './Icons'
import { useRouter } from 'next/navigation'
const Modal = ({ children, type }) => {
    const router = useRouter()
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <div className={styles.button} onClick={() => router.back()} >
                    <IconClose />
                </div>
                {children}
            </div>
            <div className={styles.bg} onClick={() => router.back()}></div>
        </div>
    )
}
export default Modal
