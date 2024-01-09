import PanelHero from '@/components/PanelHero'
import BalanceContainer from '@/components/balance/BalanceContainer'
import styles from './panel.module.scss'
import { formatearFecha } from '@/utils/func'
import TransactionsContainer from '@/components/transactions/TransactionsContainer'

const Panel = async ({ searchParams }) => {
    const { startDate = false, endDate = false } = searchParams
    let formatStartDate = startDate
    let formatEndDate = endDate
    if (!formatStartDate || !formatEndDate) {
        formatStartDate = formatearFecha(new Date())
        formatEndDate = formatearFecha(new Date())
    }
    return (
        <div className={styles.home}>
            <section>
                <PanelHero />
            </section>
            <section>
                <BalanceContainer startDate={formatStartDate} endDate={formatEndDate} />
            </section>
            <section>
                <TransactionsContainer />
            </section>
        </div >
    )
}

export default Panel