import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteArtwork, getArtwork } from "../api/artworks"
import LoadingPage from "./LoadingPage"
import React, { useState } from "react"
import Navbar from "../components/navbar/Navbar"
import { v4 as uuidv4 } from "uuid"
import Navigation from "../components/Navigation"
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg"
import { ReactComponent as TrashBinIcon } from "../assets/icons/trashBin.svg"
import WarningPopup from "./collections/WarningPopup"
import { useUser } from "../providers/UserProvider"

const ArtworkView = () => {
    const { artworkId } = useParams<string>()
    const [showMore, setShowMore] = useState(false)
    const [showDeleteArtworkWarning, setShowDeleteArtworkWarning] = useState(false)
    const { jwtToken } = useUser()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId as string),
        enabled: !!artworkId,
    })

    const mutation = useMutation(() => deleteArtwork(artworkId as string, jwtToken as string), {
        onSuccess: () => {
            queryClient.invalidateQueries("artwork")
            navigate(-1)
        },
    })

    const handleArtworkDeletion = () => {
        if (!jwtToken || !artworkId) {
            return
        }

        mutation.mutate()
    }

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const { Tytuł, Artyści, Rok, ...otherDetails } = fetchedData.artwork
        const detailsToShow = showMore ? otherDetails : {}

        return <>
            <Navbar />
            {showDeleteArtworkWarning &&
                <WarningPopup onClose={() => setShowDeleteArtworkWarning(!showDeleteArtworkWarning)}
                              deleteSelected={handleArtworkDeletion}
                              warningMessage={"Czy na pewno chcesz usunąć rekord?"} />}
            <section className="p-2 sm:p-4">
                <div className="mx-auto max-w-screen-xl lg:px-6">
                    <Navigation />

                    <div className="flex flex-row">
                        <div className="mt-2 flex-1">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{Tytuł}</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">Artyści: {Artyści}</p>
                            <p className="text-lg text-gray-500 dark:text-gray-300 mt-1">Rok: {Rok}</p>
                            {Object.entries(detailsToShow).map(([columName, value]: any) => (
                                columName !== "_id" && <div key={uuidv4()} className="py-2 font-medium">
                                    <span className="mr-2">{columName}:</span>
                                    {value}
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 mt-4 flex justify-end text-gray-700">
                            <button className="text-lg font-semibold h-fit mr-4">
                                <span className="flex-row flex items-center">
                                <EditIcon />
                                    <p className="ml-2">Edytuj</p>
                                </span>
                            </button>
                            <button
                                className="text-lg font-semibold h-fit border-red-700 text-red-700 bg-red-50 hover:bg-white">
                                <span className="flex-row flex items-center" onClick={() => setShowDeleteArtworkWarning(true)}>
                                <TrashBinIcon />
                                    <p className="ml-2">Usuń</p>
                                </span>
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 font-semibold border-none"
                    >
                        {showMore ? "Pokaż mniej" : "Pokaż więcej"}
                    </button>
                </div>
            </section>
        </>
    }
}
export default ArtworkView