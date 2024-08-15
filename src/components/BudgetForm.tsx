import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: 'add-budget', payload: {budget}})
    }

    const setBudgetState = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isInvalid = useMemo(() => {
        return (isNaN(budget) || budget <= 0)
    }, [budget])

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label
                htmlFor="budget"
                className="text-sky-500 text-4xl font-bold text-center"
            >
                Set Budget
            </label>
            <input
                type="number"
                name="budget"
                id="budget"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Set your budget i.e: 300"
                value={budget}
                onChange={setBudgetState}
            />
        </div>
        <input
            type="submit"
            value="Set Budget"
            className="w-full p-2 bg-sky-500 text-white font-black uppercase hover:bg-sky-600 cursor-pointer disabled:opacity-40"
            disabled={isInvalid}
        />
    </form>
  )
}
