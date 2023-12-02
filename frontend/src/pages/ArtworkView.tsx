import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getArtwork } from "../api/artworks"
import LoadingPage from "./LoadingPage"
import React, { useState } from "react"
import Navbar from "../components/navbar/Navbar"
import { v4 as uuidv4 } from "uuid"

const ArtworkView = () => {
    const { artworkId } = useParams<string>()
    const [showMore, setShowMore] = useState(false)

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId as string),
        enabled: !!artworkId,
    })

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const { Title, Artist, Year, ...otherDetails } = fetchedData.artwork
        const detailsToShow = showMore ? otherDetails : {}

        return <>
            <Navbar />
            <section className="p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{Title}</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Artyści: {Artist}</p>
                        <p className="text-lg text-gray-500 dark:text-gray-300 mt-1">Rok: {Year}</p>
                        {Object.entries(detailsToShow).map(([columName, value]: any) => (
                            <div key={uuidv4()} className="py-2 font-medium">
                                <span className="mr-2">{columName}:</span>
                                {value}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="mt-4 px-4 py-2 bg-sky-500 text-white hover:bg-sky-400"
                    >
                        {showMore ? "Pokaż mniej" : "Pokaż więcej"}
                    </button>
                </div>
            </section>
        </>
    }
}
export default ArtworkView