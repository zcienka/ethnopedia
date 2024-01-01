import React, { useState } from "react"
import { useFormik } from "formik"
import { useQuery } from "react-query"
import { getCategories2 } from "../../api/categories"
// import { getAdvSearchResult } from "../../api/artworks"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import { ReactComponent as SearchLoopIcon } from "../../assets/icons/searchLoop.svg"
import LoadingPage from "../../pages/LoadingPage"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

const initialRule = { id: Date.now(), field: "", operator: "", value: "" }

// type Subcategory = {
//     name: string
//     values?: string[]
// }

// type Category = {
//     category: string
//     subcategories?: Subcategory[]
// }

// type CollectionItem = {
//     _id: string
//     collection: string
//     categories: Category[]
// }
//
// type CollectionArray = CollectionItem[]
const AdvancedSearch = () => {
    const [rules, setRules] = useState<any[]>([])

    const { data: categoriesData } = useQuery(
        ["allCategories"],
        () => getCategories2(window.location.href.split('/')[window.location.href.split('/').findIndex((element) => element === 'collections')+1]),
    )

    const navigate = useNavigate()

    const categoryInRules = (rules: any) => {
        for(const rule in rules) {
            if(rules[rule].field === formik.values.field) {
                return true
            }
        }
        return false
    }

    const formik = useFormik({
        initialValues: initialRule,
        onSubmit: (values, { resetForm }) => {
            handleAddRule()
            let newest_rule = ""
            if(values.field && values.value && !categoryInRules(rules)) {
                newest_rule = `&${formik.values.field}=${formik.values.value}`
            }
            
            navigate(`?${rules.map(rule => `${rule.field}=${rule.value}`).join("&")}${newest_rule}`)     
        },
    })

    const handleAddRule = () => {
        if(formik.values.field && formik.values.value && !categoryInRules(rules)) {
            setRules([...rules, { ...formik.values, id: Date.now() }])
        }
    }

    const deleteRule = (id: string) => {
        setRules(rules.filter((rule) => rule.id !== id))
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
                        {categoriesData.map((category: any) => (
                            <option value={category} key={uuidv4()}>{category}</option>
                        ))}
                    </select>
                    <input
                        name="value"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.value}
                        className="border p-2 rounded-lg"
                    />

                    <button type="button" className="border-gray-800 flex items-center bg-gray-800 hover:bg-gray-700 text-white p-2
                            font-semibold" onClick={handleAddRule}
                        >
                        <span className="mr-1">
                            <PlusIcon />
                        </span>
                        Dodaj regułę
                    </button>
                    <button type="submit" className="flex items-center font-semibold border-blue-500 bg-blue-500 hover:bg-blue-400
                            text-white p-2"
                    >
                        <span className="mr-1">
                            <SearchLoopIcon />
                        </span>
                        Wyszukaj
                    </button>
                </div>
            </form>

            {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-2 mt-4">
                    <button onClick={() => deleteRule(rule.id)} className="border-none p-0 mr-2">
                        <CloseIcon />
                    </button>
                    <span className="border border-blue-300 p-2 rounded-lg bg-blue-100 text-blue-500 font-semibold">
                        {rule.field}
                    </span>
                    <span className="border border-blue-300 p-2 rounded-lg bg-blue-100 text-blue-500 font-semibold">
                        {rule.value}
                    </span>
                </div>
            ))}

            <hr className="border-t border-gray-200 my-4 dark:border-gray-600" />
        </div>
    )
}

export default AdvancedSearch
