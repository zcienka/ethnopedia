import CustomTextField from "../../components/CustomTextField"
import LoadingPage from "../LoadingPage"
import Navbar from "../../components/navbar/Navbar"
import Navigation from "../../components/Navigation"
import React, { useEffect, useState } from "react"
import WarningPopup from "../collections/WarningPopup"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import { ReactComponent as TrashBinIcon } from "../../assets/icons/trashBin.svg"
import { deleteArtwork, getArtwork, updateArtwork } from "../../api/artworks"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../../providers/UserProvider"
import { v4 as uuidv4 } from "uuid"

const ArtworkPage = () => {
    const { artworkId } = useParams<string>()
    const [showMore, setShowMore] = useState(false)
    const [showDeleteArtworkWarning, setShowDeleteArtworkWarning] = useState(false)
    const { jwtToken } = useUser()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [textFields, setTextFields] = useState<any>([])
    const [showEditArtwork, setShowEditArtwork] = useState<boolean>(false)

    const { data: fetchedData } = useQuery({
        queryKey: ["artwork", artworkId],
        queryFn: () => getArtwork(artworkId as string),
        enabled: !!artworkId,
    })

    const deleleArtwork = useMutation(() => deleteArtwork(artworkId as string, jwtToken as string), {
        onSuccess: () => {
            queryClient.invalidateQueries("artwork")
            navigate(-1)
        },
    })

    useEffect(() => {
        if (fetchedData !== undefined) {
            setTextFields(fetchedData.artwork)
        }
    }, [fetchedData])

    const handleArtworkDeletion = () => {
        if (!jwtToken || !artworkId) {
            return
        }

        deleleArtwork.mutate()
    }

    const handleTextFieldChange = (fieldName: string, event: string) => {
        setTextFields({
            ...textFields,
            [fieldName]: event,
        })
    }


    const updateArtworkMutation = useMutation(
        (artworkData: { id: string, artwork: any, jwtToken: string }) => updateArtwork(artworkData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("artwork")
                setShowEditArtwork(false)
            },
            onError: (error) => {
            },
        },
    )

    const handleEditClick = () => {
        if (showEditArtwork) {
            updateArtworkMutation.mutate({ id: artworkId as string, artwork: textFields, jwtToken})
        } else {
            setShowEditArtwork(true)
            setShowMore(true)
        }
    }
      
    function Subcategories(categories: any) {
        let entries: any = []
        for (const property in categories) {
            entries.push(<li><span className="mr-2">{property}:</span> {categories[property]["value"]}</li>)
            if(categories[property]["subcategories"]) {
                entries = [...entries, Subcategories(categories[property]["subcategories"])]
            }
        }
        return <>{
            <ul className="list-disc list-inside pl-4">
                {entries}
            </ul>
        }</>
    }

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        const { Tytuł, Artyści, Rok, ...otherDetails } = fetchedData.artwork
        const detailsToShow = showMore ? otherDetails : {}

        const artworksEdit = Object.entries(textFields).map(([columnName, value]: [string, any], index: number) => {
            return columnName !== "_id" && <div className="py-2" key={`${columnName}-${index}`}>
                <CustomTextField
                    columnName={columnName}
                    value={textFields[columnName]}
                    onInputChange={(event) => handleTextFieldChange(columnName, event)}
                />
            </div>
        })
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
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{Tytuł.value}</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">Artyści: {Artyści.value}</p>
                            <p className="text-lg text-gray-500 dark:text-gray-300 mt-1">Rok: {Rok.value}</p>
                            <ul className="list-disc list-inside pl-4">
                            {showEditArtwork ? artworksEdit : Object.entries(detailsToShow).map(([columName, value]: any) => (
                                columName !== "_id" && <span key={uuidv4()} className="font-medium">
                                    <li><span className="mr-2">{columName}:</span>
                                    {value.value}</li>
                                    <Subcategories {...value.subcategories}/>
                                </span>
                            ))}
                            </ul>
                        </div>
                        <div className="flex-1 mt-4 flex justify-end text-gray-700">
                            {showEditArtwork ?
                                <button
                                    className="flex mr-4 h-fit px-8 text-lg block bg-blue-500 hover:bg-blue-400
                                    font-semibold text-white border-none"
                                    onClick={handleEditClick}>
                                    Zapisz
                                </button> :
                                <button className="text-lg font-semibold h-fit mr-4"
                                        onClick={handleEditClick}>
                                <span className="flex-row flex items-center">
                                <EditIcon />
                                    <p className="ml-2">Edytuj</p>
                                </span>
                                </button>
                            }
                            <button
                                className="text-lg font-semibold h-fit border-red-700 text-red-700 bg-red-50 hover:bg-white">
                                <span className="flex-row flex items-center"
                                    onClick={() => setShowDeleteArtworkWarning(true)}>
                                <TrashBinIcon />
                                    <p className="ml-2">Usuń</p>
                                </span>
                            </button>
                        </div>
                    </div>


                    {!showEditArtwork &&
                        <button
                            type="button"
                            onClick={() => setShowMore(!showMore)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 font-semibold border-none"
                        >
                            {showMore ? "Pokaż mniej" : "Pokaż więcej"}
                        </button>
                    }
                </div>
            </section>
        </>
    }
}
export default ArtworkPage