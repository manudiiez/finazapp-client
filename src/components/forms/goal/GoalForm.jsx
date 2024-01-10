import { useEffect, useState } from "react";
import styles from '../forms.module.scss'
import { Goal } from "@/api/goal";
import Swal from "sweetalert2";
const GoalForm = ({ initialValues, mode = "create", session, id }) => {

    const goalCtrl = new Goal()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [values, setValues] = useState({
        amount: initialValues?.amount || '',
        category: {
            name: initialValues?.category?.name || '',
            color: initialValues?.category?.color || ''
        },
        deadline: initialValues?.deadline || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const createGoal = async () => {
        await goalCtrl.save({ ...values, amount: parseFloat(values.amount), user: id }, session.token)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "success",
            title: `Objetivo creado!!`
        })
        window.location.href = "/panel/goals"
    }

    const updateGoal = async () => {
        await goalCtrl.update({ ...values, amount: parseFloat(values.amount) }, session.token, id)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "success",
            title: `Objetivo editado!!`
        })
        window.location.href = "/panel/goals"
    }

    const deleteGoal = async () => {
        Swal.fire({
            title: `Eliminar Objetivo`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await goalCtrl.delete(session.token, id)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                await Toast.fire({
                    icon: "success",
                    title: `Objetivo editado!!`
                })
                window.location.href = "/panel/goals"
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'create') {
            await createGoal()
        } else {
            await updateGoal()
        }
    }


    useEffect(() => {
        if (initialValues) {
            setValues(initialValues)
        }
    }, [initialValues])

    return (
        <div className={styles.goalForm}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="category" onChange={handleChange} placeholder="Titulo" value={values?.category?.name} required />
                <div>
                    <label htmlFor="colorInput">Color</label>
                    <input type="color" name="color" id="colorInput" onChange={handleChange} value={values?.category?.color} required />
                </div>
                <input type="number" name="amount" onChange={handleChange} placeholder="Suma" value={values?.amount} required />
                <div>

                    <label htmlFor="inputDate">Fecha</label>
                    <input type="datetime-local" name="deadline" id="inputDate" onChange={handleChange} value={formatDate(values?.deadline)} required />
                </div>
                <button type="submit">{mode === 'create' ? 'Crear' : "Editar"}</button>
                {
                    mode !== 'create' && (
                        <button type="button" onClick={deleteGoal}>Eliminar</button>
                    )
                }
            </form>
        </div>
    )
}

export default GoalForm