import { IconUser } from './shared/Icons'
import styles from '@/styles/components/settings.module.scss'

const SettingsHero = ({ user }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <IconUser />
            </div>
            <div className={styles.info}>
                <div>
                    <span>Nombre:</span>
                    <span>{user.firstname}</span>
                </div>
                <div>
                    <span>Apellido:</span>
                    <span>{user.lastname}</span>
                </div>
                <div>
                    <span>Email:</span>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default SettingsHero