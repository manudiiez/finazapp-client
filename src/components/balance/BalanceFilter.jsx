import styles from '@/styles/components/panelBalance.module.scss'
import { obtenerRangosFechas } from '@/utils/func';
import classNames from 'classnames';
import Link from 'next/link'

const BalanceFilter = ({ startDate, endDate }) => {

    const data = obtenerRangosFechas();
    return (
        <div className={styles.filter}>
            <ul>
                {
                    data.map((item) => (
                        <li key={item.name}
                            className={classNames({
                                [styles.isActive]: startDate === item.startDate && endDate === item.endDate
                            })}
                        >
                            <Link href={`/?startDate=${item.startDate}&endDate=${item.endDate}`}>{item.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default BalanceFilter