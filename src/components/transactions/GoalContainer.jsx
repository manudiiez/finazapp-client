import { Goal } from '@/api/goal';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Message from '../shared/Message';
import GoalItem from '../GoalItem';
const GoalContainer = async () => {

    const goalCtrl = new Goal()
    const session = await getServerSession(authOptions);
    const response = await goalCtrl.getAll(session.token)
    return (
        <div>
            {
                response.length == 0 ? (
                    <Message text="No hay Objectivos" height={100} />
                ) : (
                    <ul>
                        {
                            response.map(item => (
                                <GoalItem data={item} mode={true} key={item._id} />
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default GoalContainer