import styles from '@/styles/components/panelBalance.module.scss'
import { obtenerRangosFechas } from '@/utils/func';
import Link from 'next/link'

const BalanceFilter = () => {

    const data = obtenerRangosFechas();
    return (
        <div className={styles.filter}>
            <ul>
                {
                    data.map((item) => (
                        <li key={item.name}>
                            <Link href={`/?startDate=${item.startDate}&endDate=${item.endDate}`}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BalanceFilter