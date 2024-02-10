import React, { useState } from "react"
import { useQuery } from "react-query"
import { getCategories } from "../../api/categories"
import LoadingPage from "../../pages/LoadingPage"
import { ReactComponent as AngleRightIcon } from "../../assets/icons/angleRight.svg"
import { ReactComponent as AngleDownIcon } from "../../assets/icons/angleDown.svg"
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"
import { getAdvancedSearchResult } from "../../api/artworks"

interface Subcategory {
    name: string
    values?: string[]
}

interface Category {
    category: string
    subcategories?: Subcategory[]
}

interface FilterData {
    _id: string
    collection: string
    categories: Category[]
}

interface CheckedSubcategory {
    [category: string]: {
        [subcategory: string]: {
            [value: string]: boolean;
        }
    }
}


const FilterDropdown: React.FC = () => {
    const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())
    const [queryString, setQueryString] = useState<string | undefined>(undefined)
    const [checkedSubcategories, setCheckedSubcategories] = useState<CheckedSubcategory>({})

    const { data, isLoading } = useQuery<FilterData[], Error>(
        "allCategories",
        getCategories,
    )

    useQuery({
        queryKey: ["artwork"],
        queryFn: () => getAdvancedSearchResult(queryString as string),
        enabled: !!queryString,
    })

    const toggleCategory = (category: string) => {
        setOpenCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(category)) {
                newSet.delete(category)
            } else {
                newSet.add(category)
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
                        queryParams.push(`${encodeURIComponent(category)}[${encodeURIComponent(subcatName)}]=${encodeURIComponent(value)}`)
                    }
                })
            })
        })

        return `/filter?${queryParams.join("&")}`
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
    // console.log({ queryString })
    const renderSubcategory = (category: string, subcategory: Subcategory) => {
        return (
            <div key={subcategory.name} className="pl-4 py-2">
                <h3 className="text-md font-semibold">{subcategory.name}</h3>
                {subcategory.values?.map(value => (
                    <label key={value} className="block cursor-pointer">
                        <input
                            type="checkbox"
                            className="mr-2 leading-tight"
                            checked={checkedSubcategories[category]?.[subcategory.name]?.[value] || false}
                            onChange={(e) => handleCheckboxChange(category, subcategory.name, value, e.target.checked)}
                        />
                        <span className="text-sm">{value}</span>
                    </label>
                ))}
            </div>
        )
    }

    const renderCategory = (category: Category) => {
        if (category.category !== "Region") {
            const isCategoryOpen = openCategories.has(category.category)
            return (
                <div key={category.category} className="hover:bg-gray-100 py-2 rounded-md px-4">
                    <h2 onClick={() => toggleCategory(category.category)}
                        className="text-md cursor-pointer rounded-md flex flex-row">
                        {category.category}
                        <div className="flex-grow ml-2" />
                        <span className="flex items-center">
                        {isCategoryOpen ? <AngleDownIcon /> : <AngleRightIcon />}
                    </span>
                    </h2>
                    {isCategoryOpen && category.subcategories?.map(subcategory =>
                        renderSubcategory(category.category, subcategory))
                    }
                </div>
            )
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return <div className="px-2 pb-4 border border-gray-300 bg-white shadow rounded-lg overflow-hidden h-fit">
        <h2 className="pt-4 pb-1 px-4 text-xl font-semibold text-gray-900 dark:text-white">
                <span className="flex items-center">
                    <FilterIcon />
                    Filtry
                </span>
        </h2>
        {data?.map(item => item.categories.map(renderCategory))}

        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-4 py-2 px-4"
            onClick={handleApplyFilters}>
            Zastosuj
        </button>
    </div>
}

export default FilterDropdown
