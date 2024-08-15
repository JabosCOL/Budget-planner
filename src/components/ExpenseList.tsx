import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDisplay from "./ExpenseDisplay"
import ExpenseFilter from "./ExpenseFilter"

export default function ExpenseList() {

    const { state } = useBudget()

    const isEmpty = useMemo(() => state.expense.length === 0, [state.expense])

    const filteredExpenses = state.expenseFilter ? state.expense.filter(expense => expense.category === state.expenseFilter) : []

    return (
        <div className="mt-10">
            {isEmpty ?
                <p className="pl-5 md:p-0 md:text-center font-bold text-gray-600 text-xl md:text-2xl">Start adding your expenses! 💵</p> :
                <>
                    <ExpenseFilter />
                    <div className="space-y-3 my-10 flex flex-col items-center md:items-start">
                        <p className="font-bold text-gray-600 text-3xl">Expenses</p>
                        <p className="text-gray-600 font-bold text-lg">{filteredExpenses.length ? `"Slide your expenses to interact with them 👌"`
                            : state.expenseFilter ? "There are not expenses with this category yet ☹"
                                : `"Slide your expenses to interact with them 👌"`}</p>

                    </div>
                    {filteredExpenses.length ?
                        filteredExpenses.map(filteredExpense => (
                            <ExpenseDisplay
                                key={filteredExpense.id}
                                expense={filteredExpense}
                            />
                        ))
                            : state.expenseFilter ? ''
                                : state.expense.map(expense => (
                                    <ExpenseDisplay
                                        key={expense.id}
                                        expense={expense}
                                    />
                                ))
                    }
                </>
            }
        </div>
    )
}
