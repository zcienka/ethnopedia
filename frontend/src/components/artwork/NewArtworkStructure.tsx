import React, { useEffect, useRef, useState } from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import CategorySelector from "./recordBuilder/CategorySelector"
import SubcategoryList from "./recordBuilder/SubcategoryList"
import { LocationDetail, SelectedDetail, Subcategory } from "./types/ArtworkTypes"

interface CollectionItem {
    _id: any
    collectionId: any
    label: string
    name: string
    locationDetails: LocationDetail[]
}

interface CategoryAndValueSelectorProps {
    selectedDetail: SelectedDetail;
    selectedDetails: { [key: string]: SelectedDetail };
    setSelectedDetails: React.Dispatch<React.SetStateAction<{ [key: string]: SelectedDetail }>>;
    identifier: string;
    categoriesData: CollectionItem[]
}

interface NewArtworkStructureProps {
    selectedDetails: { [key: string]: SelectedDetail };
    setSelectedDetails: React.Dispatch<React.SetStateAction<{ [key: string]: SelectedDetail }>>;
    categoriesData: CollectionItem[]
}

const NewArtworkStructure: React.FC<NewArtworkStructureProps> = ({
                                                                     selectedDetails,
                                                                     setSelectedDetails,
                                                                     categoriesData,
                                                                 }) => {
    const addCategory = () => {
        const newCategoryId = `${Date.now()}`

        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [newCategoryId]: {
                label: "",
                name: "",
                values: [],
                subcategories: [],
                collectionName: "Wielkopolska",
                date: new Date().toISOString(),
                value: "",
            },
        }))
    }

    return (
        <div className="flex flex-col p-4 w-full">
            {categoriesData[0].label}
            <div className="p-4">

                {Object.entries(selectedDetails) !== undefined && Object.entries(selectedDetails)
                    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                    .map(([key, selectedDetail]) => (

                        <div className="flex flex-row" key={key}>
                            <div className="ml-2 flex flex-row relative">
                                <span className="absolute border-l-4 border-gray-300 h-full w-0.5"></span>

                                <CategoryAndValueSelector
                                    selectedDetail={selectedDetail}
                                    selectedDetails={selectedDetails}
                                    setSelectedDetails={setSelectedDetails}
                                    identifier={key}
                                    categoriesData={categoriesData}
                                />
                            </div>
                        </div>
                    ))}

                <div className="flex flex-row w-full ml-2">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center">
                            <span className="border-l-4 border-gray-300 h-1/2 flex self-start"></span>
                            <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-8 self-center" />

                            <div className="flex items-center flex-row">
                                <button
                                    className="p-2 border-gray-300 shadow-md"
                                    onClick={() => addCategory()}
                                    type="button">
                                    <PlusIcon />
                                </button>
                            </div>
                            <div className="flex items-center flex-row pt-4 h-12">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface EditingState {
    isEditing: boolean;
    editingIndex: number | null;
    editValue: string;
}

const CategoryAndValueSelector: React.FC<CategoryAndValueSelectorProps> = ({
                                                                               selectedDetails,
                                                                               selectedDetail,
                                                                               setSelectedDetails,
                                                                               identifier,
                                                                               categoriesData,
                                                                           }) => {

    const addSubcategory = (identifier: string) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [identifier]: {
                ...prevDetails[identifier],
                subcategories: [...prevDetails[identifier]?.subcategories || []],
            },
        }))
    }

    const handleCategoryChange = (identifier: string, label: string) => {
        setSelectedDetails(prevDetails => {
            const categoryData = categoriesData[0].locationDetails.find(detail => detail.label === label)

            const newSubcategories = categoryData?.subcategories?.map(subcat => ({
                label: subcat.label,
                values: subcat.values || [],
                name: subcat.name,
                // isSelectable: subcat.isSelectable,
                date: new Date().toISOString(),
            })) || []

            return {
                ...prevDetails,
                [identifier]: {
                    label: label,
                    // name: categoriesData[0].name,
                    subcategories: newSubcategories,
                    values: categoryData?.values || [],
                    collectionName: "Wielkopolska",
                    date: new Date().toISOString(),
                    value: ""
                } as any,
            }
        })
    }

    const deleteSubcategory = (identifier: string, subcatIndex: number) => {
        setSelectedDetails(prevDetails => {
            const currentSubcategories = prevDetails[identifier].subcategories
            const updatedSubcategories = currentSubcategories.filter((_, index) => index !== subcatIndex)

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: updatedSubcategories,
                },
            }
        })
    }

    const handleSubcategoryChange = (itemIndex: string, subcatIndex: number, newName: string) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [itemIndex]: {
                ...prevDetails[itemIndex],
                subcategories: prevDetails[itemIndex].subcategories.map((subcat, index) =>
                    index === subcatIndex ? { ...subcat, label: newName } : subcat,
                ),
            },
        }))
    }

    const [editingState, setEditingState] = useState<EditingState>({
        isEditing: false,
        editingIndex: null,
        editValue: "",
    })

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setEditingState(prevState => ({ ...prevState, editValue: value }))
        resizeTextarea(e.target)
    }

    const resizeTextarea = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
    }

    const handleDoubleClick = (index: number | null, name: string) => {
        setEditingState({
            isEditing: true,
            editingIndex: index,
            editValue: name,
        })
    }

    useEffect(() => {
        if (editingState.isEditing && inputRef.current) {
            resizeTextarea(inputRef.current)
        }
    }, [editingState.isEditing, editingState.editValue])

    const handleBlur = () => {
        if (editingState.isEditing && editingState.editingIndex !== null) {
            handleSubcategoryChange(identifier, editingState.editingIndex, editingState.editValue)
        }
        setEditingState({
            isEditing: false,
            editingIndex: null,
            editValue: "",
        })
    }

    return <div>
        <CategorySelector
            identifier={identifier}
            selectedCategory={selectedDetail.label}
            handleCategoryChange={handleCategoryChange}
            addSubcategory={addSubcategory}
            locationDetails={categoriesData[0].locationDetails!}
        />

        <div className="ml-16">
            <SubcategoryList
                identifier={identifier}
                subcategories={selectedDetail.subcategories}
                selectedDetails={selectedDetails}
                setSelectedDetails={setSelectedDetails}
                editingState={editingState}
                handleDoubleClick={handleDoubleClick}
                handleChange={handleChange}
                handleBlur={handleBlur}
                deleteSubcategory={deleteSubcategory}
                inputRef={inputRef}
                handleSubcategoryChange={handleSubcategoryChange}
                setEditingState={setEditingState}
            />
        </div>
    </div>
}

export default NewArtworkStructure
