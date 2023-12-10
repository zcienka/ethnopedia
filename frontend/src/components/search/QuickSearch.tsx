import React, { useState } from "react"
import { useFormik, Formik, Form } from "formik"
import { ReactComponent as SearchLoopIcon } from "../../assets/icons/searchLoop.svg"
import { useActionData, useNavigate } from "react-router-dom"
import { getQuickSearchResult, getAdvancedSearchResult } from "../../api/artworks"


const QuickSearch = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);
    const [showValidationMessage, setShowValidationMessage] = useState<boolean>(false)
    
    const searchParams = new URLSearchParams(document.location.search)   
    const categoryText = searchParams.get("Kategoria")

    const formik = useFormik({
        initialValues: {
            searchText: "",
        },
        onSubmit: (values, actions) => {
            setSearchText(values.searchText) 
            if(typeof categoryText === "string") {
                handleSearch(categoryText, values.searchText)
            }
            actions.setSubmitting(false)
        },
    })

    
    const navigate = useNavigate()

    const handleSearch = (cn: string, v: string) => {
        navigate(`/artworks/search?Kategoria=${cn}&searchText=${v}`)
        getAdvancedSearchResult(`Kategoria=${cn}&searchText=${v}`)
        setShowValidationMessage(() => false)
    }

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

