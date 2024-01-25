"use client"
import styles from '@/styles/components/footer.module.scss'
import Link from 'next/link'
import { IconChart, IconGoal, IconList, IconPlus, IconSettings } from './shared/Icons'
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const Footer = () => {
    const currentRoute = usePathname();

    return (
        <footer className={styles.footer}>
            <nav>
                <ul>
                    <li>
                        <Link href="/" className={classNames({
                            [styles.isActive]: currentRoute === '/'
                        })}>
                            <IconList className={styles.iconList} />
                            <span>
                                Transacciones
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/panel/charts" className={classNames({
                            [styles.isActive]: currentRoute === '/panel/charts'
                        })}>
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
                        <Link href="/panel/goals" className={classNames({
                            [styles.isActive]: currentRoute === '/panel/goals'
                        })}>
                            <IconGoal className={styles.iconGoal} />
                            <span>
                                Plan
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/panel/settings" className={classNames({
                            [styles.isActive]: currentRoute === '/panel/settings'
                        })}>
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