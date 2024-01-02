import styles from '@/styles/components/panelBalance.module.scss'

const BalanceResume = async ({ resume }) => {
    return (
        <div className={styles.resume}>
            <div>
                <h3>INGRESOS</h3>
                <span>${resume.incomes}</span>
            </div>
            <div>
                <h3>GASTOS</h3>
                <span>${resume.bills}</span>
            </div>
            <div>
                <h3>SALDO</h3>
                <span>${resume.balance}</span>
            </div>
            <div>
                <h3>SALDO TOTAL</h3>
                <span>${resume.total}</span>
            </div>
        </div>
    )
}

export default BalanceResume