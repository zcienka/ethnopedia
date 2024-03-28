import React, { useState } from "react"
import { useQueryClient } from "react-query"
import { Form, Formik } from "formik"
import { useCreateRecordMutation } from "../../api/collections"
import NewArtworkStructure from "./NewArtworkStructure"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import { useUser } from "../../providers/UserProvider"
import { SelectedDetail } from "./types/ArtworkTypes"
import Navigation from "../Navigation"
import FetchDataWrapper from "../TreeWrapper"

const CreateArtwork: React.FC = () => {
    const queryClient = useQueryClient()
    const { jwtToken } = useUser()
    const navigate = useNavigate()
    const { mutate: createCollection } = useCreateRecordMutation(jwtToken)
    const defaultSelectedDetails: { [key: string]: SelectedDetail } = {
        [`${Date.now()}`]: {
            collectionName: "",
            subcategories: [],
            values: [],
            label: "",
            name: "",
            date: "",
            value: "",
        } as SelectedDetail,
    }
    const [selectedDetails, setSelectedDetails] = useState<{ [key: string]: SelectedDetail }>(defaultSelectedDetails)

    return (
        <FetchDataWrapper>
            {({ id, categoriesData, isSuccess }) => (
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <div className="flex flex-1 justify-center mt-2">
                        <div className="flex flex-1 flex-col max-w-screen-xl">
                            <span className="mt-2">
                                <Navigation />
                            </span>
                            <div className="flex flex-1 justify-center h-fill max-w-screen-xl w-full mt-2">
                                <Formik
                                    initialValues={{ defaultSelectedDetails }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        const detailsToSubmit: SelectedDetail[] = Object.values(selectedDetails).map(detail => ({
                                            collectionName: detail.collectionName,
                                            subcategories: detail.subcategories,
                                            values: detail.values,
                                            label: detail.label,
                                            date: detail.date || new Date().toISOString(),
                                            value: detail.value,
                                        }))
                                        createCollection(detailsToSubmit, {
                                            onSuccess: () => {
                                                queryClient.invalidateQueries(["collection"])
                                                navigate(-1)
                                            },
                                            onError: (error) => {
                                                console.error(error)
                                                setSubmitting(false)
                                            },
                                        })
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form
                                            className="flex flex-col bg-white rounded-lg w-full dark:bg-gray-800 border shadow dark:border-gray-600">
                                            <div className="flex items-start p-4 rounded-t border-b pb-2">
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {id ? "Dodaj nowy rekord" : "Dodaj nową kolekcję"}
                                                </h3>
                                            </div>
                                            <div className="flex-grow">
                                                <NewArtworkStructure
                                                    selectedDetails={selectedDetails}
                                                    setSelectedDetails={setSelectedDetails}
                                                    categoriesData={categoriesData } />
                                            </div>
                                            <div className="flex justify-end px-4 pb-4 border-t pt-4 h-auto">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 dark:text-white text-gray-600 font-semibold">
                                                    Anuluj
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="ml-2 color-button"
                                                    disabled={isSubmitting}
                                                >
                                                    Utwórz
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </FetchDataWrapper>
    )
}

export default CreateArtwork