import { ReactComponent as Close } from "../../assets/icons/close.svg"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useQueryClient } from "react-query"
import { updateCollection } from "../../api/collections"
import { useUser } from "../../providers/UserProvider"

type Props = {
    onClose: () => void,
    collectionData: any
}

const EditCollection = ({ onClose, collectionData }: Props) => {
    const queryClient = useQueryClient()
    const { jwtToken } = useUser()


    return <div
        id="default-modal"
        aria-hidden="true"
        className="fixed inset-0 top-0 left-0 flex items-center justify-center w-full h-full z-100"
        onClick={(e) => e.stopPropagation()}
    >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="relative w-full max-w-2xl max-h-full">
                <Formik
                    initialValues={collectionData}
                    onSubmit={(values, { setSubmitting }) => {
                        const { name, description } = values

                        updateCollection({
                            id: collectionData._id,
                            collectionData: { name, description },
                            jwtToken: jwtToken,
                        }).then(() => {
                            queryClient.invalidateQueries(["collection"])
                            queryClient.invalidateQueries([`${collectionData._id}`])
                            onClose()
                        }).catch((error: any) => {
                            console.error(error)
                            setSubmitting(false)
                        })
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="relative bg-white rounded-lg shadow-md dark:bg-gray-800 border dark:border-gray-600">
                            <div className="flex items-start justify-between p-4 pb-0 rounded-t">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Edytuj kolekcję
                                </h3>

                                <button
                                    type="button"
                                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 text-sm dark:hover:bg-gray-600 dark:hover:text-white p-2 rounded-lg"
                                    onClick={onClose}
                                >
                                    <Close />
                                </button>
                            </div>
                            <div className="px-4 pb-4">
                                <label htmlFor="name"
                                       className="text-sm font-bold text-gray-700 dark:text-white dark:border-gray-600 block my-2">
                                    Nazwa
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                                <label htmlFor="description"
                                       className="text-sm font-bold text-gray-700 dark:text-white dark:border-gray-600 block my-2">
                                    Opis
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="w-full resize-y min-h-[12rem] px-4 py-2 border rounded-lg focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                                />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex justify-end px-4 pb-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 font-semibold"
                                    onClick={onClose}
                                >
                                    Anuluj
                                </button>
                                <button
                                    type="submit"
                                    className="ml-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 font-semibold"
                                    disabled={isSubmitting}
                                >
                                    Zapisz
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
}

export default EditCollection
