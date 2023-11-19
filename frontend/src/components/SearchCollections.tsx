import { ReactComponent as SearchLoop } from "../assets/icons/searchLoop.svg"

const SearchCollections = () => {
    return <div
        id="default-modal"
        aria-hidden="true"
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50"
    >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" />
            <form>
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                       <SearchLoop/>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                           bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search Mockups, Logos..." />
                    <button type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800
                            focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
                             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>
        </div>
    </div>
}
export default SearchCollections