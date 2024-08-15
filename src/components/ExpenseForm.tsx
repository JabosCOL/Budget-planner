import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { categories } from "../data/categories";
import { DraftExpense, Value } from '../types';
import ErrorDisplay from './ErrorDisplay';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        name: '',
        amount: 0,
        category: '',
        date: new Date
    });
    const [ previousAmount, setPreviousAmount ] = useState(0)
    const [ error, setError ] = useState('')
    const { state, dispatch, available } = useBudget()

    useEffect(() => {
        if (state.expenseId) {
            const editingExpense = state.expense.filter(expense => expense.id === state.expenseId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.expenseId])

    const handleForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const isAmountField = ['amount'].includes(e.target.name)
        setExpense({
            ...expense,
            [e.target.name]: isAmountField ? +e.target.value : e.target.value
        })
    }

    const handleDate = (value: Value) => {
        setExpense({ ...expense, date: value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // validations

        // No blank spaces
        if (Object.values(expense).includes('')) {
            setError('All fields must be filled')
            return
        }

        // Don't spend more than the available
        if (( expense.amount - previousAmount ) > available) {
            setError(`Insufficient balance / Current balance: $${available}`)
            return
        }

        // Don't add less than $0
        if (expense.amount <= 0) {
            setError('Amount must be higher than 0')
            return
        }

        // Update the expense
        if (state.expenseId) {
            dispatch({ type: 'update-expense', payload: { expense: { ...expense, id: state.expenseId } } })
            setExpense({
                name: '',
                amount: 0,
                category: '',
                date: new Date
            })
        } else {
            dispatch({ type: 'create-expense', payload: { expense } })
        }
    }

    return (
        <form className="space-y-3" onSubmit={handleSubmit}>
            <legend
                className="text-2xl font-black uppercase text-center p-2 border-b-4 border-sky-500"
            >
                {state.expenseId ? 'Edit expense' : 'New expense'}
            </legend>
            <div className="flex flex-col gap-2">
                {error && <ErrorDisplay>{error}</ErrorDisplay>}
                <label
                    className="font-bold"
                    htmlFor="name"
                >
                    Name:
                </label>
                <input
                    className="bg-gray-100 p-2 rounded-lg"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Add the expense's name"
                    value={expense.name}
                    onChange={handleForm}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold"
                    htmlFor="amount"
                >
                    Amount:
                </label>
                <input
                    className="bg-gray-100 p-2 rounded-lg"
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Add the expense's amount i.e: 300"
                    value={expense.amount}
                    onChange={handleForm}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold"
                    htmlFor="category"
                >
                    Category:
                </label>
                <select
                    className="bg-gray-100 p-2 rounded-lg"
                    id="category"
                    name="category"
                    value={expense.category}
                    onChange={handleForm}
                >
                    <option value="">-- Select the category --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold"
                    htmlFor="date"
                >
                    Date:
                </label>
                <DatePicker value={expense.date} onChange={handleDate} />
            </div>
            <input
                className="w-full text-center text-white font-bold uppercase bg-sky-500 border-4 border-sky-600 p-2 rounded-lg"
                type="submit"
                value={state.expenseId ? 'Edit expense' : 'Save new expense'}
            />
        </form>
    )
}
