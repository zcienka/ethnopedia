import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getCategory } from "../api/sections"
import LoadingPage from "./LoadingPage"
import Navbar from "../components/navbar/Navbar"
import React from "react"
import { v4 as uuidv4 } from "uuid"

const Categories = () => {
    const { collectionName } = useParams<string>()

    const { data: fetchedData } = useQuery({
        queryKey: ["category", collectionName],
        queryFn: () => getCategory(collectionName as string),
        enabled: !!collectionName,
    })

    const navigate = useNavigate()

    if (fetchedData === undefined) {
        return <LoadingPage />
    }

    const categoryElements = fetchedData.map((category: any, index: number) => (
        <div key={index}>
            <h2 className="mb-2 text-xl font-bold">{category.collectionName}</h2>
            {category.sections.map((section: any) => (
                <div className="px-4 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 border dark:border-gray-600
                                cursor-pointer"
                     key={uuidv4()}
                     onClick={() => navigate(`/artworks/search?Kategoria=${category.collectionName}`)}>
                    <div className="flex flex-row">
                        <input type="checkbox" id="exampleCheckbox" name="exampleCheckbox" />
                        <h2 className="text-lg font-semibold ml-4">{section}</h2>
                    </div>
                </div>
            ))}
        </div>
    ))

    return <>
        <Navbar />
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/*<SearchComponent />*/}
                {categoryElements}
            </div>
        </section>
    </>
}

export default Categories