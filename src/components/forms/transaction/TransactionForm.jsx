"use client"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './TransactionForm.form';
import styles from '../forms.module.scss'
import { useRef, useState } from 'react';
import Modal from '@/components/shared/Modal';
import { IconClose, IconPlus } from '@/components/shared/Icons';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { Category } from '@/api/category';
import { Transaction } from '@/api/transaction';
import { useRouter } from 'next/navigation';
const TransactionForm = ({ data, categories }) => {
    const transactionCtrl = new Transaction()
    const categoryCtrl = new Category()
    const inputCategory = useRef(null)
    const router = useRouter()
    const [categoriesModalShow, setCategoriesModalShow] = useState(false);
    const [category, setCategory] = useState(categories['income'].default);
    const [categoriesList, setCategoriesList] = useState(categories);
    const [type, setType] = useState('income');
    const { data: session } = useSession()

    const formik = useFormik({
        initialValues: initialValues(type),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await transactionCtrl.save({ ...formValue, category: category._id, user: session.user.id }, session.token)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                await Toast.fire({
                    icon: "success",
                    title: `Transaccion creada!!`
                })
                window.location.href = "/panel"
            } catch (error) {
                console.log(error);
            }
        }
    })

    const changeType = (e) => {
        setType(e.target.value);
        formik.handleChange(e)
        setCategory(categories[e.target.value].default)
    }

    const changeCategory = (item) => {
        setCategory(item)
        setCategoriesModalShow(false)
    }

    const createCategory = () => {
        Swal.fire({
            title: "Nombre de la categoria",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Crear",
            showLoaderOnConfirm: true,
            preConfirm: async (name) => {
                try {
                    const response = await categoryCtrl.save({
                        name: name,
                        type: type,
                        user: session.user.id
                    },
                        session.token)
                    return response
                } catch (error) {
                    Swal.showValidationMessage(`
                  Error: ${error}
                `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: "success",
                    title: `Categoria ${result.value.name} creada!!`
                })
                const list = categoriesList[type]
                list.list.push(result.value)
                setCategoriesList({ ...categoriesList, [type]: list })
            }
        });
    }

    const deleteCategory = (id, name) => {
        Swal.fire({
            title: `Eliminar ${name}`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await categoryCtrl.delete(id, session.token)
                const newList = categoriesList[type]
                const list = newList.list.filter(item => item._id !== id);
                newList.list = list
                setCategoriesList({ ...categoriesList, [type]: newList })
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                await Toast.fire({
                    icon: "success",
                    title: "Categoria eliminada!!"
                })
            }
        });
    }

    return (
        <div className={styles.transactionForm}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.labels}>
                    <input type="radio" id="option1" name="type"
                        value="income"
                        checked={type === 'income'}
                        onChange={changeType}
                    />
                    <label htmlFor="option1">Ingreso</label>

                    <input type="radio" id="option2" name="type"
                        value="bill"
                        checked={type === 'bill'}
                        onChange={changeType}
                    />
                    <label htmlFor="option2">Gasto</label>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="amount">Monto</label>
                    <input type="number" name='amount' id='amount' placeholder='$0'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        required
                    />
                </div>
                <div>
                    <div className={styles.inputGroup} onClick={() => setCategoriesModalShow(!categoriesModalShow)}>

                        <label htmlFor="category">Categoria</label>
                        <span>{category.name}</span>
                    </div>
                </div>
                <div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">Fecha</label>
                        <input type="datetime-local" name='date' placeholder='hoy'
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            error={formik.errors.date}
                            required
                        />
                    </div>

                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="note">Nota</label>
                    <input type="text" name='note' id='note' placeholder='-'
                        ref={inputCategory}
                        value={formik.values.note}
                        onChange={formik.handleChange}
                    />
                </div>
                <button className={styles.button} type='submit'>
                    Guardar transaccion
                </button>
            </form>
            <Modal show={categoriesModalShow} changeShow={() => setCategoriesModalShow(!categoriesModalShow)} >
                <ul className={styles.categoryList}>
                    <li>
                        <button onClick={createCategory}>
                            Crear categoria
                        </button>
                    </li>
                    {
                        categoriesList[type].list.map(item => (
                            <li key={item._id}>
                                <button onClick={() => changeCategory(item)}>
                                    {item.name}
                                </button>
                                {
                                    item.name !== 'Sin categorizar' && (
                                        <button onClick={() => deleteCategory(item._id, item.name)}>
                                            <IconClose />
                                        </button>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </Modal>
        </div>
    )
}

export default TransactionForm