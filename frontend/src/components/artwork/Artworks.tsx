import { useQuery, useQueryClient } from "react-query"
import { getArtworksByCategory, useBatchDeleteArtworkMutation } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"
import React, { useMemo, useState } from "react"
import Navbar from "../navbar/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import SearchComponent from "../search/SearchComponent"
import FileDropzone from "../FileDropzone"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as FileImportIcon } from "../../assets/icons/fileImport.svg"
import { ReactComponent as FileExportIcon } from "../../assets/icons/fileExport.svg"
import CreateArtwork from "./CreateArtwork"
import WarningPopup from "../../pages/collections/WarningPopup"
import CustomDropdown from "../CustomDropdown"
import { getSingleCollection } from "../../api/collections"
import FilterDropdown from "../filter/FilterDropdown"
import Navigation from "../Navigation"
import EditCollection from "../../pages/collections/EditCollection"

const Artworks = () => {
    const [selectedArtworks, setSelectedArtworks] = useState<{ [key: string]: boolean }>({})
    const [showFileDropzone, setShowFileDropzone] = useState<boolean>(false)
    const [showCreateArtwork, setShowCreateArtwork] = useState<boolean>(false)
    const [showWarningPopup, setShowWarningPopup] = useState(false)
    const [sortOrder, setSortOrder] = useState<string>("default")
    const [showEditCollection, setShowEditCollection] = useState<boolean>(false)

    const { collection } = useParams()
    const queryClient = useQueryClient()
    const { mutate: batchDeleteMutation } = useBatchDeleteArtworkMutation()

    const sortOptions = [
        { value: "title-asc", label: "Tytuł rosnąco" },
        { value: "title-desc", label: "Tytuł malejąco" },
        { value: "year-asc", label: "Rok rosnąco" },
        { value: "year-desc", label: "Rok malejąco" },
    ]

    const { data: artworkData } = useQuery({
        queryKey: ["artwork"],
        queryFn: () => getArtworksByCategory(collection as string),
        enabled: !!collection,
    })

    const { data: collectionData } = useQuery({
        enabled: !!collection,
        queryFn: () => getSingleCollection(collection as string),
    })

    const selectAll = () => {
        const newSelection = artworkData.reduce((acc: any, artwork: any) => {
            acc[artwork._id] = true
            return acc
        }, {})
        setSelectedArtworks(newSelection)
    }

    const exportToExcel = () => {
        // const ws = XLSX.utils.json_to_sheet(artworkData)
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
        return sortArtworks([...(artworkData || [])], sortOrder)
    }, [artworkData, sortOrder])

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

    console.log({ collectionData })

    const navigate = useNavigate()

    if (artworkData === undefined) {
        return <LoadingPage />
    } else {
        const allArtworks = sortedArtworks.map((artwork: any) => (
            <div className="px-4 max-w-screen-xl py-4 bg-white dark:bg-gray-800 shadow-md w-full rounded-lg mb-4
                border border-gray-300 dark:border-gray-600 cursor-pointer"
                 key={artwork._id}
                 onClick={() => navigate(`/collections/${collection}/artworks/${artwork._id}`)}>

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
                        <p className=" text-gray-500 dark:text-gray-300">{artwork.Rok}</p>
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

            <div className="flex flex-col w-full items-center bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
                <div className="flex flex-col max-w-screen-xl w-full lg:px-6">
                    <Navigation />

                    <div className="flex flex-row mb-4 mt-2">
                        <div className="flex flex-col w-full">
                            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-1">
                                {collectionData?.name}
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                {collectionData?.description}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <button className="h-fit font-semibold" onClick={() => setShowEditCollection(true)}>
                                Edytuj
                            </button>
                        </div>

                        {showEditCollection && (
                            <EditCollection
                                onClose={() => setShowEditCollection(false)}
                                collectionData={collectionData}
                            />
                        )}
                    </div>

                    <SearchComponent />

                    <div className="flex w-full md:w-auto">
                        <div className="flex flex-1 space-x-2">
                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                    type="button"
                                    onClick={() => setShowCreateArtwork(showCreateArtwork => !showCreateArtwork)}>

                                    <span className="mr-2 text-white dark:text-gray-400">
                                        <PlusIcon />
                                    </span>
                                Nowy rekord
                            </button>
                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                    type="button"
                                    onClick={() => exportToExcel()}
                            >
                            <span className="text-white dark:text-gray-400">
                                <FileExportIcon />
                            </span>
                                Eksportuj plik
                            </button>
                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                    type="button"
                                    onClick={() => setShowFileDropzone(showFileDropzone => !showFileDropzone)}
                            >
                                <span className="text-white dark:text-gray-400">
                                    <FileImportIcon />
                                </span>
                                Importuj plik
                            </button>

                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                    type="button"
                                    onClick={selectAll}
                            >
                                Zaznacz wszystkie
                            </button>

                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
                                    type="button"
                                    onClick={deselectAll}
                            >
                                Odznacz wszystkie
                            </button>

                            <button className="flex items-center justify-center dark:text-white
                                        hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium px-4 py-2
                                        dark:focus:ring-primary-800 font-semibold text-white bg-gray-800 hover:bg-gray-700 border-gray-800"
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
                </div>
            </div>

            <div className="flex flex-row">
                <div
                    className="flex mx-auto flex-1 justify-end w-full">
                    <FilterDropdown />
                </div>
                <div className="w-full flex-2 lg:px-6 max-w-screen-xl">
                    {allArtworks}
                </div>
                <div className="mx-auto w-full flex-1">
                </div>
            </div>
        </>
    }
}
export default Artworks