import React, { useState } from "react"

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
    item: JSONTree;
    selectedCategory: string;
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>, itemIndex: number, catIndex: number) => void;
    index: number;
    catIndex: number;
}

interface ValueProps {
    category: string;
    subcategories?: Subcategory[] | undefined;
}

const jsonData: JSONTree[] = [
    {
        "_id": "6562758966826fe944b0fc2f",
        "collection": "Wielkopolska",
        "categories": [
            // ... existing categories ...
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

const Temp: React.FC = () => {
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

    const addCategory = () => {
        setSelectedCategories([...selectedCategories, ""])
    }

    return (
        <div className="p-4 max-w-screen-md">
            {jsonData.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                    <h2 className="font-bold">{item.collection}</h2>

                    <div className="ml-2 pl-4 border-l-2 border-gray-300">
                        {selectedCategories.map((selectedCategory, catIndex) => (
                            <CategorySelector
                                key={catIndex}
                                item={item}
                                selectedCategory={selectedCategory}
                                handleCategoryChange={handleCategoryChange}
                                index={index}
                                catIndex={catIndex}
                            />
                        ))}
                    </div>
                    <button onClick={addCategory} className="p-2 border rounded">
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

const Value: React.FC<ValueProps> = ({ category, subcategories }) => {
    const [selectedValues, setSelectedValues] = useState<any[]>([])
    const [selectedName, setSelectedNames] = useState<string>("")

    const handleSelectNameChange = (selectedName: string) => {
        setSelectedNames(selectedName)
        const selectedSubcat = subcategories?.find(subcat => subcat.name === selectedName)
        setSelectedValues(selectedSubcat?.values ? selectedSubcat.values : [])
    }

    const handleSelectChange = (subcategoryName: string, value: string) => {
        setSelectedValues({ ...selectedValues, [subcategoryName]: value })
    }

    return (
        <>
            <select
                className="p-2 border rounded ml-2"
                value={selectedName}
                onChange={(e) => handleSelectNameChange(e.target.value)}
            >
                {subcategories?.map((subcat, index) => (
                    <option key={`subcat-${index}`} className="font-bold">{subcat.name}</option>
                ))}
            </select>

            <hr className="ml-2 border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />

            <select
                className="p-2 border rounded ml-2"
                value={selectedName}
                onChange={(e) => handleSelectChange(selectedName, e.target.value)}
            >
                {selectedValues?.map((value, index) => (
                    <option key={`subcat-val-${index}`} value={value}>{value}</option>
                ))}
            </select>
        </>
    )
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
                                                               item,
                                                               selectedCategory,
                                                               handleCategoryChange,
                                                               index,
                                                               catIndex,
                                                           }) => {
    return (
        <div className="flex flex-row items-start p-2 border shadow-md rounded-md mt-2">
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

            {item.categories.map((category, categoryIndex) => {
                const categoryKey = `cat-${index}-${categoryIndex}`
                return (
                    selectedCategory === categoryKey && (
                        <Value key={`${category.category}-${categoryIndex}`}
                               category={category.category}
                               subcategories={category.subcategories} />
                    )
                )
            })}
        </div>
    )
}
export default Temp
