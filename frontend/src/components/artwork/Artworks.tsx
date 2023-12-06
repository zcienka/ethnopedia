import { useQuery } from "react-query"
import { getAdvancedSearchResult } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"
import React, { useMemo } from "react"
import Navbar from "../navbar/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import SearchComponent from "../search/SearchComponent"

const Artworks = () => {
    const location = useLocation()

    const searchParamsString = useMemo(() => {
        const params = new URLSearchParams(location.search)
        return params.toString()
    }, [location.search])

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", searchParamsString],
        queryFn: () => getAdvancedSearchResult(searchParamsString),
        enabled: !!searchParamsString,
    })

    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allArtworks = fetchedData.map((artwork: any) => (
            <div className="px-4 py-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border dark:border-gray-700
            cursor-pointer"
                 key={artwork._id}
                 onClick={() => navigate(`/artwork/${artwork._id}`)}>

                <div className="flex flex-row">
                    <span className="mr-4 flex items-center" >
                        <input type="checkbox" name="exampleCheckbox" onClick={(e) => e.stopPropagation()}/>
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