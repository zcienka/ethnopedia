import { useQuery, useQueryClient } from "react-query"
import { getCollections, useBatchDeleteCollectionMutation } from "../../api/collections"
import LoadingPage from "../LoadingPage"
import { Collection } from "../../@types/Collection"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import CreateCollection from "../../components/CreateCollection"
import { jwtDecode } from "jwt-decode"
import { ReactComponent as FileImportIcon } from "../../assets/icons/fileImport.svg"
import { ReactComponent as FileExportIcon } from "../../assets/icons/fileExport.svg"
import WarningPopup from "./WarningPopup"

type JwtPayload = {
    username: string
    firstName: string
    iat: number
    exp: number
}

const CollectionsPage = () => {
    const [, setToken] = useState<string | null>(null)
    const [firstName, setFirstName] = useState<string | null>(null)
    const [, setShowFileDropzone] = useState<boolean>(false)
    const [checkedCollections, setCheckedCollections] = useState<{ [key: string]: boolean }>({})
    const [showWarningPopup, setShowWarningPopup] = useState(false)

    const queryClient = useQueryClient()

    const {mutate: batchDeleteMutation} = useBatchDeleteCollectionMutation()

    useEffect(() => {
        const storedToken = localStorage.getItem("token") as string

        if (storedToken) {
            setToken(storedToken)

            const decoded = jwtDecode<JwtPayload>(storedToken)
            setFirstName(decoded.firstName)
        }
    }, [])

    const exportToExcel = () => {
        // const ws = XLSX.utils.json_to_sheet(fetchedData)
        // const wb = XLSX.utils.book_new()
        // XLSX.utils.book_append_sheet(wb, ws, "DataSheet")
        // XLSX.writeFile(wb, "DataExport.xlsx")
    }

    const { data: fetchedData } = useQuery<Collection[], Error>(
        ["collection"],
        getCollections,
    )

    const checkAll = () => {
        const newCheckedCollections = fetchedData?.reduce(
            (acc, collection) => ({
                ...acc,
                [collection.id!]: true,
            }),
            {},
        ) as Record<string, boolean>

        setCheckedCollections(newCheckedCollections)
    }

    const uncheckAll = () => {
        setCheckedCollections({})
    }

    const handleCheck = (id: string) => {
        setCheckedCollections((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const deleteSelected = () => {
        const selectedIds = Object.keys(checkedCollections).filter(id => checkedCollections[id])

        if (selectedIds.length > 0) {
            batchDeleteMutation(selectedIds,
                {onSuccess: () => {
                queryClient.invalidateQueries(["collection"])
                setShowWarningPopup(!showWarningPopup)
            }})
        }
    }

    const [showPopup, setShowNewCollectionPopup] = useState(false)
    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allCollections = fetchedData.map((collection: Collection) => (
            <div
                className="px-4 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border dark:border-gray-700 cursor-pointer"
                key={collection.id}
                onClick={() => navigate(`/artworks/search?Kategoria=${collection.name}`)}
            >

                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <span className="mr-4 items-center flex">
                            <input
                                type="checkbox"
                                checked={checkedCollections[collection.id!] || false}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    handleCheck(collection.id!)
                                }} />
                        </span>

                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold">{collection.name}</h2>
                            <p className="text-gray-600 dark:text-gray-300">{collection.description}</p>
                        </div>
                    </div>
                    <h2 className="text-md min-w-fit items-center flex mx-2">
                        <span className="font-bold mr-1">
                            {collection.artworksCount ?? 0}
                        </span>
                        {
                            (collection.artworksCount ?? 0) === 1 ? "rekord" :
                                (collection.artworksCount ?? 0) > 1 && (collection.artworksCount ?? 0) < 5 ? "rekordy" : "rekordów"
                        }
                    </h2>
                </div>
            </div>
        ))

        return <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
            {showPopup && <CreateCollection onClose={() => setShowNewCollectionPopup(!showPopup)} />}
            {showWarningPopup && <WarningPopup onClose={() => setShowWarningPopup(!showWarningPopup)}
                                               deleteSelected={deleteSelected}/>}
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="flex flex-row">
                    <div className="w-full">
                        <h1 className="font-semibold text-4xl mb-4">
                            Witaj {firstName}!
                        </h1>
                        <h2 className="mb-2 text-lg">
                            Twoje kolekcje:
                        </h2>
                    </div>

                    <div className="flex items-center justify-end w-full">
                        <button
                            type="button"
                            className="flex items-center justify-center dark:text-white
                                    hover:bg-primary-800 focus:ring-4 focus:ring-primary-300
                                    text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
                                    dark:focus:ring-primary-800 mb-2 hover:bg-zinc-800 bg-zinc-700 text-white"
                            onClick={() => setShowNewCollectionPopup(!showPopup)}>
                            <span className="mr-2">
                                <PlusIcon />
                            </span>
                            Nowa kolekcja
                        </button>

                        <button
                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900  dark:bg-gray-800 dark:text-gray-50
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mb-2 ml-2 hover:bg-zinc-600 bg-zinc-700 text-white"
                            type="button"
                            onClick={() => exportToExcel()}
                        >
                            <span className="text-white">
                                <FileExportIcon />
                            </span>

                            Eksportuj plik
                        </button>
                        <button
                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm
                                        font-medium text-gray-900  dark:bg-gray-800 dark:text-gray-50
                                        dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mb-2 ml-2 hover:bg-zinc-800 bg-zinc-700 text-white"
                            type="button"
                            onClick={() => setShowFileDropzone(showFileDropzone => !showFileDropzone)}
                        >
                            <FileImportIcon />
                            Importuj plik
                        </button>
                    </div>
                </div>

                <div className="flex flex-row">
                    <button type="button" className="px-4 py-2 mb-2 bg-white"
                            onClick={checkAll}>
                        Zaznacz wszystkie
                    </button>

                    <button type="button" className="px-4 py-2 mb-2 ml-2 bg-white"
                            onClick={uncheckAll}>
                        Odznacz wszystkie
                    </button>

                    <button type="button" className="px-4 py-2 mb-2 ml-2 bg-white"
                            onClick={() => {
                                if (Object.keys(checkedCollections).length !== 0)
                                    setShowWarningPopup(!showWarningPopup)}}>
                        Usuń zaznaczone
                    </button>
                </div>

                {allCollections}
            </div>
        </section>
    }
}
export default CollectionsPage