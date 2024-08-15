import { formatCurrency } from "../helpers"

type BudgetDisplayProps = {
   label?: string,
   number: number
}

export default function BudgetDisplay({label, number} : BudgetDisplayProps) {
  return (
    <>
        { number <= 0 ? (
          <p className="text-2xl text-red-500 font-black">{label && `${label}: `} <span className="text-red-500">{formatCurrency(number)}</span></p>
        ) : (
          <p className="text-2xl text-sky-500 font-black">{label && `${label}: `} <span className="text-gray-600">{formatCurrency(number)}</span></p>

        )}
    </>
  )
}
