import { useTranslation } from "react-i18next"
import { ReactComponent as SearchBarLoop } from "../../assets/icons/searchLoop.svg"
import { useState } from "react"

const SidebarSearchBar = () => {
    const [t] = useTranslation("sidebar")
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    return <div className="w-full mb-2">
        {/*{showSidebar && <SidebarSearchBarVisible onClose={() => setShowSidebar(false)} />}*/}
        <form className="flex items-center">
            <label
                htmlFor="simple-search"
                className="sr-only">
                {t("searchCollections")}
            </label>
            <div className="relative w-full" onClick={() => setShowSidebar(true)}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3
                                            pointer-events-none">
                    <SearchBarLoop />
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                        dark:focus:border-primary-500"
                    placeholder={`${t("searchCollections")}`}
                />
            </div>
        </form>
    </div>
}
export default SidebarSearchBar