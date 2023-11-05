const FilterDropdown = () => {
    return <div
        id="filterDropdown"
        className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
    >
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Choose brand
        </h6>
        <ul
            className="space-y-2 text-sm"
            aria-labelledby="filterDropdownButton"
        >
            <li className="flex items-center">
                <input
                    id="apple"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor="apple"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    Apple (56)
                </label>
            </li>
            <li className="flex items-center">
                <input
                    id="fitbit"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor="fitbit"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    Microsoft (16)
                </label>
            </li>
            <li className="flex items-center">
                <input
                    id="razor"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor="razor"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    Razor (49)
                </label>
            </li>
            <li className="flex items-center">
                <input
                    id="nikon"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor="nikon"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    Nikon (12)
                </label>
            </li>
            <li className="flex items-center">
                <input
                    id="benq"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor="benq"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    BenQ (74)
                </label>
            </li>
        </ul>
    </div>
}
export default FilterDropdown