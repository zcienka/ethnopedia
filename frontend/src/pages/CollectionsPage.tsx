import { useQuery } from "react-query"
import { getCollections } from "../api/collections"
import LoadingPage from "./LoadingPage"
import { Collection } from "../@types/Collection"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import CreateCollection from "../components/CreateCollection"

const CollectionsPage = () => {
    const { data: fetchedData } = useQuery(
        ["collection"],
        getCollections,
    )

    const [showPopup, setShowNewCollectionPopup] = useState(false)
    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const allCollections = fetchedData.map((collection: Collection) => (
            <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border dark:border-gray-700
            cursor-pointer"
                 key={collection._id}
                 onClick={() => navigate(`/artworks/search?Kategoria=${collection.name}`)}>

                <div className="flex flex-row">
                    <input className="mr-4" type="checkbox" id="exampleCheckbox" name="exampleCheckbox" />
                    <div>
                        <h2 className="text-lg font-semibold">{collection.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{collection.description}</p>
                    </div>
                </div>
            </div>
        ))

        return <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
            {showPopup && <CreateCollection onClose={() => setShowNewCollectionPopup(!showPopup)} />}
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <button
                    type="button"
                    className="flex items-center justify-center dark:text-white bg-white
                                    hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg
                                    text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none
                                    dark:focus:ring-primary-800 mb-2"
                    onClick={() => setShowNewCollectionPopup(!showPopup)}>
                    <span className="mr-2">
                        <PlusIcon />
                    </span>
                    Dodaj nową kolekcję
                </button>
                {allCollections}
            </div>
        </section>
    }
}
export default CollectionsPage