import { Transaction } from "@/api/transaction";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import styles from '@/styles/components/panelTransactions.module.scss'
import Transactions from "./Transactions";
import { Category } from "@/api/category";
import Message from "../shared/Message";

const TransactionsContainer = async () => {

    const transactionCtrl = new Transaction()
    const categoryCtrl = new Category()
    const session = await getServerSession(authOptions);
    const transactions = await transactionCtrl.getAll(session.token)
    const categories = await categoryCtrl.getAll(session.token)
    return (
        <div className={styles.container}>
            {
                transactions.length === 0 ? (
                    <Message text="No hay transacciones" height={100} />
                ) : (
                    <Transactions data={transactions} categories={categories} user={session} />
                )
            }
        </div>
    )
}

export default TransactionsContainer