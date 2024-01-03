import styles from '@/styles/components/categoryInput.module.scss'
import { IconClose, IconPlus } from './shared/Icons';
import { Category } from '@/api/category';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const CategoryInput = ({ category, setCategory, type }) => {

    const categoryCtrl = new Category()
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            setData(await categoryCtrl.getAll(session.token));
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [status])

    const handleClickDelete = (id, name) => {
        toast(`Eliminar ${name}`, {
            action: {
                label: 'Eliminar',
                onClick: () => console.log('delete', id),
            },
            duration: 3000
        });
    }
    const handleClick = (id, name) => {
        console.log('selected', id);
        setCategory({ id, name })
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputGroup}>
                <label htmlFor="category">Categoria</label>
                <span>{category}</span>
            </div>
            {
                loading ? (
                    <p>cargando...</p>
                ) : (
                    <ul className={styles.list}>
                        <li>
                            <button>
                                Crear categoria
                                <IconPlus />
                            </button>
                        </li>
                        {
                            data.map(item => (
                                <li key={item._id}>
                                    <button onClick={() => handleClick(item._id, item.name)}>
                                        {item.name}
                                    </button>
                                    {
                                        item.name !== 'Sin categorizar' && (
                                            <button onClick={() => handleClickDelete(item._id, item.name)}>
                                                <IconClose />
                                            </button>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div >
    )
}

export default CategoryInput