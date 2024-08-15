import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react"
import { BudgedActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

export type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<BudgedActions>,
    spent : number,
    available : number
}

export type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const spent = useMemo(() => state.expense.reduce((total, currentExpense) =>
        total + currentExpense.amount, 0
    ), [state.expense])

    const available = useMemo(() =>  state.budget - spent, [state.budget, spent])

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                spent,
                available
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}