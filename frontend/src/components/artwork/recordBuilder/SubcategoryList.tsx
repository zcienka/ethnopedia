import React, { useCallback, useState } from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"

interface Subcategory {
    name: string
    values?: string[]
    subcategories?: Subcategory[]
}

interface EditingState {
    isEditing: boolean
    editingIndex: number | null
    editValue: string
}

interface SelectedDetail {
    category: any
    subcategories: Subcategory[]
    collection: string
    values?: string[]
    date: string
}

interface SubcategoryListProps {
    identifier: string
    subcategories: Subcategory[]

    selectedDetail: SelectedDetail;
    selectedDetails: { [key: string]: SelectedDetail };
    setSelectedDetails: React.Dispatch<React.SetStateAction<{ [key: string]: SelectedDetail }>>;

    editingState: EditingState
    handleDoubleClick: (index: number, name: string) => void
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleBlur: () => void
    deleteSubcategory: (identifier: string, index: number) => void
    inputRef: React.RefObject<HTMLTextAreaElement>
    handleSubcategoryChange: (identifier: string, index: number, value: string) => void
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>
}

interface NestedSubcategory {
    category: string
    values: string[]
}

interface NestedSubcategory {
    category: string
    values: string[]
}

interface SubcategoriesMap {
    [key: string]: {
        name: string;
        values?: string[];
        subcategories?: NestedSubcategory[]
    }
}

const initialSubcategories: SubcategoriesMap = {}

interface RecursiveSubcategoryProps {
    subcategories: Subcategory[];
    addSubcategory: (path: number[]) => void;
    addValueToSubcategory: (path: number[], newValue: string) => void;
    deleteSubcategory: (path: number[]) => void;
    path?: number[];
    handleSubcategoryNameChange: (path: number[], newName: string) => void;
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({
                                                             identifier,
                                                             selectedDetail,
                                                             selectedDetails,
                                                             setSelectedDetails,
                                                         }) => {

    const addSubcategory = useCallback((path: number[]) => {
        const newSubcategory: Subcategory = {
            name: "",
            values: [],
            subcategories: [],
        }

        setSelectedDetails((prevDetails) => {
            const addSubcategoryAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) {
                    return [...subcategories, newSubcategory]
                } else {
                    const [currentIndex, ...restOfPath] = path
                    return subcategories.map((subcat, index) => {
                        if (index === currentIndex) {
                            return {
                                ...subcat,
                                subcategories: addSubcategoryAtPath(subcat.subcategories ?? [], restOfPath),
                            }
                        }
                        return subcat
                    })
                }
            }

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: addSubcategoryAtPath(prevDetails[identifier].subcategories, path),
                },
            }
        })
    }, [setSelectedDetails, identifier])

    const deleteSubcategory = useCallback((path: number[]) => {
        setSelectedDetails((prevDetails) => {
            const deleteSubcategoryAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) {
                    return []
                }
                if (path.length === 1) {
                    return subcategories.filter((_, index) => index !== path[0])
                }
                const [currentIndex, ...restOfPath] = path
                return subcategories.map((subcat, index) => {
                    if (index === currentIndex) {
                        return {
                            ...subcat,
                            subcategories: deleteSubcategoryAtPath(subcat.subcategories ?? [], restOfPath),
                        }
                    }
                    return subcat
                })
            }

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: deleteSubcategoryAtPath(prevDetails[identifier].subcategories, path),
                },
            }
        })
    }, [setSelectedDetails, identifier])


    const addValueToSubcategory = useCallback((path: number[], newValue: string) => {
        setSelectedDetails((prevDetails) => {
            const updateValuesAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) {
                    return subcategories
                } else {
                    const newPath = [...path]
                    const indexToAddValue = newPath.pop()
                    return subcategories.map((subcat, index) => {
                        if (index === indexToAddValue) {
                            return { ...subcat, values: [...subcat.values || [], newValue] }
                        } else if (newPath.length > 0 && index === newPath[0]) {
                            return { ...subcat, subcategories: updateValuesAtPath(subcat.subcategories || [], newPath.slice(1)) }
                        }
                        return subcat
                    })
                }
            }

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: updateValuesAtPath(prevDetails[identifier].subcategories, path),
                },
            }
        })
    }, [setSelectedDetails, identifier])

    const handleSubcategoryNameChange = useCallback((path: number[], newName: string) => {
        setSelectedDetails((prevDetails) => {
            const updateSubcategoryNameAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) {
                    return subcategories
                }
                const [currentIndex, ...restOfPath] = path
                return subcategories.map((subcat, index) => {
                    if (index === currentIndex) {
                        if (restOfPath.length === 0) {
                            return { ...subcat, name: newName }
                        } else {
                            return {
                                ...subcat,
                                subcategories: updateSubcategoryNameAtPath(subcat.subcategories ?? [], restOfPath),
                            }
                        }
                    }
                    return subcat
                })
            }

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: updateSubcategoryNameAtPath(prevDetails[identifier].subcategories ?? [], path),
                },
            }
        })
    }, [setSelectedDetails, identifier])

    return (
        <div>
            {selectedDetails[identifier]?.subcategories && (
                <RecursiveSubcategory
                    subcategories={selectedDetails[identifier].subcategories}
                    addSubcategory={addSubcategory}
                    addValueToSubcategory={addValueToSubcategory}
                    deleteSubcategory={deleteSubcategory}
                    path={[]}
                    handleSubcategoryNameChange={handleSubcategoryNameChange}
                />
            )}
        </div>
    )
}

const RecursiveSubcategory: React.FC<RecursiveSubcategoryProps> = ({
                                                                       subcategories,
                                                                       addSubcategory,
                                                                       addValueToSubcategory,
                                                                       deleteSubcategory,
                                                                       path = [],
                                                                       handleSubcategoryNameChange,
                                                                   }) => {
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [editingName, setEditingName] = useState("")

    const startEditing = (index: number, name: string) => {
        setIsEditing(index)
        setEditingName(name)
    }

    const stopEditing = (index: number) => {
        if (isEditing !== null) {
            handleSubcategoryNameChange([...path, index], editingName)
            setIsEditing(null)
            setEditingName("")
        }
    }

    return (
        <span style={{ marginLeft: `${path.length * 16}px` }}>
            {subcategories.map((subcat, index) => (
                <div key={index} className="flex flex-col h-full ">
                    <div className="flex flex-col border-l-2 border-gray-300">
                        <div className="flex relative w-full h-full">
                            <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
                        </div>


                        <div className="flex flex-row items-center">
                            <hr className={`border-t-2 border-gray-300 dark:border-gray-700 w-8 ${
                                subcat.subcategories && subcat.subcategories.length > 0 ? "self-start mt-6" : "self-center"
                            }`} />
                            <div className="flex flex-col">

                                <div className="flex flex-row">
                                    {isEditing === index ? (
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onBlur={() => stopEditing(index)}
                                            autoFocus
                                            className="border border-gray-300 rounded-md px-2 py-1 shadow-md mt-4 w-fit"
                                        />
                                    ) : (
                                        <div
                                            className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-4 w-fit"
                                            onDoubleClick={() => startEditing(index, subcat.name)}>
                                            <p className="w-fit">{subcat.name || "Nowa kategoria"}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-row items-center justify-center mt-4">
                                        <button
                                            type="button"
                                            className="w-fit p-2 border-gray-300 shadow-md h-fit ml-2"
                                            onClick={() => addSubcategory([...path, index])}>
                                            <PlusIcon />
                                        </button>
                                        <button
                                            type="button"
                                            className="w-fit p-2 border-gray-300 shadow-md h-fit ml-1"
                                            onClick={() => deleteSubcategory([...path, index])}>
                                            <MinusIcon />
                                        </button>
                                    </div>
                                </div>

                                {subcat.subcategories && subcat.subcategories.length > 0 && (
                                    <RecursiveSubcategory
                                        subcategories={subcat.subcategories}
                                        addSubcategory={addSubcategory}
                                        addValueToSubcategory={addValueToSubcategory}
                                        deleteSubcategory={deleteSubcategory}
                                        path={[...path, index]}
                                        handleSubcategoryNameChange={handleSubcategoryNameChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </span>
    )
}

export default SubcategoryList