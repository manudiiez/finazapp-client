"use client"
import styles from '@/styles/components/modal.module.scss'
import { IconClose } from './Icons'
import classNames from 'classnames'
const Modal = ({ children, show, changeShow }) => {
    return (
        <div className={classNames(styles.modal, { [styles.isActive]: show })}>
            <div className={styles.content}>
                <div className={styles.button} onClick={changeShow} >
                    <IconClose />
                </div>
                {children}
            </div>
            <div className={styles.bg} onClick={changeShow}></div>
        </div>
    )
}
export default Modal
