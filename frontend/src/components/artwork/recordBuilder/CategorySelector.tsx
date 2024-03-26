import React from "react"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"
import { LocationDetail } from "../types/ArtworkTypes"

interface CategorySelectorProps {
    identifier: string;
    selectedCategory: string;
    handleCategoryChange: (identifier: string, newCategory: string) => void;
    addSubcategory: (identifier: string) => void;
    locationDetails: LocationDetail[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
                                                               identifier,
                                                               selectedCategory,
                                                               handleCategoryChange,
                                                               addSubcategory,
                                                               locationDetails,
                                                           }) => {

    return (
        <div key={identifier}>
            <label className="ml-16 mb-1">Kategoria:</label>

            <div className="relative flex flex-row">
                <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-16 self-center" />

                <div className="flex flex-col">
                    <select
                        className="p-2 border rounded"
                        value={selectedCategory || ""}
                        onChange={(e) => handleCategoryChange(identifier, e.target.value)}
                    >
                        <option key={""} value={""} hidden>Wybierz kategorię</option>

                        {locationDetails.map((item, index) => (
                            <option key={index} value={item.label}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center ml-2 h-full">
                    <button type="button"
                            className="p-2 border-gray-300 shadow-md mr-1"
                            onClick={() => addSubcategory(identifier)}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategorySelector
