import styles from '@/styles/components/footer.module.scss'
import Link from 'next/link'
import { IconChart, IconGoal, IconList, IconPlus, IconSettings } from './shared/Icons'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <nav>
                <ul>
                    <li>
                        <Link href="/panel">
                            <IconList className={styles.iconList} />
                            <span>
                                Transacciones
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/panel">
                            <IconChart className={styles.iconChart} />
                            <span>
                                Informes
                            </span>
                        </Link>
                    </li>
                    <li className={styles.iconPlus}>
                        <Link href="/panel/new">
                            <IconPlus />
                        </Link>
                    </li>
                    <li>
                        <Link href="/panel">
                            <IconGoal className={styles.iconGoal} />
                            <span>
                                Plan
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/panel/settings">
                            <IconSettings />
                            <span>
                                Configuración
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer