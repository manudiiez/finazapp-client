import GoalCreate from '@/components/GoalCreate'
import styles from './goals.module.scss'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Goal } from '@/api/goal';
import GoalList from '@/components/GoalList';
const GoalPanel = async () => {
    const goalCtrl = new Goal()
    const session = await getServerSession(authOptions);
    const response = await goalCtrl.getAll(session.token)
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h5>Objetivos</h5>
                <GoalCreate session={session} />
            </div>
            <GoalList data={response} session={session} />
        </div>
    )
}

export default GoalPanel