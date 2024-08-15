import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expense', JSON.stringify(state.expense))
  }, [state])

  return (
    <>
      <header className="bg-sky-500 pt-10 max-h-72">
        <p className="text-3xl font-black text-white text-center uppercase">Budget Planner</p>
      </header>

      <section className="bg-sky-500">
        <div className="max-w-3xl m-auto  bg-white p-10 rounded-lg shadow-lg translate-y-10">
          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
        </div>
      </section>

      {isValidBudget &&
        <main className="max-w-3xl m-auto py-10 px-5">
          <ExpenseList />
          <ExpenseModal />
        </main>
      }
    </>
  )
}

export default App
