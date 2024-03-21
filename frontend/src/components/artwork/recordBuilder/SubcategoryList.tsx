import React, {useCallback, useState} from "react"
import {ReactComponent as MinusIcon} from "../../../assets/icons/minus.svg"
import {ReactComponent as PlusIcon} from "../../../assets/icons/plus.svg"
import ValueDropdown from "./ValueDropdown"
import {
    ModalState,
    RecursiveSubcategoryProps,
    Subcategory,
    SubcategoryListProps,
    SubcategoryValue,
} from "../types/ArtworkTypes"


const SubcategoryList: React.FC<SubcategoryListProps> = ({
                                                             identifier,
                                                             selectedDetail,
                                                             selectedDetails,
                                                             setSelectedDetails,
                                                         }) => {

    const [values, setValues] = useState<SubcategoryValue[]>([])

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
                if (path.length === 1) {
                    return subcategories.map((subcat, index) => {
                        if (index === path[0]) {
                            const nextIndex = subcat.values?.length ? Math.max(...subcat.values.map(v => v.index)) + 1 : 0
                            const nextRow = subcat.values?.length ? Math.max(...subcat.values.map(v => v.row)) + 1 : 1 // Start row numbers at 1
                            const updatedValues = subcat.values ? [...subcat.values, {index: nextIndex, value: newValue, row: nextRow}] : [{index: 0, value: newValue, row: nextRow}]
                            return {...subcat, values: updatedValues}
                        }
                        return subcat
                    })
                } else {
                    const newPath = [...path]
                    const index = newPath.shift()
                    if (index !== undefined) {
                        return subcategories.map((subcat, subIndex) => {
                            if (subIndex === index) {
                                return {
                                    ...subcat,
                                    subcategories: updateValuesAtPath(subcat.subcategories || [], newPath),
                                }
                            }
                            return subcat
                        })
                    }
                }
                return subcategories
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
                            return {...subcat, name: newName}
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

    const addDropdownOption = useCallback((path: number[], option: string, index: number, row: number) => {
            setSelectedDetails((prevDetails) => {
                const newDetails = {...prevDetails}
                let currentSubcategories = newDetails[identifier].subcategories

                const newPath = [...path]

                while (newPath.length > 1) {
                    const nextIndex = newPath.shift()
                    if (typeof nextIndex !== "undefined")
                        currentSubcategories = currentSubcategories[nextIndex].subcategories || []
                }

                if (currentSubcategories && newPath.length === 1) {
                    const targetIndex = newPath[0]
                    const targetSubcategory = currentSubcategories[targetIndex]
                    const newOption: SubcategoryValue = {index: index + 1, value: option, row: row + 1};

                    const updatedValues = [...(targetSubcategory.values || []), newOption]

                    currentSubcategories[targetIndex] = {
                        ...targetSubcategory,
                        values: updatedValues,
                    }

                    setValues(updatedValues)
                }

                return newDetails
            })
            const newOption: SubcategoryValue = {index: index + 1, value: option, row: row + 1};

            setValues(prevValues => [...prevValues, newOption])
        },
        [setSelectedDetails, identifier, setValues],
    )


    const replaceValuesInSubcategory = useCallback((path: number[], newValues: string[]) => {
        setSelectedDetails(prevDetails => {
            const updateSubcategories = (subcategories: Subcategory[], pathIndex: number): Subcategory[] => {
                if (pathIndex >= path.length) return subcategories;

                const newSubcategories = [...subcategories];

                if (pathIndex === path.length - 1) {
                    const targetSubcategory = newSubcategories[path[pathIndex]];

                    const convertedNewValues = newValues.map((value, index) => ({
                        index,
                        value,
                        row: index + 1
                    }))

                    newSubcategories[path[pathIndex]] = {
                        ...targetSubcategory,
                        values: convertedNewValues,
                    }
                } else {
                    const targetSubcategory = newSubcategories[path[pathIndex]];
                    newSubcategories[path[pathIndex]] = {
                        ...targetSubcategory,
                        subcategories: updateSubcategories(targetSubcategory.subcategories || [], pathIndex + 1),
                    };
                }

                return newSubcategories;
            };

            return {
                ...prevDetails,
                [identifier]: {
                    ...prevDetails[identifier],
                    subcategories: updateSubcategories(prevDetails[identifier].subcategories, 0),
                },
            }
        })
    }, [setSelectedDetails, identifier]);

    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        data: {
            values: [{ index: 0, value: "", row: 0 }] as SubcategoryValue[],
            path: [],
            index: -1,
        },
    })

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
                    replaceValuesInSubcategory={replaceValuesInSubcategory}
                    values={values}
                    setValues={setValues}
                    modalState={modalState}
                    setModalState={setModalState}
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
                                                                       toggleDropdown,
                                                                       isDropdownVisible,
                                                                       addDropdownOption,
                                                                       replaceValuesInSubcategory,
                                                                       values,
                                                                       setValues,
                                                                       onOpenRenameModal,
                                                                       modalState,
                                                                       setModalState,
                                                                   }) => {

    const [currentPath, setCurrentPath] = useState<number[]>([])
    const [renameModal, setRenameModal] = useState<{
        isOpen: boolean;
        initialValues: string[];
        path: number[];
    }>({isOpen: false, initialValues: [], path: []})


    const openRenameModal = useCallback((path: number[], values: SubcategoryValue[], index: number) => {
        setValues(values);
        setCurrentPath(path);
        setModalState({
            isOpen: true,
            data: {values, path, index},
        });
    }, [setValues, setCurrentPath, setModalState]);


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

    const handleDeleteValues = (path: number[]) => {
        replaceValuesInSubcategory(path, [])
        setRenameModal({isOpen: false, initialValues: [], path: []})
    }

    const handleRenameSubmit = (path: number[], newValues: string[]) => {
        newValues.forEach(newValue => {
            addValueToSubcategory(path, newValue)
        })

        setModalState(prev => ({
            ...prev,
            isOpen: true,
        }))

        replaceValuesInSubcategory(path, newValues)
        setRenameModal({isOpen: false, initialValues: [], path: []})
    }

    const closeModal = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            isOpen: false,
        }))
    }, [setModalState])

    return (
        <div style={{marginLeft: `${path.length * 16}px`}}>
            {subcategories.map((subcat, index) => {
                const currentPath = [...path, index]

                return (
                    <div key={index} className="flex flex-col h-full">
                        <div className="flex flex-col border-l-4 border-gray-300">

                            <div className="flex flex-row items-center">
                                <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-8 self-start mt-8"/>
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            <div className="flex flex-row mt-4">
                                                {isEditing === index ? (
                                                    <input
                                                        type="text"
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        onBlur={() => stopEditing(index)}
                                                        autoFocus
                                                        className="border border-gray-300 rounded-md px-2 py-1 shadow-md w-fit"
                                                    />
                                                ) : (
                                                    <div
                                                        className="flex items-center border border-gray-300
                                                        rounded-md px-2 py-1 shadow-md w-fit"
                                                        onDoubleClick={() => startEditing(index, subcat.name)}>
                                                        <p className="w-fit">{subcat.name || "Nowa kategoria"}</p>
                                                    </div>
                                                )}
                                                <div className="flex flex-row items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="w-fit p-2 border-gray-300 shadow-md ml-2"
                                                        onClick={() => addSubcategory(currentPath)}
                                                    >
                                                        <PlusIcon/>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="w-fit p-2 border-gray-300 shadow-md ml-1"
                                                        onClick={() => deleteSubcategory(currentPath)}
                                                    >
                                                        <MinusIcon/>
                                                    </button>

                                                    {subcat.name !== "" && subcat.values?.length === 0 &&
                                                        <button
                                                            type="button"
                                                            onClick={() => addValueToSubcategory(currentPath, "")}
                                                            className="ml-2">
                                                            Utwórz opcję
                                                        </button>
                                                    }
                                                </div>
                                            </div>

                                            {subcat.name !== "" && <ValueDropdown
                                                subcategoryName={subcat.name}
                                                values={subcat.values || []}
                                                path={currentPath}
                                                index={index}
                                                openRenameModal={openRenameModal}
                                                handleDeleteValues={handleDeleteValues}
                                                addValueToSubcategory={addValueToSubcategory}
                                                replaceValuesInSubcategory={replaceValuesInSubcategory}
                                                // renameModalOpen={renameModalOpen}
                                                onSubmit={handleRenameSubmit}
                                                closeModal={closeModal}
                                                modalState={modalState}/>}
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
                                            replaceValuesInSubcategory={replaceValuesInSubcategory}
                                            values={values}
                                            setValues={setValues}
                                            modalState={modalState}
                                            setModalState={setModalState}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {index === subcategories.length - 1 &&
                            <div className="flex flex-row w-full">
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row items-center">
                                        <span className="border-l-4 border-gray-300 h-1/2 flex self-start"></span>
                                        <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-8 self-center -ml-0.5"/>

                                        <div className="flex items-center flex-row">
                                            <button
                                                className="p-2 border-gray-300 shadow-md"
                                                onClick={() => addSubcategory(path)}
                                                type="button">
                                                <PlusIcon/>
                                            </button>
                                        </div>

                                        <div className="flex items-center flex-row pt-4 h-12">
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                )
            })}
        </div>
    )
}

export default SubcategoryList