import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"
import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import BudgetDisplay from "./BudgetDisplay"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDisplayProps = {
    expense: Expense
}

export default function ExpenseDisplay({ expense }: ExpenseDisplayProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {dispatch({type: 'get-expense-id', payload: {id: expense.id}})}}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => {dispatch({type: 'delete-expense', payload: {id: expense.id}})}}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList
            threshold={0.4}
        >
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white w-full p-5 md:p-10 flex gap-5 md:gap-10 items-center">
                    <div>
                        <img
                            src={`/icon_${categoryInfo?.icon}.svg`}
                            alt="category icon"
                            className="w-16 md:w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-slate-500 uppercase font-bold">{categoryInfo?.name}</p>
                        <p className="font-semibold">{expense.name}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <BudgetDisplay
                        number={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
