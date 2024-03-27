import React, { useCallback, useState } from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"
import ValueDropdown from "./ValueDropdown"
import {
    ModalState,
    RecursiveSubcategoryProps, SelectedDetail,
    Subcategory,
    SubcategoryListProps,
} from "../types/ArtworkTypes"
import Input from "../../Input"


const SubcategoryList: React.FC<SubcategoryListProps> = ({
                                                             identifier,
                                                             selectedDetails,
                                                             setSelectedDetails,
                                                         }) => {

    const [, setValues] = useState<string[]>([])

    const addSubcategory = useCallback((path: number[]) => {
        const newSubcategory: Subcategory = {
            label: "",
            values: [],
            subcategories: [],
            value: "",
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
                            return { ...subcat, values: [...subcat.values, newValue] }
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


    const handleSubcategoryLabelChange = useCallback((path: number[], newName: string) => {
        setSelectedDetails((prevDetails) => {
            const updatesubcategoryLabelAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) {
                    return subcategories
                }
                const [currentIndex, ...restOfPath] = path
                return subcategories.map((subcat, index) => {
                    if (index === currentIndex) {
                        if (restOfPath.length === 0) {
                            return { ...subcat, label: newName }
                        } else {
                            return {
                                ...subcat,
                                subcategories: updatesubcategoryLabelAtPath([{
                                    label: newName,
                                    values: subcat.values,
                                    subcategories: subcat.subcategories,
                                    value: subcat.value,
                                }] ?? [], restOfPath),
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
                    subcategories: updatesubcategoryLabelAtPath(prevDetails[identifier].subcategories ?? [], path),
                },
            }
        })
    }, [setSelectedDetails, identifier])


    const handleNameChange = useCallback((path: number[], newName: string) => {
        setSelectedDetails((prevDetails) => {
            const updateNameAtPath = (subcategories: Subcategory[], path: number[]): Subcategory[] => {
                if (path.length === 0) return subcategories

                const [currentIndex, ...restOfPath] = path
                return subcategories.map((subcat, index) => {
                    if (index === currentIndex) {
                        if (restOfPath.length === 0) {
                            return { ...subcat, name: newName }
                        } else {
                            return {
                                ...subcat,
                                subcategories: updateNameAtPath(subcat.subcategories ?? [], restOfPath),
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
                    subcategories: updateNameAtPath(prevDetails[identifier].subcategories, path),
                },
            }
        })
    }, [setSelectedDetails, identifier])


    const replaceValuesInSubcategory = useCallback((path: number[], newValues: string[]) => {
        setSelectedDetails(prevDetails => {
            const updateValues = (details: SelectedDetail, path: number[], newValues: string[]): SelectedDetail => {
                if (path.length === 0) {
                    return { ...details, values: newValues }
                }

                const updateSubcategories = (subcategories: Subcategory[], pathIndex: number): Subcategory[] => {
                    if (pathIndex >= path.length) return subcategories

                    return subcategories.map((subcat, index) => {
                        if (index === path[pathIndex]) {
                            if (pathIndex === path.length - 1) {
                                return { ...subcat, values: newValues }
                            } else {
                                return {
                                    ...subcat,
                                    subcategories: updateSubcategories(subcat.subcategories || [], pathIndex + 1),
                                }
                            }
                        }
                        return subcat
                    })
                }

                const updatedSubcategories = updateSubcategories(details.subcategories, 0)
                return { ...details, subcategories: updatedSubcategories }
            }

            const updatedDetail = updateValues(prevDetails[identifier], path, newValues)

            return {
                ...prevDetails,
                [identifier]: updatedDetail,
            }
        })
    }, [setSelectedDetails, identifier])

    const handleSetValueToSubcategory = useCallback((path: number[], newValue: string) => {
        setSelectedDetails((prevDetails: { [key: string]: SelectedDetail }) => {
            let newDetails: { [key: string]: SelectedDetail } = JSON.parse(JSON.stringify(prevDetails))

            const setValueAtPath = (subcategories: Subcategory[], path: number[], newValue: string): void => {
                if (path.length === 0) return

                const [currentIndex, ...restOfPath] = path

                if (restOfPath.length === 0) {
                    subcategories[currentIndex].value = newValue
                } else {
                    setValueAtPath(subcategories[currentIndex].subcategories || [], restOfPath, newValue)
                }
            }

            setValueAtPath(newDetails[identifier].subcategories || [], path, newValue)

            return newDetails
        })
    }, [setSelectedDetails, identifier])

    const handleDeleteValueInSubcategory = useCallback((path: number[]) => {
        setSelectedDetails((prevDetails: { [key: string]: SelectedDetail }) => {
            let newDetails: { [key: string]: SelectedDetail } = JSON.parse(JSON.stringify(prevDetails))

            const deleteValueAtPath = (subcategories: Subcategory[], path: number[]): void => {
                if (path.length === 0) return

                const [currentIndex, ...restOfPath] = path

                if (restOfPath.length === 0) {
                    subcategories[currentIndex].value = ""
                } else {
                    deleteValueAtPath(subcategories[currentIndex].subcategories || [], restOfPath)
                }
            }

            deleteValueAtPath(newDetails[identifier].subcategories || [], path)

            return newDetails
        })
    }, [setSelectedDetails, identifier])


    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        data: {
            values: [""],
            path: [],
            index: -1,
        },
    })

    const [inputVisibility, setInputVisibility] = useState<{ [key: string]: boolean }>({})

    return (
        <div>
            {selectedDetails[identifier]?.subcategories && (
                <RecursiveSubcategory
                    subcategories={selectedDetails[identifier].subcategories}
                    addSubcategory={addSubcategory}
                    addValueToSubcategory={addValueToSubcategory}
                    deleteSubcategory={deleteSubcategory}
                    path={[]}
                    handleSubcategoryLabelChange={handleSubcategoryLabelChange}
                    replaceValuesInSubcategory={replaceValuesInSubcategory}
                    values={selectedDetails[identifier].values}
                    identifier={identifier}
                    setValues={setValues}
                    modalState={modalState}
                    setModalState={setModalState}
                    handleNameChange={handleNameChange}
                    inputVisibility={inputVisibility}
                    setInputVisibility={setInputVisibility}
                    setValueToSubcategory={handleSetValueToSubcategory}
                    handleDeleteValueInSubcategory={handleDeleteValueInSubcategory}
                />
            )}
        </div>
    )
}

const RecursiveSubcategory: React.FC<RecursiveSubcategoryProps> = ({
                                                                       identifier,
                                                                       subcategories,
                                                                       addSubcategory,
                                                                       addValueToSubcategory,
                                                                       deleteSubcategory,
                                                                       path = [],
                                                                       handleSubcategoryLabelChange,
                                                                       replaceValuesInSubcategory,
                                                                       values,
                                                                       setValues,
                                                                       modalState,
                                                                       setModalState,
                                                                       handleNameChange,
                                                                       inputVisibility,
                                                                       setInputVisibility,
                                                                       setValueToSubcategory,
                                                                       handleDeleteValueInSubcategory,
                                                                   }) => {

    const [currentPath, setCurrentPath] = useState<number[]>([])

    const openRenameModal = useCallback((path: number[], values: string[], index: number) => {
        setValues(values)
        setCurrentPath(path)
        setModalState({
            isOpen: true,
            data: { values, path, index },
        })
    }, [setValues, setCurrentPath, setModalState])


    const [isEditing, setIsEditing] = useState<number | null>(null)
    const [editingName, setEditingName] = useState("")

    const startEditing = (index: number, name: string) => {
        setIsEditing(index)
        setEditingName(name)
    }
    const stopEditing = (index: number) => {
        if (isEditing !== null) {
            handleSubcategoryLabelChange([...path, index], editingName)
            setIsEditing(null)
            setEditingName("")
        }
    }

    const handleDeleteValues = (path: number[]) => {
        replaceValuesInSubcategory(path, [])
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
    }

    const closeModal = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            isOpen: false,
        }))
    }, [setModalState])

    return (
        <div>
            {values && (
                <ValueDropdown
                    values={values}
                    path={currentPath}
                    index={identifier}
                    openRenameModal={openRenameModal}
                    handleDeleteValues={handleDeleteValues}
                    onSubmit={handleRenameSubmit}
                    closeModal={closeModal}
                    modalState={modalState}
                />
            )}

            {subcategories && subcategories.map((subcat, index) => {
                const currentPath = [...path, index]

                return (
                    <div key={index} className="flex flex-col h-full">
                        <div className="flex flex-col border-l-4 border-gray-300">
                            <div className="flex flex-row items-center">
                                <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-16 self-start mt-8" />

                                <div className="flex flex-col mt-2">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            <div className="flex flex-row h-fit">

                                                <div
                                                    className="border border-gray-300 flex flex-row px-2 py-2 rounded-lg bg-gray-50">
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
                                                            onClick={() => startEditing(index, subcat.label!)}>
                                                            <p className="w-fit">
                                                                {subcat.label || "Nowa kategoria"}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {inputVisibility[`${path}-${index}`] ? (
                                                        <span className="flex flex-row ml-2 h-fit w-fit rounded-xl items-center">
                                                        <Input
                                                            inputValue={subcat!.value ?? ""}
                                                            onInputChange={(newValue) => setValueToSubcategory([...path, index], newValue)}
                                                        />
                                                               <button
                                                                   type="button"
                                                                   onClick={() => {
                                                                       handleDeleteValueInSubcategory([...path, index]);
                                                                       setInputVisibility(prev => ({ ...prev, [`${path}-${index}`]: false }));
                                                                   }}
                                                                   className="ml-2 shadow-md w-fit p-2 h-fit">
                                                                <MinusIcon />
                                                            </button>
                                                    </span>
                                                    ) : (
                                                        <button
                                                            className="p-2 ml-2 shadow-md"
                                                            type="button"
                                                            onClick={() => setInputVisibility(prev => ({
                                                                ...prev,
                                                                [`${path}-${index}`]: true,
                                                            }))}>
                                                            <PlusIcon />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex flex-row items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="w-fit p-2 border-gray-300 shadow-md ml-1"
                                                        onClick={() => deleteSubcategory(currentPath)}
                                                    >
                                                        <MinusIcon />
                                                    </button>

                                                    {subcat.label !== "" && subcat.values?.length === 0 &&
                                                        <button
                                                            type="button"
                                                            onClick={() => addValueToSubcategory(currentPath, "")}
                                                            className="ml-2">
                                                            Utwórz listę
                                                        </button>
                                                    }

                                                </div>
                                            </div>

                                            {subcat.label !== "" && <ValueDropdown
                                                values={subcat.values || []}
                                                path={currentPath}
                                                index={index}
                                                openRenameModal={openRenameModal}
                                                handleDeleteValues={handleDeleteValues}
                                                onSubmit={handleRenameSubmit}
                                                closeModal={closeModal}
                                                modalState={modalState} />}
                                        </div>
                                    </div>
                                    {subcat.subcategories && subcat.subcategories.length > 0 && (
                                        <RecursiveSubcategory
                                            identifier={identifier}
                                            subcategories={subcat.subcategories}
                                            addSubcategory={addSubcategory}
                                            addValueToSubcategory={addValueToSubcategory}
                                            deleteSubcategory={deleteSubcategory}
                                            path={[...path, index]}
                                            handleSubcategoryLabelChange={handleSubcategoryLabelChange}
                                            replaceValuesInSubcategory={replaceValuesInSubcategory}
                                            values={values}
                                            setValues={setValues}
                                            modalState={modalState}
                                            setModalState={setModalState}
                                            handleNameChange={handleNameChange}
                                            inputVisibility={inputVisibility}
                                            setInputVisibility={setInputVisibility}
                                            setValueToSubcategory={setValueToSubcategory}
                                            handleDeleteValueInSubcategory={handleDeleteValueInSubcategory}
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
                                        <hr className="border-t-4 border-gray-300 dark:border-gray-700 w-8 self-center -ml-0.5" />

                                        <div className="flex items-center flex-row">
                                            <button
                                                className="p-2 border-gray-300 shadow-md"
                                                onClick={() => addSubcategory(path)}
                                                type="button">
                                                <PlusIcon />
                                            </button>
                                        </div>

                                        <div className="flex items-center flex-row pt-4 h-12">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default SubcategoryList