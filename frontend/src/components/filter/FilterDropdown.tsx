import React, { useState } from "react"
import { useQuery } from "react-query"
import { getCategories } from "../../api/categories"
import LoadingPage from "../../pages/LoadingPage"
import { ReactComponent as AngleRightIcon } from "../../assets/icons/angleRight.svg"
import { ReactComponent as AngleDownIcon } from "../../assets/icons/angleDown.svg"
import { ReactComponent as FilterIcon } from "../../assets/icons/filter.svg"
import { getAdvancedSearchResult } from "../../api/artworks"
import { useParams } from "react-router-dom"

interface Subcategory {
    name: string;
    values: string[];
    isSelectable: boolean;
}

interface Category {
    category: string
    collectionId: string
    name: string
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
    const { id } = useParams<{ id: string }>()
    console.log({ id })

    const { data, isLoading } = useQuery<Category[], Error>(
        ["allCategories"],
        () => getCategories(id as string),
        {
            enabled: !!id,
        },
    )

    useQuery({
        queryKey: ["artwork"],
        queryFn: () => getAdvancedSearchResult(queryString as string),
        enabled: !!queryString,
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

    const renderSubcategories = (categoryName: string, subcategories: Subcategory[]) => {
        return subcategories.map(subcategory => subcategory.isSelectable ? (
            <div key={subcategory.name} className="pl-4 py-2">
                <h3 className="text-md font-semibold">{subcategory.name}</h3>
                {subcategory.values.map(value => (
                    <label key={value} className="block cursor-pointer">
                        <input
                            type="checkbox"
                            className="mr-2 leading-tight"
                            checked={checkedSubcategories[categoryName]?.[subcategory.name]?.[value] || false}
                            onChange={(e) => handleCheckboxChange(categoryName, subcategory.name, value, e.target.checked)}
                        />
                        <span className="text-sm">{value}</span>
                    </label>
                ))}
            </div>
        ) : null)
    }

    const renderCategory = (category: Category) => {
        const isCategoryOpen = openCategories.has(category.name)
        return (
            <div key={category.name} className="hover:bg-gray-100 py-2 rounded-md px-4">
                <h2 onClick={() => toggleCategory(category.name)}
                    className="text-md cursor-pointer flex justify-between">
                    {category.name}
                    <span>{isCategoryOpen ? <AngleDownIcon /> : <AngleRightIcon />}</span>
                </h2>
                {isCategoryOpen && category.locationDetails && renderSubcategories(category.name, category.locationDetails)}
            </div>
        )
    }
    const renderValues = (values: string[], categoryName: string, subcategoryName: string) => {s
        return values.map(value => (
            <div key={`${subcategoryName}-${value}`} className="pl-6">
                <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">{value}</span>
                </label>
            </div>
        ))
    }

    const renderSubcategories1 = (subcategories: Value[], categoryName: string) => {
        return subcategories.map(subcategory => (
            <div key={subcategory.name}>
                <div className="font-bold">{subcategory.name}</div>
                {renderValues(subcategory.values, categoryName, subcategory.name)}
            </div>
        ))
    }

    const renderCategories = (categories: Category[]) => {
        return categories.map(category => {
            const isCategoryOpen = openCategories.has(category.name)
            return (
                <div key={category.name} className="border-b">
                    <div
                        onClick={() => toggleCategory(category.name)}
                        className="flex justify-between items-center cursor-pointer p-2"
                    >
                        {category.name}
                        {isCategoryOpen ? <AngleDownIcon /> : <AngleRightIcon />}
                    </div>
                    {isCategoryOpen && renderSubcategories1(category.subcategories, category.name)}
                </div>
            )
        })
    }


    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="px-2 pb-4 border border-gray-300 bg-white shadow rounded-lg overflow-hidden h-fit">
            <h2 className="pt-4 pb-1 px-4 text-xl font-semibold text-gray-900 dark:text-white">
                <span className="flex items-center">
                    <FilterIcon />
                    Filtry
                </span>
            </h2>
            {data?.map(renderCategory)}
            {data?.map(item => (
                <div key={item._id} className="mt-4">
                    <h3 className="font-bold">{item.name}</h3>
                    {renderCategories(item.categories)}
                </div>
            ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleApplyFilters}>
                Zastosuj
            </button>
        </div>
    )
}

export default FilterDropdown
