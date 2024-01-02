import { Transaction } from "@/api/transaction"
import BalanceFilter from "./BalanceFilter"
import BalanceResume from "./BalanceResume"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import styles from '@/styles/components/panelBalance.module.scss'

const BalanceContainer = async ({ startDate, endDate }) => {
    const transactionCtrl = new Transaction()
    const session = await getServerSession(authOptions);
    const resume = await transactionCtrl.getResume(startDate, endDate, session.token)
    return (
        <div className={styles.container}>
            <BalanceFilter />
            <BalanceResume resume={resume} />
        </div>
    )
}

export default BalanceContainer