import React, { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { getCategories } from "../../api/categories"
import { Form, Formik } from "formik"
import { useCreateRecordMutation } from "../../api/collections"
import LoadingPage from "../../pages/LoadingPage"
import NewArtworkStructure from "./NewArtworkStructure"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import { useUser } from "../../providers/UserProvider"

type Subcategory = {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable?: boolean
}

interface SelectedDetail {
    category: any;
    subcategories: Subcategory[];
    collection: string
    values?: string[]
    date: string
}

const CreateArtwork = () => {
    const queryClient = useQueryClient()
    const { jwtToken } = useUser()
    const { mutate: createCollection } = useCreateRecordMutation(jwtToken)
    const navigate = useNavigate()

    const defaultSelectedDetails: { [key: string]: SelectedDetail } = {
        [`${Date.now()}`]: {
            category: "",
            values: [],
            subcategories: [],
            collection: "",
            date: ""
        },
    }
    const [selectedDetails, setSelectedDetails] = useState<{ [key: string]: SelectedDetail }>(defaultSelectedDetails)

    const { collection: id } = useParams()

    const { data: categoriesData } = useQuery(
        ["allCategories"],
        () => getCategories(id as string),
        {
            enabled: !!id,
        },
    )

    if (categoriesData === undefined) {
        return <LoadingPage />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 justify-center h-fill">
                <Formik
                    initialValues={{ defaultSelectedDetails }}
                    onSubmit={(values, { setSubmitting }) => {

                        const detailsToSubmit = Object.values(selectedDetails).map(detail => ({
                            category: detail.category,
                            subcategories: detail.subcategories,
                            values: detail.values,
                            collection: detail.collection,
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
                    }}>
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col bg-white rounded-lg max-w-screen-xl w-full dark:bg-gray-800 border dark:border-gray-600 ">
                            <div className="flex items-start p-4 pb-0 rounded-t border-b pb-2">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Dodaj nowy rekord
                                </h3>
                            </div>
                            {/*<div className="px-4 pb-4">*/}
                            {/*<label htmlFor="name"*/}
                            {/*       className="text-sm font-bold text-gray-700 dark:text-white dark:border-gray-700 block my-2">*/}
                            {/*    Nazwa*/}
                            {/*</label>*/}
                            {/*<Field*/}
                            {/*    id="name"*/}
                            {/*    name="name"*/}
                            {/*    type="text"*/}
                            {/*    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"*/}
                            {/*/>*/}
                            {/*<ErrorMessage name="name" component="div" className="text-red-500 text-sm" />*/}

                            {/*<label htmlFor="description"*/}
                            {/*       className="text-sm font-bold text-gray-700 dark:text-white dark:border-gray-700 block my-2">*/}
                            {/*    Opis*/}
                            {/*</label>*/}
                            {/*<Field*/}
                            {/*    as="textarea"*/}
                            {/*    id="description"*/}
                            {/*    name="description"*/}
                            {/*    rows={4}*/}
                            {/*    className="w-full resize-y min-h-[12rem] px-4 py-2 border rounded-lg focus:outline-none dark:border-gray-700 dark:bg-gray-800"*/}
                            {/*/>*/}
                            {/*<ErrorMessage name="description" component="div" className="text-red-500 text-sm" />*/}
                            {/*</div>*/}


                            <div className="flex-grow">
                                <NewArtworkStructure selectedDetails={selectedDetails}
                                                     setSelectedDetails={setSelectedDetails} />
                            </div>

                            <div className="flex justify-end px-4 pb-4 border-t pt-4 h-auto">
                                <button
                                    type="button"
                                    className="px-4 py-2 dark:text-white text-gray-600 font-semibold"
                                >
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
        </div>)
}
export default CreateArtwork