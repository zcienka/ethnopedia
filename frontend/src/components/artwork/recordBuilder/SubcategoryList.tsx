import React, { FC, useCallback, useState } from "react"
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

interface RecursiveSubcategoryProps {
    subcategories: Subcategory[];
    addSubcategory: (path: number[]) => void;
    addValueToSubcategory: (path: number[], newValue: string, index?: number) => void;
    deleteSubcategory: (path: number[]) => void;
    path?: number[];
    handleSubcategoryNameChange: (path: number[], newName: string) => void;
    toggleDropdown: (path: number[]) => void;
    isDropdownVisible: (path: number[]) => boolean;
    addDropdownOption: (path: number[], newOption: string) => void;
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
                            return {
                                ...subcat,
                                subcategories: updateValuesAtPath(subcat.subcategories || [], newPath.slice(1)),
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

    const [activeDropdownPath, setActiveDropdownPath] = useState<number[]>([])

    const toggleDropdown = useCallback((path: number[]) => {
        setActiveDropdownPath(prev => (
            JSON.stringify(prev) === JSON.stringify(path) ? [] : path
        ))
    }, [])

    const isDropdownVisible = useCallback((path: number[]) => (
        JSON.stringify(activeDropdownPath) === JSON.stringify(path)
    ), [activeDropdownPath])

    const addDropdownOption = useCallback(
        (path: number[], newOption: string) => {
            setSelectedDetails((prevDetails) => {
                const updateValuesAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                    if (path.length === 1) {
                        return subcategories.map((subcat, index) => {
                            if (index === path[0]) {
                                const newValues = subcat.values ? [...subcat.values, newOption] : [newOption]
                                return { ...subcat, values: newValues }
                            }
                            return subcat
                        })
                    } else {
                        const [currentIndex, ...restOfPath] = path
                        return subcategories.map((subcat, index) => {
                            if (index === currentIndex) {
                                return {
                                    ...subcat,
                                    subcategories: updateValuesAtPath(subcat.subcategories ?? [], restOfPath),
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
                        subcategories: updateValuesAtPath(prevDetails[identifier].subcategories ?? [], path),
                    },
                }
            })
        },
        [setSelectedDetails, identifier],
    )

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
                    toggleDropdown={toggleDropdown}
                    isDropdownVisible={isDropdownVisible}
                    addDropdownOption={addDropdownOption}
                />
            )}
        </div>
    )
}

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newValues: string[]) => void;
    initialValues: string[];
}

const RenameModal: FC<RenameModalProps> = ({ isOpen, onClose, onSubmit, initialValues }) => {
    const [values, setValues] = useState<string[]>(initialValues)

    const handleChange = (index: number, newValue: string) => {
        const updatedValues = values.map((value, idx) => idx === index ? newValue : value)
        setValues(updatedValues)
    }

    const handleSubmit = () => {
        onSubmit(values)
        onClose()
    }


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-4">
                {initialValues.map((value, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={values[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="border p-2 m-2"
                        >
                        </input>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleSubmit}>Submit</button>
                <button
                    type="button"
                    onClick={onClose} className="border p-2 m-2">
                    Cancel
                </button>
            </div>
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
                                                                       toggleDropdown,
                                                                       isDropdownVisible,
                                                                       addDropdownOption,
                                                                   }) => {

    const [editingValues, setEditingValues] = useState<string[]>([])
    const [renameModalOpen, setRenameModalOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState<number[]>([])
    const [renameModal, setRenameModal] = useState<{
        isOpen: boolean;
        initialValues: string[];
        path: number[];
    }>({ isOpen: false, initialValues: [], path: [] })

    const openRenameModal = (path: number[], values: string[]) => {
        setEditingValues(values)
        setCurrentPath(path)
        setRenameModalOpen(true)
    }

    const handleRenameSubmit = (newValues: string[]) => {
        newValues.forEach(newValue => {
            addValueToSubcategory(renameModal.path, newValue)
        })
        setRenameModal({ isOpen: false, initialValues: [], path: [] })
    }



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
    {subcategories.map((subcat, index) => {
        const currentPath = [...path, index]
        return (
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
                                        onDoubleClick={() => startEditing(index, subcat.name)}
                                    >
                                        <p className="w-fit">{subcat.name || "Nowa kategoria"}</p>
                                    </div>
                                )}
                                <div className="flex flex-row items-center justify-center mt-4">
                                    <button
                                        type="button"
                                        className="w-fit p-2 border-gray-300 shadow-md h-fit ml-2"
                                        onClick={() => addSubcategory(currentPath)}
                                    >
                                        <PlusIcon />
                                    </button>
                                    <button
                                        type="button"
                                        className="w-fit p-2 border-gray-300 shadow-md h-fit ml-1"
                                        onClick={() => deleteSubcategory(currentPath)}
                                    >
                                        <MinusIcon />
                                    </button>
                                    <select
                                        // onChange={(e) => openRenameModal(currentPath, subcat.values)}
                                    >
                                        {subcat.values?.map((value, valueIndex) => (
                                            <option key={valueIndex} value={value}>{value}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => addDropdownOption(currentPath, `Option ${currentPath.join("-")}-${subcat.values?.length || 0}`)}
                                    >
                                        Add Dropdown Option
                                    </button>

                                    <button onClick={() => openRenameModal([...path, index], subcat.values || [])}>Edit
                                        Values
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
                                    toggleDropdown={toggleDropdown}
                                    isDropdownVisible={isDropdownVisible}
                                    addDropdownOption={addDropdownOption}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    })}
            <RenameModal
                isOpen={renameModalOpen}
                onClose={() => setRenameModalOpen(false)}
                onSubmit={handleRenameSubmit}
                initialValues={editingValues}
            />
        </span>
    )
}

export default SubcategoryList