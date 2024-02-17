import React, { ChangeEvent, FC, useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg"

type Subcategory = {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable?: boolean
}

type Category = {
    category: string
    subcategories?: Subcategory[]
    values?: string[]
}


interface SelectedDetail {
    detailIndex: number | null;
    subcategories: string[];
    category: string; // Ensure this is not optional if you always initialize it
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

    const handleDetailChange = (itemIndex: number, detailIndex: any) => {
        const details = { ...selectedDetails }
        if (!details[itemIndex]) details[itemIndex] = { category: "", detailIndex: null, subcategories: [] }
        details[itemIndex].detailIndex = detailIndex
        setSelectedDetails(details)
    }

    const handleSubcategoryChange = (itemIndex: number, subcatName: string, subcatIndex: any) => {
        const details = { ...selectedDetails }
        const currentSubcategories = details[itemIndex]?.subcategories || []
        currentSubcategories[subcatIndex] = subcatName
        details[itemIndex] = { ...details[itemIndex], subcategories: currentSubcategories }
        setSelectedDetails(details)
    }

    const addSubcategory = (itemIndex: any) => {
        const details = { ...selectedDetails }
        const currentSubcategories = details[itemIndex]?.subcategories || []
        currentSubcategories.push("")
        details[itemIndex] = { ...details[itemIndex], subcategories: currentSubcategories }
        setSelectedDetails(details)
    }

    const addCategory = () => {
        const newCategoryId = `new-${Date.now()}`
        setSelectedDetails((prevDetails) => ({
            ...prevDetails,
            [newCategoryId]: {
                category: "", // Initially empty, can be renamed by the user
                detailIndex: null, // Assuming null is an acceptable initial value
                subcategories: [], // Placeholder for future subcategories
            },
        }))
    }

    const handleCategoryChange = (identifier: any, newCategoryName: any) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [identifier]: {
                ...prevDetails[identifier],
                category: newCategoryName,
            },
        }))
    }


    console.log({ selectedDetails })
    return (
        <div className="p-4 max-w-screen-md">
            {Object.entries(selectedDetails).map(([key, detail]) => (

                jsonData.map((item: CollectionItem) => (
                    <div key={item._id}>
                        <h2 className="font-bold">{item.name}</h2>
                        <CategoryAndValueSelector
                            item={item}
                            identifier={item._id}
                            category={selectedDetails[item._id]?.category ?? ""}
                            detailIndex={selectedDetails[item._id]?.detailIndex ?? null} // Ensure this is null if not set, as your type expects a number or null
                            subcategories={selectedDetails[item._id]?.subcategories ?? []}
                            handleCategoryChange={(category) => handleCategoryChange(item._id, category)}
                            handleDetailChange={(detailIndex) => handleDetailChange(item._id, detailIndex)}
                            handleSubcategoryChange={(subcatName, subcatIndex) => handleSubcategoryChange(item._id, subcatName, subcatIndex)}
                            addSubcategory={() => addSubcategory(item._id)}
                        />
                    </div>
                ))
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

const CategoryAndValueSelector: FC<CategorySelectorProps> = ({
                                                                 item,
                                                                 identifier,
                                                                 detailIndex,
                                                                 subcategories,
                                                                 handleDetailChange,
                                                                 handleSubcategoryChange,
                                                                 addSubcategory,
                                                             }) => {
    const onDetailChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newIndex = e.target.value === "" ? null : parseInt(e.target.value, 10)
        handleDetailChange(identifier, newIndex)
    }

    const onSubcategoryChange = (subcatIndex: number) => (e: ChangeEvent<HTMLSelectElement>) => {
        handleSubcategoryChange(identifier, e.target.value, subcatIndex)
    }

    return (
        <div className="flex flex-col pb-2">
            <div className="flex flex-row items-center">
                <select
                    className="p-2 border rounded"
                    value={detailIndex !== null ? detailIndex : ""}
                    onChange={onDetailChange}
                >
                    <option value="">Select a Location Detail</option>
                    {item.locationDetails.map((detail: any, idx: any) => (
                        <option key={`${detail.name}-${idx}`} value={idx}>
                            {detail.name}
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => addSubcategory(detailIndex)} className="ml-2">
                    Add Subcategory
                </button>
            </div>
            {subcategories.map((subcat, subcatIdx) => (
                <div key={subcatIdx} className="flex flex-row items-center mt-2">
                    <select
                        className="p-2 border rounded"
                        value={subcat}
                        onChange={onSubcategoryChange(subcatIdx)}
                    >
                        <option value="">Select a Subcategory</option>
                        {item.locationDetails[detailIndex]?.subcategories?.map((subcat: any, idx: any) => (
                            <option key={`subcat-${idx}`} value={subcat.name}>
                                {subcat.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    )
}

export default NewArtworkStructure
