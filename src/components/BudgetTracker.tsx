import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import BudgetDisplay from "./BudgetDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const { state, dispatch, spent, available } = useBudget()

    const handleReset = () => {
        const confirmReset = confirm('Do you wish to reset your app?')
        if (confirmReset) {
            dispatch({ type: 'reset-app' })
        }
    }

    const percentage = +((spent / state.budget) * 100).toFixed(2)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div className="flex justify-center md:p-5">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#EF4444' : '#0EA5E9',
                        trailColor: '#F5F5F5',
                        textSize: 10,
                        textColor: percentage === 100 ? '#EF4444' : '#0EA5E9',
                    })}
                    text={`${percentage}% spent`}

                />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start gap-2">
                <button
                    type="submit"
                    className="w-full p-2 font-bold bg-red-500 hover:bg-red-600 border-4 border-red-600 text-white rounded-lg uppercase"
                    onClick={handleReset}
                >
                    Reset App
                </button>
                <div className="flex flex-col items-center gap-5 border-4 border-gray-200 p-5 rounded-lg self-stretch">
                    <BudgetDisplay
                        label='Budget'
                        number={state.budget}
                    />
                    <BudgetDisplay
                        label='Available'
                        number={available}
                    />
                    <BudgetDisplay
                        label='Spent'
                        number={spent}
                    />
                </div>
            </div>
        </div>
    )
}
