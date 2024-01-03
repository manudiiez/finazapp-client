
"use client"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './TransactionForm.form';
import styles from '../forms.module.scss'
const TransactionForm = () => {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                console.log(formValue);
            } catch (error) {
                toast.error(error)
            }
        }
    })

    return (
        <div className={styles.transactionForm}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.labels}>
                    <input type="radio" id="option1" name="type"
                        value="income"
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="option1">Ingreso</label>

                    <input type="radio" id="option2" name="type"
                        value="bill"
                        onChange={formik.handleChange}
                    />
                    <label htmlFor="option2">Gasto</label>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="amount">Monto</label>
                    <input type="number" name='amount' placeholder='$0'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <div className={styles.inputGroup}>

                        <label htmlFor="category">Categoria</label>
                        <input type="text" name='category' placeholder='Sin categoria'
                            value={formik.values.category}
                            required
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date">Fecha</label>
                        <input type="date" name='date' placeholder='hoy'
                            value={formik.values.date}
                            required
                            onChange={formik.handleChange}
                            error={formik.errors.date}
                        />
                    </div>

                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="note">Nota</label>
                    <input type="text" name='note' placeholder='-'
                        value={formik.values.note}
                        onChange={formik.handleChange}
                    />
                </div>
                <button className={styles.button} type='submit'>
                    Guardar transaccion
                </button>
            </form>
        </div>
    )
}

export default TransactionForm