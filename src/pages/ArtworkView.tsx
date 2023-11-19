import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getArtwork } from "../api/artworks"
import LoadingPage from "./LoadingPage"
import React from "react"
import Navbar from "../components/Navbar"
import CustomTextField from "../components/CustomTextField"

const ArtworkView = () => {
    const { artworkId } = useParams<string>()

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId as string),
        enabled: !!artworkId,
    })
console.log({fetchedData})
    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const artwork = fetchedData.columnNames.map((column: any, index: number) => {
            return <div className="px-4 py-3" key={index}>
                {fetchedData.artwork[column]}
            </div>
        })

        return <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <Navbar />
                {artwork}
            </div>
        </section>
    }
}
export default ArtworkView