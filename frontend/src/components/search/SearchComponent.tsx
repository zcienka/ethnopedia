import React, { useState } from "react"
import QuickSearch from "./QuickSearch"
import AdvancedSearch from "./AdvancedSearch"
import FileDropzone from "../FileDropzone"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as FileImportIcon } from "../../assets/icons/fileImport.svg"
import { ReactComponent as FileExportIcon } from "../../assets/icons/fileExport.svg"
import { useNavigate } from "react-router-dom"


const SearchComponent = () => {
    const [activeTab, setActiveTab] = useState<string>("quickSearch")
    const [showFileDropzone, setShowFileDropzone] = useState<boolean>(false)
    const [, setShowTable] = useState<boolean>(false)

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName)
    }

    const exportToExcel = () => {
        // const ws = XLSX.utils.json_to_sheet(fetchedData)
        // const wb = XLSX.utils.book_new()
        // XLSX.utils.book_append_sheet(wb, ws, "DataSheet")
        // XLSX.writeFile(wb, "DataExport.xlsx")
    }

    return <div className="mb-2">
        {showFileDropzone && <FileDropzone onClose={() => setShowFileDropzone(false)} />}

        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200
        dark:border-gray-700 dark:text-gray-300">
            <li className="me-2">
                <div
                    onClick={() => handleTabClick("quickSearch")}
                    className={`inline-block p-2 rounded-t-lg cursor-pointer ${activeTab === "quickSearch" ?
                        "text-gray-800 font-semibold bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 " +
                        "dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" :
                        "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                    Szybkie wyszukiwanie
                </div>
            </li>
            <li className="me-2">
                <div
                    onClick={() => handleTabClick("advancedSearch")}
                    className={`inline-block p-2 rounded-t-lg cursor-pointer ${activeTab === "advancedSearch" ?
                        "text-gray-800 font-semibold bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 " +
                        "dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" :
                        "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                    Zaawansowane wyszukiwanie
                </div>
            </li>
        </ul>

        {activeTab === "quickSearch" && <QuickSearch />}
        {activeTab === "advancedSearch" && <AdvancedSearch />}

        <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
                type="button"
                className="flex items-center justify-center dark:text-white bg-white
                                    hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg
                                    text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
                                    dark:focus:ring-primary-800"
                onClick={() => setShowTable(showTable => !showTable)}>
                <PlusIcon />
                Dodaj nowy rekord
            </button>
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
        </div>
        {showFileDropzone && <FileDropzone onClose={() => setShowFileDropzone(false)} />}

    </div>
}

export default SearchComponent
