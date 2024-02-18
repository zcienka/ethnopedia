import React, { ChangeEvent, FC, useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"

type Subcategory = {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable?: boolean
}

interface SelectedDetail {
    category: string;
    subcategories: string[];
    detailIndex?: any;
}

const jsonData: CollectionItem[] = [
    {
        "_id": "65ce9ec43171573092ad7e2e",
        "collectionId": "65ce9ec33171573092ad7df7",
        "category": "Region",
        "name": "Wielkopolska",
        "locationDetails": [
            {
                "name": "Podregion",
                "values": [
                    "Wielkopolska Północno-Zachodnia",
                    "Wielkopolska Północno-Wschodnia",
                    "Wielkopolska Południowo-Zachodnia",
                    "Wielkopolska Południowo-Wschodnia",
                ],
                "isSelectable": true,
            },
            {
                "name": "Region etnograficzny",
                "values": [
                    "Szamotulskie",
                    "Ziemia Lubuska",
                    "Kaliskie",
                ],
                "isSelectable": true,
            },
            {
                "name": "Powiat",
                "values": [
                    "Gniezno",
                    "Poznań",
                    "Września",
                    "Środa",
                ],
                "isSelectable": true,
            },
            {
                "name": "Miejscowość",
                "values": [
                    "Leszno",
                    "Kalisz",
                    "Konin",
                    "Piła",
                    "Ostrów Wielkopolski",
                ],
                "isSelectable": true,
            },
            {
                "name": "Sygnatura nagrania",
                "subcategories": [
                    {
                        "name": "Pozycja",
                        "values": [],
                    },
                ],
                "isSelectable": false,
            },
            {
                "name": "Incipit",
                "subcategories": [
                    {
                        "name": "Język incipitu",
                        "values": [
                            "angielski",
                            "niemiecki",
                        ],
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Nazwisko wykonawcy",
                "subcategories": [
                    {
                        "name": "Wykonawca",
                        "values": [
                            "sadjkasdkjsda",
                            "sadjkasdkjsda",
                            "sadjkasdkjsda",
                        ],
                    },
                ],
                "isSelectable": false,
            },
            {
                "name": "Numer wątku muzycznego",
                "subcategories": [],
                "isSelectable": false,
            },
            {
                "name": "Numer w publikacji",
                "subcategories": [],
                "isSelectable": false,
            },
            {
                "name": "Sposób wykonania",
                "subcategories": [
                    {
                        "name": "Barwa głosu",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Tempo wykonania",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Ornamentyka",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Funkcja utworu ogólnie",
                "subcategories": [
                    {
                        "name": "Szczegółowa funkcja",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Funkcja określona przez wykonawcę",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Numer wątku melodycznego",
                "subcategories": [],
                "isSelectable": false,
            },
            {
                "name": "Wykorzystanie w publikacji",
                "subcategories": [],
                "isSelectable": false,
            },
            {
                "name": "Klasyfikacja melodyczna",
                "subcategories": [
                    {
                        "name": "Rytmika",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Metrum",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Forma melodyczna",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Skala",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Ambitus",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Układ kadencji",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Struktura tekstu",
                "subcategories": [
                    {
                        "name": "Ilość wersów",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Układ sylab w wersie",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Uwagi",
                "subcategories": [
                    {
                        "name": "Stan techniczny nagrania",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Walory melodii",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
            {
                "name": "Obecność w źródłach",
                "subcategories": [
                    {
                        "name": "Antologie",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Rękopisy",
                        "values": [],
                        "isSelectable": false,
                    },
                    {
                        "name": "Śpiewniki",
                        "values": [],
                        "isSelectable": false,
                    },
                ],
                "isSelectable": true,
            },
        ],
    },
]

const NewArtworkStructure = () => {
    const [selectedDetails, setSelectedDetails] = useState<{ [key: string]: SelectedDetail }>({})

    const addSubcategory = (identifier: string) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [identifier]: {
                ...prevDetails[identifier],
                subcategories: [...prevDetails[identifier]?.subcategories || [], ""],
            },
        }))
    }

    const addCategory = () => {
        const newCategoryId = `${Date.now()}`

        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [newCategoryId]: {
                category: "",
                detailIndex: null,
                subcategories: [],
            },
        }))
    }

    const handleCategoryChange = (identifier: string, newCategoryName: string) => {
        setSelectedDetails(prevDetails => {
            const updatedDetails = {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    category: newCategoryName,
                },
            }
            console.log(updatedDetails)
            return updatedDetails
        })
    }

    const handleDetailChange = (itemIndex: string, detailIndex: any) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [itemIndex]: {
                ...prevDetails[itemIndex],
                detailIndex: detailIndex,
                subcategories: prevDetails[itemIndex]?.subcategories || [],
            },
        }))
    }

    const handleSubcategoryChange = (itemIndex: string, subcatName: string, subcatIndex: any) => {

        console.log({ itemIndex, subcatName, subcatIndex })
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [itemIndex]: {
                ...prevDetails[itemIndex],
                subcategories: prevDetails[itemIndex].subcategories.map((subcat, index) =>
                    index === subcatIndex ? subcatName : subcat,
                ),
            },
        }))
    }

    console.log({ selectedDetails })
    return (
        <div className="p-4 max-w-screen-md">
            {Object.entries(selectedDetails)
                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                .map(([key, selectedDetail]) => (

                    <div key={key}>
                        <CategoryAndValueSelector
                            selectedDetails={selectedDetails}
                            handleCategoryChange={handleCategoryChange}
                            handleDetailChange={handleDetailChange}
                            handleSubcategoryChange={handleSubcategoryChange}
                            addSubcategory={addSubcategory}
                            subcategories={selectedDetail.subcategories || []}
                            category={selectedDetail.category || ""}
                            identifier={key}
                        />
                    </div>
                ))}


            <div className="ml-2 flex flex-row relative">
                <span className="absolute bg-gray-300 h-1/2 w-0.5"></span>

                <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />
                <button
                    onClick={() => addCategory()}
                    className="p-2 border-gray-300 shadow-md"
                    type="button"
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    )
}


interface LocationDetail {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable: boolean
}

interface CollectionItem {
    _id: any
    collectionId: string
    category: string
    name: string
    locationDetails: LocationDetail[]
}


interface CategorySelectorProps {
    item: CollectionItem;
    identifier: string;
    detailIndex: any;
    subcategories: string[];
    category?: string;
    handleDetailChange: (identifier: string, detailIndex: number | null) => void;
    handleSubcategoryChange: (identifier: string, subcatName: string, subcatIndex: any) => void;
    addSubcategory: (identifier: any) => void;
    handleCategoryChange: (identifier: string, category: string) => void;
}

interface CategoryAndValueSelectorProps {
    selectedDetails: { [key: string]: SelectedDetail };
    handleCategoryChange: (itemIndex: string, newCategoryName: string) => void;
    handleDetailChange: (itemIndex: string, detailIndex: any) => void;
    handleSubcategoryChange: (itemIndex: string, subcatName: string, subcatIndex: any) => void;
    addSubcategory: (identifier: string) => void;
    subcategories: any[]
    category: any
    identifier: any
}


const CategoryAndValueSelector: React.FC<CategoryAndValueSelectorProps> = ({
                                                                               selectedDetails,
                                                                               handleCategoryChange,
                                                                               handleDetailChange,
                                                                               handleSubcategoryChange,
                                                                               addSubcategory,
                                                                               subcategories,
                                                                               category,
                                                                               identifier,
                                                                           }) => {

    console.log({ subcategories })

    return (
        <div>
            {jsonData.map((item) => (
                <div key={item._id} className="mb-4">
                    <div>
                        <label className="block mb-1">Category:</label>
                        <select
                            className="mb-2 p-2 border rounded"
                            value={selectedDetails[identifier]?.category || ""}
                            onChange={(e) => handleCategoryChange(identifier, e.target.value)}
                        >
                            <option value="">Select a Category</option>
                            {item.locationDetails.map((detail, index) => (
                                <option key={index} value={detail.name}>
                                    {detail.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedDetails[identifier]?.detailIndex !== null && (
                        <div>
                            <label className="block mb-1">Detail:</label>
                            <select
                                className="mb-2 p-2 border rounded"
                                value={selectedDetails[identifier]?.detailIndex?.toString() || ""}
                                onChange={(e) => handleDetailChange(identifier, Number(e.target.value))}
                            >
                                <option value="">Select Detail</option>
                                {item.locationDetails
                                    .find((detail) => detail.name === selectedDetails[identifier]?.category)
                                    ?.values?.map((value, index) => (
                                        <option key={index} value={index}>
                                            {value}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <button
                            type="button"
                            onClick={() => addSubcategory(identifier)}
                            className="mt-2 p-2 bg-blue-500 text-white rounded"
                        >
                            Add Subcategory
                        </button>
                    </div>
                    {subcategories.length > 0 &&

                        <div>
                            <label className="block mb-1">Subcategory:</label>
                            <select
                                className="mb-2 p-2 border rounded"
                                value={selectedDetails[identifier]?.subcategories || ""}
                                onChange={(e) => handleDetailChange(identifier, e.target.value)}
                            >
                                <option value="">Select Subcategory</option>
                                {subcategories.map((subcat, index) => (
                                    <option key={index} value={subcat}>
                                        {subcat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default NewArtworkStructure
