import React, { useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg"

type Subcategory = {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
}

type Category = {
    category: string
    subcategories?: Subcategory[]
    values?: string[]
}

type JSONTree = {
    _id: string
    collection: string
    categories: Category[]
}

interface CategorySelectorProps {
    item: JSONTree
    selectedCategory: string
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>, itemIndex: number, catIndex: number) => void
    index: number
    catIndex: number
}

// interface ValueProps {
//     category: string;
//     subcategories?: Subcategory[] | undefined;
// }

const jsonData: JSONTree[] = [
    {
        "_id": "6562758966826fe944b0fc2f",
        "collection": "Wielkopolska",
        "categories": [
            {
                "category": "Sygnatura nagrania",
                "subcategories": [
                    {
                        "name": "Pozycja",
                        "values": ["Rec001", "Rec002", "Rec003"],
                    },
                ],
            },
            {
                "category": "Incipit",
                "subcategories": [
                    {
                        "name": "Język incipitu",
                        "values": [
                            "angielski",
                            "niemiecki",
                            "polski",
                        ],
                    },
                ],
            },
            {
                "category": "Nazwisko wykonawcy",
                "subcategories": [
                    {
                        "name": "Wykonawca",
                        "values": ["Kowalski", "Nowak", "Wiśniewska"],
                    },
                ],
            },
            {
                "category": "Numer wątku muzycznego",
                "values": ["Muz001", "Muz002", "Muz003"],
            },
            {
                "category": "Numer w publikacji",
                "values": ["Pub001", "Pub002", "Pub003"],
            },
            {
                "category": "Sposób wykonania",
                "subcategories": [
                    {
                        "name": "Barwa głosu",
                        "values": ["baryton", "sopran", "tenor"],
                    },
                    {
                        "name": "Tempo wykonania",
                        "values": ["szybko", "umiarkowanie", "wolno"],
                    },
                    {
                        "name": "Ornamentyka",
                        "values": ["tryle", "mordenty", "vibrato"],
                    },
                ],
            },
            {
                "category": "Funkcja utworu ogólnie",
                "subcategories": [
                    {
                        "name": "Szczegółowa funkcja",
                        "values": ["taniec", "kołysanka", "pieśń ludowa"],
                    },
                    {
                        "name": "Funkcja określona przez wykonawcę",
                        "values": ["obrzędowa", "rozrywkowa", "ceremonialna"],
                    },
                ],
            },
            {
                "category": "Numer wątku melodycznego",
                "values": ["Mel001", "Mel002", "Mel003"],
            },
            {
                "category": "Wykorzystanie w publikacji",
                "values": ["Publikacja A", "Publikacja B", "Publikacja C"],
            },
            {
                "category": "Klasyfikacja melodyczna",
                "subcategories": [
                    {
                        "name": "Rytmika",
                        "values": ["4/4", "3/4", "6/8"],
                    },
                    {
                        "name": "Metrum",
                        "values": ["wolne", "umiarkowane", "szybkie"],
                    },
                    {
                        "name": "Forma melodyczna",
                        "values": ["ABA", "ABC", "AABB"],
                    },
                    {
                        "name": "Skala",
                        "values": ["majorowa", "minorowa", "chromatyczna"],
                    },
                    {
                        "name": "Ambitus",
                        "values": ["1 oktawa", "1.5 oktawy", "2 oktawy"],
                    },
                    {
                        "name": "Układ kadencji",
                        "values": ["prosta", "rozbudowana", "modulująca"],
                    },
                ],
            },
            {
                "category": "Struktura tekstu",
                "subcategories": [
                    {
                        "name": "Ilość wersów",
                        "values": ["4", "8", "12"],
                    },
                    {
                        "name": "Układ sylab w wersie",
                        "values": ["7-6-7-6", "8-8-8-8", "5-5-5-5"],
                    },
                ],
            },
            {
                "category": "Uwagi",
                "subcategories": [
                    {
                        "name": "Stan techniczny nagrania",
                        "values": ["doskonały", "dobry", "zadowalający"],
                    },
                    {
                        "name": "Walory melodii",
                        "values": ["chwytliwa", "melancholijna", "rytmiczna"],
                    },
                ],
            },
            {
                "category": "Obecność w źródłach",
                "subcategories": [
                    {
                        "name": "Antologie",
                        "values": ["Antologia A", "Antologia B", "Antologia C"],
                    },
                    {
                        "name": "Rękopisy",
                        "values": ["Rękopis 1", "Rękopis 2", "Rękopis 3"],
                    },
                    {
                        "name": "Śpiewniki",
                        "values": ["Śpiewnik 1", "Śpiewnik 2", "Śpiewnik 3"],
                    },
                ],
            },
        ],
    },
]

const NewArtworkStructure: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        itemIndex: number,
        catIndex: number,
    ) => {
        const updatedCategories = [...selectedCategories]
        updatedCategories[catIndex] = `cat-${itemIndex}-${event.target.value}`
        setSelectedCategories(updatedCategories)
    }

    const removeCategory = (catIndex: number) => {
        const updatedCategories = selectedCategories.filter((_, index) => index !== catIndex)
        setSelectedCategories(updatedCategories)
    }

    const addCategory = () => {
        setSelectedCategories([...selectedCategories, ""])
    }

    return <div className="p-4 max-w-screen-md">
        {jsonData.map((item, index) => (
            <div key={`${item._id}-${index}`}>
                <h2 className="font-bold">{item.collection}</h2>

                <div className="ml-2 border-l-2 border-gray-300">
                    {selectedCategories.map((selectedCategory, catIndex) => (
                        <CategoryAndValueSelector
                            key={catIndex}
                            item={item}
                            selectedCategory={selectedCategory}
                            handleCategoryChange={handleCategoryChange}
                            handleCategoryDeletion={() => removeCategory(catIndex)}
                            index={index}
                            catIndex={catIndex}
                        />
                    ))}
                </div>

                <div className="ml-2 flex flex-row relative">
                    <span className="absolute bg-gray-300 h-1/2 w-0.5"></span>

                    <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />
                    <button onClick={addCategory} className="p-2 border-gray-300 shadow-md" type="button">
                        <PlusIcon />
                    </button>
                </div>
            </div>
        ))}
    </div>
}

interface CategorySelectorProps {
    item: JSONTree
    selectedCategory: string
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>, itemIndex: number, catIndex: number) => void
    handleCategoryDeletion: () => void
    index: number
    catIndex: number
}

const CategoryAndValueSelector: React.FC<CategorySelectorProps> = ({
                                                                       item,
                                                                       selectedCategory,
                                                                       handleCategoryChange,
                                                                       handleCategoryDeletion,
                                                                       index,
                                                                       catIndex,
                                                                   }) => {
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

    const addSubcategorySelect = () => {
        setSelectedSubcategories([...selectedSubcategories, ""])
    }

    const handleSubcategoryChange = (subcatIndex: number, newName: string) => {
        const updatedSubcategories = [...selectedSubcategories]
        updatedSubcategories[subcatIndex] = newName
        setSelectedSubcategories(updatedSubcategories)
    }

    const removeSubcategorySelect = (subcatIndex: number) => {
        const updatedSubcategories = selectedSubcategories.filter((_, index) => index !== subcatIndex)
        setSelectedSubcategories(updatedSubcategories)
    }

    return (
        <div className="flex flex-col pb-2">
            <div className="flex flex-row">

                <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />
                <div className="p-2 border shadow-md rounded-md mt-2">
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => handleCategoryChange(e, index, catIndex)}
                        value={selectedCategory.startsWith(`cat-${index}-`) ? selectedCategory.split("-")[2] : ""}
                    >
                        <option value="">Select a Category</option>
                        {item.categories.map((category, categoryIndex) => (
                            <option key={`${category.category}-${categoryIndex}`} value={categoryIndex}>
                                {category.category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <button onClick={addSubcategorySelect} className="mx-2 p-2 shadow-md" type="button">
                        <PlusIcon />
                    </button>
                    <button onClick={handleCategoryDeletion} className="p-2 shadow-md" type="button">
                        <MinusIcon />
                    </button>
                </div>
            </div>


            {selectedSubcategories.length !== 0 && <div className="flex flex-col">
                <div className="ml-8 flex flex-row relative">
                    {/*<span className="absolute bg-gray-300 h-1/2 w-0.5"></span>*/}

                    {/*<hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />*/}
                    <div>
                        {selectedSubcategories.map((subcatName, subcatIndex) => (
                            <div className="flex flex-row items-center relative">

                                {subcatIndex !== selectedSubcategories.length - 1 ?
                                    <span className="absolute bg-gray-300 h-full w-0.5"></span>
                                    : <span className="top-0 absolute bg-gray-300 h-1/2 w-0.5"></span>
                                }
                                <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />

                                <div key={subcatIndex}
                                     className="flex flex-row items-center p-2 border shadow-md rounded-md mt-2">
                                    <select
                                        className="p-2 border rounded"
                                        value={subcatName}
                                        onChange={(e) => handleSubcategoryChange(subcatIndex, e.target.value)}
                                    >
                                        <option value="">Select a Subcategory</option>
                                        {item.categories.map((category, categoryIndex) => (
                                            category.subcategories?.map((subcat, subcatIdx) => (
                                                <option key={`subcat-${subcatIdx}`} value={subcat.name}>
                                                    {subcat.name}
                                                </option>
                                            ))
                                        ))}
                                    </select>
                                </div>

                                <button onClick={() => removeSubcategorySelect(subcatIndex)}
                                        className="ml-2 border shadow-md p-2" type="button">
                                    <MinusIcon />
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>}
        </div>
    )
}

export default NewArtworkStructure
