import TableForm from "../forms/TableForm"
import FileDropzone from "./FileDropzone"
import FilterDropdown from "./filter/FilterDropdown"
import Pagination from "./Pagination"
import { ReactComponent as FileExportIcon } from "../assets/icons/fileExport.svg"
import { ReactComponent as FileImportIcon } from "../assets/icons/fileImport.svg"
import { ReactComponent as FilterIcon } from "../assets/icons/filter.svg"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import { ReactComponent as AngleDown } from "../assets/icons/angleDown.svg"
import { ReactComponent as SearchLoop } from "../assets/icons/searchLoop.svg"
import { useState } from "react"
import * as XLSX from "xlsx"
import { v4 as uuidv4 } from "uuid"

type Props = {
    fetchedData: any,
    tableRows: any
}
const Table = ({ fetchedData, tableRows }: Props) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(fetchedData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "DataSheet")
        XLSX.writeFile(wb, "DataExport.xlsx")
    }

    const [showTable, setShowTable] = useState<boolean>(false)
    const [showFileDropzone, setShowFileDropzone] = useState<boolean>(false)

    return <div className="grow">
        {showTable && <TableForm onClose={() => setShowTable(false)} />}
        {showFileDropzone && <FileDropzone onClose={() => setShowFileDropzone(false)} />}
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 shadow-md border sm:rounded-lg overflow-hidden
                        dark:border-gray-600">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0
                            md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Wyszukaj
                                </label>
                                <div className="relative w-full">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3
                                            pointer-events-none">
                                        <SearchLoop />
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-sm
                                            rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full
                                            pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={`Wyszukaj`}
                                    />
                                </div>
                            </form>
                        </div>
                        <div
                            className="w-full md:w-auto flex  flex-col md:flex-row space-y-2 md:space-y-0
                                items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <button
                                type="button"
                                className="flex items-center justify-center bg-primary-700 dark:text-white
                                    hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg
                                    text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
                                    dark:focus:ring-primary-800"
                                onClick={() => setShowTable(showTable => !showTable)}>
                                <PlusIcon />
                                Dodaj nowy rekord
                            </button>
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <button
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4
                                        focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-50
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button"
                                    onClick={() => exportToExcel()}
                                >
                                    <FileExportIcon />

                                    Eksportuj plik
                                </button>
                                <button
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4
                                        focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-50
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button"
                                    onClick={() => setShowFileDropzone(showFileDropzone => !showFileDropzone)}
                                >
                                    <FileImportIcon />
                                    Importuj plik
                                </button>
                                <button
                                    id="filterDropdownButton"
                                    data-dropdown-toggle="filterDropdown"
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10
                                        focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800
                                        dark:text-gray-50 dark:border-gray-600 dark:hover:text-white
                                        dark:hover:bg-gray-700"
                                    type="button"
                                >
                                    <FilterIcon />
                                    Filtruj
                                    <AngleDown />
                                </button>
                                <FilterDropdown />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-50">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700
                                    dark:text-gray-50">
                            <tr>
                                <th className="px-4 py-3">
                                </th>

                                {fetchedData.columnNames && fetchedData.columnNames.map((columnName: string) => (
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
                            {tableRows}
                            </tbody>
                        </table>
                    </div>
                    <Pagination />
                </div>
            </div>
        </section>
    </div>
}
export default Table