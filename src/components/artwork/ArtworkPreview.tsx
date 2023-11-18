import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { getArtwork } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"
import Navbar from "../Navbar"
import CustomTextField from "../CustomTextField"
import React, { useEffect, useState } from "react"

const ArtworkPreview = () => {
    const [textFields, setTextFields] = useState<any>([])
    const { artworkId } = useParams<string>()

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId as string),
        enabled: !!artworkId,
    })

    const handleTextFieldChange = (id: number, event: string) => {
        const updatedTextFields = textFields.map((input: any) => {
            if (input.id === id) {
                return { ...input, value: event }
            }
            return input
        })
        setTextFields(updatedTextFields)
    }

    useEffect(() => {
        if (fetchedData) {
            const initialFields = fetchedData.columnNames.map((columnName: string, index: number) => ({
                id: index,
                value: fetchedData.artwork[columnName] || "",
                columnName: columnName
            }))
            setTextFields(initialFields)
        }
    }, [fetchedData])

    if (textFields.length === 0 || fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const artwork = textFields.map((textField: any, index: number) => {
            return <div className="px-4 py-3" key={index}>
                <CustomTextField
                    columnName={textField.columnName}
                    value={textField.value}
                    onInputChange={(event) => handleTextFieldChange(index, event)} />
            </div>
        })
        return <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="shadow-sm border dark:border-gray-700 border-gray-200 rounded-lg">
                        {fetchedData._id}
                        <div className="flex flex-col">
                            {artwork}
                        </div>

                        <div className="flex justify-end mx-4 my-3">
                            <button className="block dark:text-red-500 text-red-500 border-red-500 dark:border-red-900">
                                Usuń
                            </button>
                            <button className="block">
                                Zapisz
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}
export default ArtworkPreview