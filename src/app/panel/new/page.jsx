import { Category } from '@/api/category'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TransactionForm from '@/components/forms/transaction/TransactionForm'
import { getServerSession } from 'next-auth';
import styles from './new.module.scss'

export const metadata = {
    title: "Crear Nueva Transacción - FinazApp",
    description: "Registra fácilmente tus transacciones financieras en FinazApp. Crea un nuevo movimiento, registra tus gastos o ingresos, y mantén un control efectivo de tu actividad financiera.",
}

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