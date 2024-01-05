"use client"
import { useEffect, useState } from 'react';
import styles from '../forms.module.scss'
import Modal from '@/components/shared/Modal';
import { IconClose } from '@/components/shared/Icons';
import Swal from 'sweetalert2';
import { Transaction } from '@/api/transaction';
import { Category } from '@/api/category';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const TransactionForm = ({ categories, initialValues, mode = "create", session, id }) => {


    const [values, setValues] = useState({
        amount: initialValues?.amount || '',
        date: initialValues?.date || '',
        category: initialValues?.category || categories['income'].default,
        note: initialValues?.note || '',
        type: initialValues?.type || 'income'
    });
    const [categoriesData, setCategoriesData] = useState(categories);
    const [categoriesModalShow, setCategoriesModalShow] = useState(false);

    const transactionCtrl = new Transaction()
    const categoryCtrl = new Category()

    useEffect(() => {
        if (initialValues) {
            setValues(initialValues)
        }
    }, [initialValues])

    const createTrasaction = async () => {
        await transactionCtrl.save({ ...values, amount: parseFloat(values.amount), category: values.category._id, user: session.user.id }, session.token)
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
    }

    const updateTrasaction = async () => {
        await transactionCtrl.update({ ...values, amount: parseFloat(values.amount), category: values.category._id }, session.token, id)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "success",
            title: `Transaccion editada correctamente!!`
        })
        window.location.href = "/panel"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'create') {
                await createTrasaction()
            } else {
                await updateTrasaction()
            }

        } catch (error) {
            console.log(error);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleChangeType = (e) => {
        handleChange(e)
        handleChange({
            target: {
                name: 'category',
                value: categories[e.target.value].default
            }
        })
    };


    const createCategory = () => {
        Swal.fire({
            title: "Nombre de la categoria",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: false,
            confirmButtonText: "Crear",
            showDenyButton: true,
            denyButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: async (name) => {
                try {
                    const response = await categoryCtrl.save({
                        name: name,
                        type: values.type,
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
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: `Categoria ${result.value.name} creada!!`
                })
                const list = categoriesData[values.type]
                list.list.push(result.value)
                setCategoriesData({ ...categoriesData, [values.type]: list })
            }
        });
    }

    const deleteCategory = (id, name) => {
        Swal.fire({
            title: `Eliminar ${name}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await categoryCtrl.delete(id, session.token)
                const newList = categoriesData[values.type]
                const list = newList.list.filter(item => item._id !== id);
                newList.list = list
                setCategoriesData({ ...categoriesData, [values.type]: newList })
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

    const deleteTransaction = () => {
        Swal.fire({
            title: `Eliminar transaccion`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await transactionCtrl.delete(session.token, id)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                await Toast.fire({
                    icon: "success",
                    title: "Transaccion eliminada!!"
                })
                window.location.href = "/panel"
            }
        });
    }

    return (
        <div className={styles.transactionForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.labels}>
                    <input type="radio" id="option1" name="type"
                        value="income"
                        checked={values?.type === 'income'}
                        onChange={handleChangeType}
                    />
                    <label htmlFor="option1">Ingreso</label>

                    <input type="radio" id="option2" name="type"
                        value="bill"
                        checked={values?.type === 'bill'}
                        onChange={handleChangeType}
                    />
                    <label htmlFor="option2">Gasto</label>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="amount">Monto</label>
                    <input
                        id='amount'
                        type="number"
                        name="amount"
                        value={values?.amount}
                        onChange={handleChange}
                        placeholder="$0"
                    />

                </div>
                <div className={styles.inputGroup} onClick={() => setCategoriesModalShow(true)}>
                    <label htmlFor="category">Categoria</label>
                    <span>{values?.category.name}</span>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="date">Fecha</label>
                    <input
                        id='date'
                        type="datetime-local"
                        name="date"
                        value={formatDate(values?.date)}
                        onChange={handleChange}
                        placeholder="Hoy"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="note">Nota</label>
                    <input
                        id='note'
                        type="text"
                        name="note"
                        value={values?.note}
                        onChange={handleChange}
                        placeholder="Nota"
                    />
                </div>
                <button type="submit" className={styles.button}>
                    {
                        mode === 'create' ? 'CREAR' : 'EDITAR'
                    }
                </button>
                {
                    mode !== 'create' && (
                        <button className={styles.button2} onClick={() => deleteTransaction()} type='button'>
                            ELIMINAR
                        </button>
                    )
                }
            </form>
            <Modal show={categoriesModalShow} changeShow={() => setCategoriesModalShow(!categoriesModalShow)} >
                <ul className={styles.categoryList}>
                    <li>
                        <button onClick={createCategory}>
                            Crear categoria
                        </button>
                    </li>
                    {
                        categoriesData[values?.type]?.list.map(item => (
                            <li key={item._id}>
                                <button onClick={() => {
                                    handleChange({
                                        target: {
                                            name: 'category',
                                            value: item
                                        }
                                    })
                                    setCategoriesModalShow(false)
                                }}>
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
    );
};

export default TransactionForm;