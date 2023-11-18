import React, { useState } from "react"
import SidebarSearchBar from "./SidebarSearchBar"

const Sidebar = () => {
    const [sidebarComponents, setSidebarTableComponents] = useState([{ id: 1 }])
    const [nextSidebarTableComponentId, setNextSidebarTableComponentId] = useState(2)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [subDropdownOpen, setSubDropdownOpen] = useState<any>({})

    const addNewSidebarTableComponent = () => {
        setSidebarTableComponents([...sidebarComponents, { id: nextSidebarTableComponentId }])
        setNextSidebarTableComponentId(nextSidebarTableComponentId + 1)
    }

    const handleSidebarTableComponentChange = (id: number, value: any) => {
        const updatedSidebarTableComponents = [...sidebarComponents]
        const sidebarToUpdate = updatedSidebarTableComponents.find((sidebar) => sidebar.id === id) as any

        if (sidebarToUpdate) {
            sidebarToUpdate.value = value
        }

        setSidebarTableComponents(updatedSidebarTableComponents)
    }

    const toggleSubDropdown = (category: string) => {
        setSubDropdownOpen((prev: any) => ({ ...prev, [category]: !prev[category] }))
    }

    return <aside className="w-64 transition-transform -translate-x-full sm:translate-x-0 shadow-md"
                  aria-label="Sidenav">
        <div
            className="overflow-y-auto py-5 px-3 h-full font-medium bg-white border-r border-gray-200
            dark:bg-gray-800 dark:border-gray-700 text-sm">
            <SidebarSearchBar />
            {/*<ul className="space-y-2">*/}
            {/*    {sidebarComponents.map((sidebar) => (*/}
            {/*        <span key={uuidv4()}>*/}
            {/*                 <SidebarTableComponent*/}
            {/*                     componentName={`Nowa kolekcja`}*/}
            {/*                     onInputChange={(value) => handleSidebarTableComponentChange(sidebar.id, value)} />*/}
            {/*         </span>*/}
            {/*    ))}*/}
            {/*</ul>*/}


            <ul className="space-y-2">
                <li>
                    <button type="button"
                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example"
                            onClick={() => setDropdownOpen((d) => !d)}>

                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Kolekcja 1</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <ul className="py-2 space-y-2">
                            {[1, 2, 3].map(category => (
                                <li key={category}>
                                    <button onClick={() => toggleSubDropdown(`category${category}`)}
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                        {`Kategoria ${category}`}
                                    </button>
                                    {subDropdownOpen[`category${category}`] && (
                                        <ul className="pl-6">
                                            <li><a href="#"
                                                   className="block p-2 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">Subkategoria
                                                1</a></li>
                                            <li><a href="#"
                                                   className="block p-2 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">Subkategoria
                                                2</a></li>
                                            {/* More subcategories if needed */}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>

            {/*<button*/}
            {/*    className="flex px-4 py-2 items-center text-sm font-normal text-gray-900 rounded-lg dark:text-white*/}
            {/*     hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"*/}
            {/*    onClick={addNewSidebarTableComponent}>*/}
            {/*    <PlusIcon />*/}
            {/*    <span className="ml-1 whitespace-nowrap">*/}
            {/*        Dodaj nową kolekcję*/}
            {/*    </span>*/}
            {/*</button>*/}
        </div>
    </aside>
}
export default Sidebar