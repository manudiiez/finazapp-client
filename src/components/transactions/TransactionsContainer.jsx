import { Transaction } from "@/api/transaction";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import TransactionsItem from "./TransactionsItem";
import styles from '@/styles/components/panelTransactions.module.scss'

const TransactionsContainer = async () => {

    const transactionCtrl = new Transaction()
    const session = await getServerSession(authOptions);
    const transactions = await transactionCtrl.getAll(session.token)
    return (
        <div className={styles.container}>
            <h3>Transacciones</h3>
            <ul>
                {
                    transactions.map(data => (
                        <TransactionsItem data={data} key={data.fecha} />
                    ))
                }
            </ul>
        </div>
    )
}

export default TransactionsContainer