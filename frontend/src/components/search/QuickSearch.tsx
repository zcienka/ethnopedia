import React from "react"
import { useFormik } from "formik"
import { ReactComponent as SearchLoopIcon } from "../../assets/icons/searchLoop.svg"

const QuickSearch = () => {
    const formik = useFormik({
        initialValues: {
            searchText: "",
        },
        onSubmit: values => {
            console.log(values.searchText)
        },
    })

    return <>
        <div className="my-2">
            <form onSubmit={formik.handleSubmit} className="flex space-x-2">
                <input
                    type="text"
                    name="searchText"
                    onChange={formik.handleChange}
                    value={formik.values.searchText}
                    className="border border-gray-300 p-2 rounded-lg"
                />
                <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white p-2 flex items-center">
                    <span className="mr-1">
                        <SearchLoopIcon />
                    </span>

                    Wyszukaj
                </button>

            </form>
        </div>
        <hr className="border-t border-gray-200 my-4 dark:border-gray-600" />
    </>
}

export default QuickSearch

