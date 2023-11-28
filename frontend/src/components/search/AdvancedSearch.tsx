import React, { useState } from "react"
import { useFormik } from "formik"
import FilterButtons from "../filter/FilterButtons"
import { useQuery } from "react-query"
import { getCategories } from "../../api/categories"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import { ReactComponent as SearchLoopIcon } from "../../assets/icons/searchLoop.svg"
import LoadingPage from "../../pages/LoadingPage"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const initialRule = { id: Date.now(), field: "", operator: "", value: "" }

type Subcategory = {
    name: string
    values?: string[]
}

type Category = {
    category: string
    subcategories?: Subcategory[]
}

// type CollectionItem = {
//     _id: string
//     collection: string
//     categories: Category[]
// }
//
// type CollectionArray = CollectionItem[]
const AdvancedSearch = () => {
    const [rules, setRules] = useState<any[]>([])
    const [showValidationMessage, setShowValidationMessage] = useState<boolean>(false)

    const { data: categoriesData } = useQuery(
        ["allCategories"],
        getCategories,
    )

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: initialRule,
        onSubmit: (values, { resetForm }) => {
            if (values.field && values.operator && values.value) {
                setRules([...rules, { ...values, id: Date.now() }])
                resetForm()
                setShowValidationMessage(() => false)
            } else {
                setShowValidationMessage(() => true)
            }
        },
    })

    const deleteRule = (id: string) => {
        setRules(rules.filter((rule) => rule.id !== id))
    }

    const handleSearch = () => {
        navigate(`/artworks/search?${rules.map(rule => `${rule.field}=${rule.value}`).join("&")}`)
        setShowValidationMessage(() => false)
    }

    if (categoriesData === undefined) {
        return <LoadingPage />
    }
    return (
        <div className="my-2">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <select
                        name="field"
                        onChange={formik.handleChange}
                        value={formik.values.field}
                        className="border p-2"
                    >
                        <option hidden selected>Wybierz kategorię</option>
                        {categoriesData[0].categories.map((subcategory: Category) => (
                            <option value={subcategory.category} key={uuidv4()}>{subcategory.category}</option>
                        ))}
                    </select>
                    <select
                        name="operator"
                        onChange={formik.handleChange}
                        value={formik.values.operator}
                        className="border p-2"
                    >
                        <option value="equals">is equal to</option>
                        <option value="contains">contains</option>
                    </select>
                    <input
                        name="value"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.value}
                        className="border p-2 rounded-lg"
                    />

                    <button type="submit" className="flex items-center bg-teal-500 hover:bg-teal-400 text-white p-2
                            font-semibold">
                        <PlusIcon />
                        Add Rule
                    </button>
                    <button className="flex items-center font-semibold bg-sky-500 hover:bg-sky-400
                            text-white p-2"
                            onClick={handleSearch}
                    >
                        <SearchLoopIcon />
                        Search
                    </button>
                    {showValidationMessage && <span className="text-red-500 ml-2">
                        All fields are required to add a rule.
                    </span>}
                </div>
            </form>

            {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-2 mt-4">
                    <button onClick={() => deleteRule(rule.id)} className="border-none p-0 mr-2">
                        <CloseIcon />
                    </button>
                    <span className="border-2 border-sky-300 p-2 rounded-lg bg-sky-100 text-sky-500 font-semibold">
                        {rule.field}
                    </span>
                    <span className="border-2 border-sky-300 p-2 rounded-lg bg-sky-100 text-sky-500 font-semibold">
                        {rule.operator}
                    </span>
                    <span className="border-2 border-sky-300 p-2 rounded-lg bg-sky-100 text-sky-500 font-semibold">
                        {rule.value}
                    </span>
                </div>
            ))}

            <hr className="border-t border-gray-200 my-4 dark:border-gray-700" />
            <h2 className="mb-2">Filters</h2>
            <FilterButtons />
        </div>
    )
}

export default AdvancedSearch
