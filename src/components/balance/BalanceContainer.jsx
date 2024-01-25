import { Transaction } from "@/api/transaction"
import BalanceFilter from "./BalanceFilter"
import BalanceResume from "./BalanceResume"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from '@/styles/components/panelBalance.module.scss'
import PieChartComponent from "../charts/PieChartComponent"

const BalanceContainer = async ({ startDate, endDate }) => {
    const transactionCtrl = new Transaction()
    const session = await getServerSession(authOptions);
    const resume = await transactionCtrl.getResume(startDate, endDate, session.token)
    const categories = [
        {
            name: 'Gastos',
            value: parseInt(resume.bills.replace("$", "").replace('.', '')),
            color: '#A5211E',
            type: 'bill'
        },
        {
            name: 'Ingresos',
            value: parseInt(resume.incomes.replace("$", "").replace('.', '')),
            color: '#3A785E',
            type: 'income'
        },
    ]
    return (
        <div className={styles.container}>
            <BalanceFilter startDate={startDate} endDate={endDate} />
            <div className={styles.content}>
                <BalanceResume resume={resume} />
                <section className={styles.chart}>
                    <PieChartComponent categories={categories} />
                </section>
            </div>
        </div>
    )
}

export default BalanceContainer 