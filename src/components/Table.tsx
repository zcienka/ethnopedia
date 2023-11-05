import { useQuery } from "react-query"
import { fetchTracks } from "../api/tracks"
import LoadingPage from "../pages/LoadingPage"
import { v4 as uuidv4 } from "uuid"
import { useTranslation } from "react-i18next"
import FilterDropdown from "./FilterDropdown"
import { ReactComponent as FileExportIcon } from "../assets/icons/fileExport.svg"
import { ReactComponent as FileImportIcon } from "../assets/icons/fileImport.svg"
import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import Pagination from "./Pagination"
import Category from "./Category"

const Table = () => {
    const { data: fetchedData } = useQuery(
        ["track"],
        fetchTracks,
    )
    const [t] = useTranslation("table")

    const categoryColorList = [
        "indigo",
        "cyan",
        "pink",
        "green",
        "indigo",
        "purple",
        "purple",
        "purple",
        "purple",
        "purple",
        "purple"
    ]


    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allTracks = fetchedData.tracks.map((track: any, index: number) => {
            return <tr className="border-b dark:border-gray-700" key={uuidv4()}>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox"
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                                dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800
                                focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-all-search" className="sr-only">
                            checkbox
                        </label>
                    </div>
                </th>

                {fetchedData.columnNames.map((columnName: string) => {
                    if (columnName === "Kategoria") {
                        const color = categoryColorList[index]
                        return <td className="px-4 py-3" key={uuidv4()}>
                            <Category name={track[columnName]} color={color} />
                        </td>
                    } else {
                        return (
                            <td className="px-4 py-3" key={uuidv4()}>
                                {track[columnName]}
                            </td>
                        )
                    }
                })}
            </tr>
        })
        return <div className="grow">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div
                        className="bg-white dark:bg-gray-800 relative shadow-md border sm:rounded-lg overflow-hidden dark:border-gray-700">
                        <div
                            className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0
                            md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label
                                        htmlFor="simple-search"
                                        className="sr-only"
                                    >
                                        {t("search")}
                                    </label>
                                    <div className="relative w-full">
                                        <div
                                            className="absolute inset-y-0 left-0 flex items-center pl-3
                                            pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder={`${t("search")}`}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div
                                className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    type="button"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <PlusIcon />
                                    {t("addNewRecord")}
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <FileExportIcon />

                                        {t("excelExport")}
                                    </button>
                                    <button
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <FileImportIcon />
                                        {/*<FileDropzone />*/}
                                        {t("fileImport")}
                                    </button>
                                    <button
                                        id="filterDropdownButton"
                                        data-dropdown-toggle="filterDropdown"
                                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        <FilterIcon />
                                        {t("filter")}
                                        <svg
                                            className="-mr-1 ml-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    </button>
                                    <FilterDropdown />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">
                                    </th>
                                    {fetchedData.columnNames.map((columnName: string) => (
                                        <th className="px-4 py-3" key={uuidv4()}>
                                            {columnName}
                                        </th>
                                    ))}

                                    <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {allTracks}
                                </tbody>
                            </table>
                        </div>
                        <Pagination />
                    </div>
                </div>
            </section>
        </div>
    }
}

export default Table
