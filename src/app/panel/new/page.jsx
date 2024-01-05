import { Category } from '@/api/category'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TransactionForm from '@/components/forms/transaction/TransactionForm'
import { getServerSession } from 'next-auth';
import styles from './new.module.scss'
const NewTransaction = async () => {
    const session = await getServerSession(authOptions);
    const categoryCtrl = new Category()
    const categories = await categoryCtrl.getAll(session.token)
    return (
        <div className={styles.container}>
            <TransactionForm categories={categories} session={session} />
        </div>
    )
}

export default NewTransaction