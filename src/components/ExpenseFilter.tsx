import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseFilter() {

    const { dispatch } = useBudget()

    return (
        <div className="w-full p-8 bg-white shadow-lg rounded-lg ">
            <form>
                <div className="flex flex-col md:flex-row justify-around items-center gap-5 md:gap-10">
                    <label
                        className="font-bold text-3xl text-gray-600"
                        htmlFor="filter"
                    >
                        Filter expenses
                    </label>
                    <select
                        className="bg-gray-100 text-center text-lg text-gray-600 font-bold w-full md:flex-1 rounded-lg p-2"
                        id="filter"
                        onChange={(e) => dispatch({type: 'filter-expense', payload: {id: e.target.value}})}
                    >
                        <option value="">See all categories</option>
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
            </form>
        </div>
    )
}
