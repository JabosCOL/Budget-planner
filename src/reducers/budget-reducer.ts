import { v4 as uuidv4 } from "uuid"
import { Category, DraftExpense, Expense } from "../types"

export type BudgedActions =
    { type: 'add-budget', payload: {budget: number}} |
    { type: 'open-modal' } |
    { type: 'close-modal' } |
    { type: 'create-expense', payload: {expense: DraftExpense} } |
    { type: 'delete-expense', payload: {id: Expense['id']} } |
    { type: 'get-expense-id', payload: {id: Expense['id']} } |
    { type: 'update-expense', payload: {expense: Expense} } |
    { type: 'filter-expense', payload: {id: Category['id']} } |
    { type: 'reset-app' }

export type BudgetState = {
    budget: number,
    modal: boolean,
    expense: Expense[]
    expenseId: Expense['id']
    expenseFilter: Expense['category']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpense = () : Expense[] => {
    const localStorageExpense = localStorage.getItem('expense')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState : BudgetState = {
    budget : initialBudget(),
    modal: false,
    expense: initialExpense(),
    expenseId: '',
    expenseFilter: ''
}

export const budgetReducer = (
    state : BudgetState = initialState,
    actions: BudgedActions
) => {

    if (actions.type === 'add-budget') {
        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if (actions.type === 'open-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (actions.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            expenseId: ''
        }
    }

    if (actions.type === 'create-expense') {
        const createExpense = () => {
            const newExpense = {
                ...actions.payload.expense,
                id: uuidv4()
            }
            return newExpense
        }

        return {
            ...state,
            expense: [...state.expense, createExpense()],
            modal: false
        }
    }

    if (actions.type === 'delete-expense') {
        return {
            ...state,
            expense: state.expense.filter( expense => expense.id !== actions.payload.id)
        }
    }

    if (actions.type === 'get-expense-id') {
        return {
            ...state,
            expenseId: actions.payload.id,
            modal: true
        }
    }

    if (actions.type === 'update-expense') {
        return {
            ...state,
            expense: state.expense.map(expense => expense.id === state.expenseId ? actions.payload.expense : expense),
            modal: false,
            expenseId: ''
        }
    }

    if (actions.type === 'filter-expense') {
        return {
            ...state,
            expenseFilter: actions.payload.id
        }
    }

    if (actions.type === 'reset-app') {
        return {
            ...state,
            budget : 0,
            expense: [],
        }
    }

    return state
}