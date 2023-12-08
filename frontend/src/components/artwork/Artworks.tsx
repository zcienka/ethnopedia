import { useQuery, useQueryClient } from "react-query"
import { getAdvancedSearchResult, useBatchDeleteArtworkMutation } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"
import React, { useMemo, useState } from "react"
import Navbar from "../navbar/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import SearchComponent from "../search/SearchComponent"
import FileDropzone from "../FileDropzone"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as FileImportIcon } from "../../assets/icons/fileImport.svg"
import { ReactComponent as FileExportIcon } from "../../assets/icons/fileExport.svg"
import CreateArtwork from "./CreateArtwork"
import WarningPopup from "../../pages/collections/WarningPopup"
import CustomDropdown from "../CustomDropdown"

const Artworks = () => {
    const location = useLocation()
    const [selectedArtworks, setSelectedArtworks] = useState<{ [key: string]: boolean }>({})
    const [showFileDropzone, setShowFileDropzone] = useState<boolean>(false)
    const [showCreateArtwork, setShowCreateArtwork] = useState<boolean>(false)
    const [showWarningPopup, setShowWarningPopup] = useState(false)
    const [sortOrder, setSortOrder] = useState<string>("default")
    const queryClient = useQueryClient()

    const { mutate: batchDeleteMutation } = useBatchDeleteArtworkMutation()

    const searchParamsString = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return params.toString()
    }, [location.search])

    const sortOptions = [
        { value: "title-asc", label: "Tytuł rosnąco" },
        { value: "title-desc", label: "Tytuł malejąco" },
        { value: "year-asc", label: "Rok rosnąco" },
        { value: "year-desc", label: "Rok malejąco" },
    ]

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", searchParamsString],
        queryFn: () => getAdvancedSearchResult(searchParamsString),
        enabled: !!searchParamsString,
    })

    const selectAll = () => {
        console.log("selectAll")
        const newSelection = fetchedData.reduce((acc: any, artwork: any) => {
            acc[artwork._id] = true
            return acc
        }, {})
        setSelectedArtworks(newSelection)
    }

    const exportToExcel = () => {
        // const ws = XLSX.utils.json_to_sheet(fetchedData)
        // const wb = XLSX.utils.book_new()
        // XLSX.utils.book_append_sheet(wb, ws, "DataSheet")
        // XLSX.writeFile(wb, "DataExport.xlsx")
    }

    const sortArtworks = (artworks: any[], order: string) => {
        switch (order) {
            case "title-asc":
                return artworks.sort((a, b) => a.Tytuł.localeCompare(b.Tytuł))
            case "title-desc":
                return artworks.sort((a, b) => b.Tytuł.localeCompare(a.Tytuł))
            case "year-asc":
                return artworks.sort((a, b) => a.Rok - b.Rok)
            case "year-desc":
                return artworks.sort((a, b) => b.Rok - a.Rok)
            default:
                return artworks
        }
    }

    const sortedArtworks = useMemo(() => {
        return sortArtworks([...(fetchedData || [])], sortOrder)
    }, [fetchedData, sortOrder])

    const handleCheck = (id: string) => {
        setSelectedArtworks((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const deselectAll = () => {
        setSelectedArtworks({})
    }

    const deleteSelected = () => {
        const selectedIds = Object.keys(selectedArtworks).filter(id => selectedArtworks[id])

        if (selectedIds.length > 0) {
            batchDeleteMutation(selectedIds,
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(["artwork"])
                        setShowWarningPopup(!showWarningPopup)
                    },
                })
        }
    }

    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allArtworks = sortedArtworks.map((artwork: any) => (
            <div className="px-4 py-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border border-gray-300 dark:border-gray-600
            cursor-pointer"
                 key={artwork._id}
                 onClick={() => navigate(`/artwork/${artwork._id}`)}>

                <div className="flex flex-row">
                    <span className="mr-4 flex items-center">
                        <input type="checkbox"
                               checked={selectedArtworks[artwork._id!] || false}
                               onClick={(e) => e.stopPropagation()}
                               onChange={() => {
                                   handleCheck(artwork._id!)
                               }} />
                    </span>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{artwork.Tytuł}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{artwork.Artyści}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{artwork.Rok}</p>
                    </div>
                </div>
            </div>
        ))

        return <>
            <Navbar />

            {showFileDropzone && <FileDropzone onClose={() => setShowFileDropzone(false)} />}
            {showCreateArtwork && <CreateArtwork onClose={() => setShowCreateArtwork(false)} />}
            {showWarningPopup && <WarningPopup onClose={() => setShowWarningPopup(!showWarningPopup)}
                                               deleteSelected={deleteSelected}
                                               warningMessage={"Czy na pewno chcesz usunąć zaznaczone rekordy?"} />}
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
                <div className="mx-auto max-w-screen-xl lg:px-12">
                    <SearchComponent />
                    <div className="flex  w-full md:w-auto mb-4">
                        <div className="flex flex-1 space-x-3">
                            <button
                                type="button"
                                className="flex items-center justify-center dark:text-white bg-white
                                    hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium
                                    text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
                                    dark:focus:ring-primary-800"
                                onClick={() => setShowCreateArtwork(showCreateArtwork => !showCreateArtwork)}>

                        <span className="mr-2 text-gray-500 dark:text-gray-400">
                            <PlusIcon />
                        </span>
                                Nowy rekord
                            </button>
                            <button
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                                onClick={() => exportToExcel()}
                            >
                        <span className="text-gray-400 dark:text-gray-400">
                            <FileExportIcon />
                        </span>
                                Eksportuj plik
                            </button>
                            <button
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                                onClick={() => setShowFileDropzone(showFileDropzone => !showFileDropzone)}
                            >
                        <span className="text-gray-400 dark:text-gray-400">
                            <FileImportIcon />
                        </span>
                                Importuj plik
                            </button>

                            <button
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                                onClick={selectAll}
                            >
                                Zaznacz wszystkie
                            </button>

                            <button
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                                onClick={deselectAll}
                            >
                                Odznacz wszystkie
                            </button>

                            <button
                                className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                                onClick={() => {
                                    if (Object.keys(selectedArtworks).length !== 0)
                                        setShowWarningPopup(!showWarningPopup)
                                }}
                            >
                                Usuń zaznaczone
                            </button>
                        </div>

                        <span className="">
                            <CustomDropdown
                                options={sortOptions}
                                onSelect={(value) => setSortOrder(value)}
                            />
                        </span>
                    </div>
                    {showFileDropzone && <FileDropzone onClose={() => setShowFileDropzone(false)} />}
                    {allArtworks}
                </div>
            </section>
        </>
    }
}
export default Artworks