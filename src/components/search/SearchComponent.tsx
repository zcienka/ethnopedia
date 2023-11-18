import React, { useState } from "react"
import QuickSearch from "./QuickSearch"
import AdvancedSearch from "./AdvancedSearch"

const SearchComponent = () => {
    const [activeTab, setActiveTab] = useState<string>("quickSearch")

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName)
    }

    return <>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200
        dark:border-gray-700 dark:text-gray-300">
            <li className="me-2">
                <div
                    onClick={() => handleTabClick("quickSearch")}
                    className={`inline-block p-2 rounded-t-lg ${activeTab === "quickSearch" ?
                        "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border border-gray-300 " +
                        "dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" :
                        "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                    Szybkie wyszukiwanie
                </div>
            </li>
            <li className="me-2">
                <div
                    onClick={() => handleTabClick("advancedSearch")}
                    className={`inline-block p-2 rounded-t-lg ${activeTab === "advancedSearch" ?
                        "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 border border-gray-300 " +
                        "dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600" :
                        "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>
                    Zaawansowane wyszukiwanie
                </div>
            </li>
        </ul>

        {activeTab === "quickSearch" && <QuickSearch />}
        {activeTab === "advancedSearch" && <AdvancedSearch />}
    </>
}

export default SearchComponent
