import styles from '@/styles/components/header.module.scss'
import UserButton from './UserButton'
const Header = async () => {


    return (
        <div className={styles.header}>
            <div className={styles.headerContainer}>
                <header>
                    <span>Finaz<strong>App</strong></span>
                    <UserButton />
                </header>
            </div>
        </div>
    )
}

export default Header