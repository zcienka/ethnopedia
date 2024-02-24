import React, { ChangeEvent, FC, useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"

type Subcategory = {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
    isSelectable?: boolean
}

interface SelectedDetail {
    category: any;
    subcategories: Subcategory[];
    details?: string[]
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
                "isSelectable": false,
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
    const defaultSelectedDetails: { [key: string]: SelectedDetail } = {
        [`${Date.now()}`]: {
            category: "",
            details: [],
            subcategories: [],
        },
    }
    const [selectedDetails, setSelectedDetails] = useState<{ [key: string]: SelectedDetail }>(defaultSelectedDetails)
    const addSubcategory = (identifier: string) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [identifier]: {
                ...prevDetails[identifier],
                subcategories: [...prevDetails[identifier]?.subcategories || [], { name: "" }],
            },
        }))
    }

    const addCategory = () => {
        const newCategoryId = `${Date.now()}`

        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [newCategoryId]: {
                category: "",
                details: [],
                subcategories: [],
            },
        }))
    }

    console.log({ selectedDetails })

    const handleCategoryChange = (identifier: string, newCategoryName: string) => {
        setSelectedDetails(prevDetails => {
            const updatedDetails = {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    category: newCategoryName,
                },
            }
            return updatedDetails
        })
    }

    const handleDetailChange = (itemIndex: string, detailIndex: any) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [itemIndex]: {
                ...prevDetails[itemIndex],
                details: detailIndex,
                subcategories: prevDetails[itemIndex]?.subcategories || [],
            },
        }))
    }

    const handleSubcategoryChange = (itemIndex: string, subcatName: string) => {
        setSelectedDetails(prevDetails => {
            const newState = { ...prevDetails }

            let item = newState[itemIndex] = newState[itemIndex] || {}
            let subcategories = item.subcategories = item.subcategories || []

            const subcatIndex = subcategories.findIndex(subcat => subcat.name === subcatName)

            if (subcatIndex !== -1) {
            } else {
                subcategories.push({ name: subcatName, values: [], subcategories: [], isSelectable: true })
            }

            return newState
        })
    }

    return (
        <div className="p-4 max-w-screen-md">
            {Object.entries(selectedDetails) !== undefined && Object.entries(selectedDetails)
                .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                .map(([key, selectedDetail]) => (

                    <div key={key}>
                        <CategoryAndValueSelector
                            selectedDetail={selectedDetail}
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
    collectionId: any
    category: string
    name: string
    locationDetails: LocationDetail[]
}

interface CategoryAndValueSelectorProps {
    selectedDetail: SelectedDetail
    handleCategoryChange: (itemIndex: string, newCategoryName: string) => void;
    handleDetailChange: (itemIndex: string, detailIndex: any) => void;
    handleSubcategoryChange: (itemIndex: string, subcatIndex: any) => void;
    addSubcategory: (identifier: string) => void;
    subcategories: any[]
    category: any
    identifier: any
}


const CategoryAndValueSelector: React.FC<CategoryAndValueSelectorProps> = ({
                                                                               selectedDetail,
                                                                               handleCategoryChange,
                                                                               handleDetailChange,
                                                                               handleSubcategoryChange,
                                                                               addSubcategory,
                                                                               subcategories,
                                                                               category,
                                                                               identifier,
                                                                           }) => {
    return (
        <div>
            <div key={identifier} className="mb-4">
                <div>
                    <label className="block mb-1">Kategoria:</label>
                    <select
                        className="mb-2 p-2 border rounded"
                        value={selectedDetail.category || ""}
                        onChange={(e) => handleCategoryChange(identifier, e.target.value)}
                    >
                        <option key={""} value={""} hidden>Wybierz kategorię</option>

                        {jsonData[0].locationDetails.map((item, index) => (
                            <option key={index} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {selectedDetail && selectedDetail.subcategories && selectedDetail.subcategories.map((subcat, index) => (
                <div key={index} className="mb-4">
                    {subcat.name && <label className="block mb-1">{subcat.name}:</label>}

                    {jsonData[0].locationDetails.find(detail => detail.name === selectedDetail.category)?.subcategories?.map((subcatDetail, subcatIndex) => (
                        <>
                            <p>{subcatDetail.name}</p>
                            <select
                                className="my-2 p-2 border rounded"
                                onChange={(e) => handleSubcategoryChange(identifier, e.target.value)}
                            >

                                {subcatDetail.values?.map((value: string, valueIndex: number) => (
                                    <option key={valueIndex} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </>
                    ))}
                </div>
            ))}

            <button type="button"
                    className="p-2 border-gray-300 shadow-md"
                    onClick={() => addSubcategory(identifier)}>
                <PlusIcon />
            </button>
        </div>
    )
}

export default NewArtworkStructure
