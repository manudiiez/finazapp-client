import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import styles from '@/styles/components/panelHero.module.scss'
import { getServerSession } from 'next-auth';
const PanelHero = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className={styles.hero}>
            <p>Hola, {session?.user.firstname}<span> {session?.user.lastname}</span>!</p>
            <h2>Aquí tu Balance Financiero</h2>
        </div>
    )
}

export default PanelHero