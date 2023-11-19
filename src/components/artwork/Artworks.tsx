import { useQuery } from "react-query"
import { getArtworks } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"
import React from "react"
import Navbar from "../Navbar"
import { useNavigate } from "react-router-dom"
import SearchComponent from "../search/SearchComponent"

const Artworks = () => {
    const { data: fetchedData } = useQuery(
        ["artwork"],
        getArtworks,
    )

    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allArtworks = fetchedData.artworks.map((artwork: any) => (
            <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border dark:border-gray-700
            cursor-pointer"
                 key={artwork._id}
                 onClick={() => navigate(`/artwork/${artwork._id}`)}>

                <div className="flex flex-row">
                    <input className="mr-4" type="checkbox" id="exampleCheckbox" name="exampleCheckbox" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{artwork.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{artwork.artist}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{artwork.year}</p>
                    </div>
                </div>
            </div>
        ))

        return <>
            <Navbar />

            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <SearchComponent />
                    {allArtworks}
                </div>
            </section>
        </>
    }
}
export default Artworks