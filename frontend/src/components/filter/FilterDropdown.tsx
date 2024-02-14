import React, { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { getCategories } from "../../api/categories"
import LoadingPage from "../../pages/LoadingPage"
import { ReactComponent as AngleRightIcon } from "../../assets/icons/angleRight.svg"
import { ReactComponent as AngleDownIcon } from "../../assets/icons/angleDown.svg"
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"
import { getAdvancedSearchResult } from "../../api/artworks"
import { useParams } from "react-router-dom"

interface Subcategory {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable: boolean
}

interface Category {
    _id: string
    category: string
    collectionId: string
    name: string
    locationDetails?: Subcategory[]
    // subcategories?: Subcategory[]
    // otherCategories?: Value[]
}

interface Value {
    name: string
    subcategories: string[]
    isSelectable: boolean
}

interface CheckedSubcategory {
    [category: string]: {
        [subcategory: string]: {
            [value: string]: boolean
        }
    }
}


const FilterDropdown: React.FC = () => {
    const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())
    const [queryString, setQueryString] = useState<string | undefined>(undefined)
    const [checkedSubcategories, setCheckedSubcategories] = useState<CheckedSubcategory>({})
    const { id } = useParams<{ id: string }>()

    const { data, isLoading } = useQuery<Category[], Error>(
        ["allCategories"],
        () => getCategories(id as string),
        {
            enabled: !!id,
        },
    )

    const queryClient = useQueryClient()

    useQuery({
        // queryKey: ["artwork"],
        queryFn: () => getAdvancedSearchResult(queryString as string),
        enabled: !!queryString,
        onSuccess: (data) => {
            console.log({data})
            queryClient.setQueryData(["artwork"], data)
        },
    })

    const toggleCategory = (categoryName: string) => {
        setOpenCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(categoryName)) {
                newSet.delete(categoryName)
            } else {
                newSet.add(categoryName)
            }
            return newSet
        })
    }

    const generateQueryString = (): string => {
        let queryParams: string[] = []

        Object.entries(checkedSubcategories).forEach(([category, subcats]) => {
            Object.entries(subcats).forEach(([subcatName, values]) => {
                Object.entries(values).forEach(([value, isChecked]) => {
                    if (isChecked) {
                        queryParams.push(`Region=${category}&${subcatName}=${value}`)
                    }
                })
            })
        })

        return `/artworks/filter?${queryParams.join("&")}`
    }
    const handleCheckboxChange = (category: string, subcategoryName: string, value: string, isChecked: boolean) => {
        setCheckedSubcategories(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [subcategoryName]: {
                    ...(prev[category]?.[subcategoryName] || {}),
                    [value]: isChecked,
                },
            },
        }))
    }


    const handleApplyFilters = () => {
        const generatedQueryString = generateQueryString()
        setQueryString(generatedQueryString)
    }

    const renderLocationDetails = (categoryName: string, subcategories: Subcategory[]) => {
        return subcategories.map(subcategory => subcategory.isSelectable ? (
            <div key={subcategory.name} className="mt-2">
                <h3 className="text-md font-semibold">{subcategory.name}</h3>
                {subcategory.values !== undefined ? subcategory.values.map(value => (
                    <label key={value} className="block cursor-pointer">
                        <input
                            type="checkbox"
                            className="mr-2 leading-tight"
                            checked={checkedSubcategories[categoryName]?.[subcategory.name]?.[value] || false}
                            onChange={(e) => handleCheckboxChange(categoryName, subcategory.name, value, e.target.checked)}
                        />
                        <span className="text-sm">{value}</span>
                    </label>
                )) : renderSubcategories(subcategory.subcategories || [], categoryName)}
            </div>
        ) : null)
    }

    const renderCategory = (category: Category) => {
        const isCategoryOpen = true
        return (
            <div key={category.name} className="p-2 rounded-md hover:bg-gray-100">
                <h2 onClick={() => toggleCategory(category.name)}
                    className="text-md cursor-pointer font-bold flex justify-between">
                    {category.name}
                    <span>{isCategoryOpen ? <AngleDownIcon /> : <AngleRightIcon />}</span>
                </h2>
                {category.locationDetails && renderLocationDetails(category.name, category.locationDetails)}
            </div>
        )
    }
    const renderValues = (values: string[], categoryName: string, subcategoryName: string) => {
        return values.map(value => (
            <div key={`${subcategoryName}-${value}`}>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={checkedSubcategories[categoryName]?.[subcategoryName]?.[value] || false}
                        onChange={(e) => handleCheckboxChange(categoryName, subcategoryName, value, e.target.checked)}
                    /> <span className="font-normal">{value}</span>
                </label>
            </div>
        ))
    }

    const renderSubcategories = (subcategories: Subcategory[], categoryName: string) => {
        return subcategories.map(subcategory => subcategory.values != undefined && subcategory.values.length > 0 && (
            <div key={subcategory.name} className="mt-2 text-gray-900">
                <div className="font-semibold">{subcategory.name}</div>
                {renderValues(subcategory.values || [], categoryName, subcategory.name)}
            </div>
        ))
    }

    const renderCategories = (categories: Subcategory[]) => {
        return categories.map(category => {
            const isCategoryOpen = openCategories.has(category.name)
            return (
                <div key={category.name} className="p-2 text-md hover:bg-gray-100 rounded-md">
                    <div
                        onClick={() => toggleCategory(category.name)}
                        className="flex justify-between items-center cursor-pointer font-bold"
                    >
                        {category.name}
                        {isCategoryOpen ? <AngleDownIcon /> : <AngleRightIcon />}
                    </div>
                    {isCategoryOpen && renderSubcategories(category.subcategories || [], category.name)}
                </div>
            )
        })
    }


    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="px-8 py-6 border border-gray-300 bg-white shadow rounded-lg overflow-hidden h-fit">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                <span className="flex items-center">
                    <FilterIcon />
                    Filtry
                </span>
            </h2>
            {data?.map(renderCategory)}

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
                onClick={handleApplyFilters}>
                Zastosuj
            </button>
        </div>
    )
}

export default FilterDropdown
