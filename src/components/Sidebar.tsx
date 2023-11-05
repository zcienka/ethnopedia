import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import SidebarTableComponent from "./SidebarTableComponent"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import { useTranslation } from "react-i18next"
import SidebarSearchBar from "./SidebarSearchBar"


const Sidebar = () => {
    const [sidebarComponents, setSidebarTableComponents] = useState([{ id: 1 }])
    const [nextSidebarTableComponentId, setNextSidebarTableComponentId] = useState(2)
    const [t] = useTranslation("sidebar")

    const addNewSidebarTableComponent = () => {
        setSidebarTableComponents([...sidebarComponents, { id: nextSidebarTableComponentId }])
        setNextSidebarTableComponentId(nextSidebarTableComponentId + 1)
    }

    const handleSidebarTableComponentChange = (id: number, value: any) => {
        const updatedSidebarTableComponents = [...sidebarComponents]

        const sidebarToUpdate: any = updatedSidebarTableComponents.find((sidebar) => sidebar.id === id)

        if (sidebarToUpdate) {
            sidebarToUpdate.value = value
        }

        setSidebarTableComponents(updatedSidebarTableComponents)
    }

    return <aside className="w-64 transition-transform -translate-x-full sm:translate-x-0 shadow-md"
                  aria-label="Sidenav">
        <div
            className="overflow-y-auto py-5 px-3 h-full font-medium bg-white border-r border-gray-200
            dark:bg-gray-800 dark:border-gray-700 text-sm">
            <SidebarSearchBar/>
            <ul className="space-y-2">
                {sidebarComponents.map((sidebar, index) => (
                    <span key={uuidv4()}>
                             <SidebarTableComponent
                                 componentName={`${t("newCollection")}`}
                                 onInputChange={(value) => handleSidebarTableComponentChange(sidebar.id, value)} />
                     </span>
                ))}
            </ul>

            <button
                className="flex px-4 py-2 items-center text-sm font-normal text-gray-900 rounded-lg dark:text-white
                 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={addNewSidebarTableComponent}>
                <PlusIcon />
                <span className="flex-1 ml-1 whitespace-nowrap">
                    {t("addNewCollection")}
                </span>
            </button>

        </div>
    </aside>
}
export default Sidebar