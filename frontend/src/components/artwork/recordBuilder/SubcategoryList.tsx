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

interface MainCategory {
    name: string
    values?: string[]
    subcategories?: NestedSubcategory[]
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
}

// const SubcategoryList: React.FC<SubcategoryListProps> = ({
//                                                              identifier,
//                                                              subcategories,
//                                                              selectedDetail,
//                                                              setSelectedDetail,
//                                                              editingState,
//                                                              handleDoubleClick,
//                                                              handleChange,
//                                                              handleBlur,
//                                                              deleteSubcategory,
//                                                              inputRef,
//                                                              handleSubcategoryChange,
//                                                              setEditingState,
//                                                          }) => {
//
//     const [localEditingState, setLocalEditingState] = useState<EditingState>({
//         isEditing: false,
//         editingIndex: null,
//         editValue: "",
//     })
//
//     const [localSubcategories, setLocalSubcategories] = useState<SubcategoriesMap>({})    // useEffect(() => {
//
//     console.log({ localSubcategories })
//     const handleLocalDoubleClick = (index: number | null, name: string) => {
//         setLocalEditingState({
//             isEditing: true,
//             editingIndex: index,
//             editValue: name,
//         })
//     }
//
//     const addSubcategory = useCallback((path: number[]) => {
//         const newSubcategory: Subcategory = {
//             name: "New Subcategory",
//             values: [],
//             subcategories: [],
//         }
//
//         setSelectedDetail((prevDetails) => {
//             const updatedDetails = { ...prevDetails }
//             let currentLevel = updatedDetails[identifier].subcategories
//
//             for (let i = 0; i < path.length; i++) {
//                 if (i === path.length - 1) {
//                     let subcategories = currentLevel[path[i]].subcategories || []
//                     subcategories.push(newSubcategory)
//                     currentLevel[path[i]].subcategories = subcategories
//                 } else {
//                     currentLevel = currentLevel[path[i]].subcategories!
//                 }
//             }
//
//             if (path.length === 0) {
//                 updatedDetails[identifier].subcategories.push(newSubcategory)
//             }
//
//             return updatedDetails
//         })
//     }, [setSelectedDetail, identifier])
//
//
// //     return (
// //         <div>
// //             <button onClick={() => addSubcategory([])}>Add Root Subcategory</button>
// //             {selectedDetail[identifier]?.subcategories && (
// //                 <RecursiveSubcategory
// //                     subcategories={selectedDetail[identifier].subcategories}
// //                     addSubcategory={addSubcategory}
// //                 />
// //             )}
// //         </div>
// //     );
// // };
//
//     // const handleAddNestedValue = (subcatIdentifier: number) => {
//     //     console.log({subcatIdentifier})
//     //
//     //     const newNestedSubcategory: NestedSubcategory = {
//     //         category: "categorycategorycategorycategorycategorycategory",
//     //         values: [],
//     //     }
//     //
//     //     setLocalSubcategories(prev => ({
//     //         ...prev,
//     //         [subcatIdentifier]: {
//     //             ...prev[subcatIdentifier],
//     //             subcategories: [...(prev[subcatIdentifier]?.subcategories || []), newNestedSubcategory],
//     //             values: [...(prev[subcatIdentifier]?.values || []), "asdasdasdsdas"],
//     //         },
//     //     }))
//     // }
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //     const handleAddNestedValue = (subcatIdentifier: number) => {
// //         setSelectedDetail(prevDetails => {
// //             const detailToUpdate = prevDetails[identifier]
// //             if (!detailToUpdate) return prevDetails
// //
// //             const updatedDetail = { ...detailToUpdate }
// //
// //             if (!updatedDetail.subcategories || updatedDetail.subcategories.length <= subcatIdentifier) return prevDetails
//
//             updatedDetail.subcategories = updatedDetail.subcategories.map((subcat, index) => {
//                 if (index === subcatIdentifier) {
//                     return {
//                         ...subcat,
//                         subcategories: [
//                             ...(subcat.subcategories || []),
//                             { name: "New Subcategory Name", values: [], subcategories: [] },
//                         ],
//                     }
//                 }
//                 return subcat
//             })
//
//             return { ...prevDetails, [identifier]: updatedDetail }
//         })
//     }

//
//     console.log({ localSubcategories })
//
//
//     return (
//         <>
//             {subcategories.length !== 0 && subcategories?.map((subcatDetail, subcatIndex) => (
//                 <div className="flex flex-row w-full">
//                     <div className="w-full">
//                         <div className="flex flex-col w-full">
//                             <div className="flex flex-row w-full">
//                                 <div className="flex relative">
//                                     <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
//                                 </div>
//                                 <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center min-w-8" />
//
//                                 {editingState.isEditing && editingState.editingIndex === subcatIndex ? (
//                                     <div
//                                         className="flex flex-row items-center w-fit border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
//                                             <textarea
//                                                 ref={inputRef}
//                                                 className="border-none h-fit"
//                                                 value={editingState.editValue}
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 autoFocus
//                                             ></textarea>
//                                     </div>
//                                 ) : (
//                                     <div>
//                                         <div onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}
//                                              className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
//                                             <p className="w-full">{subcatDetail.name == "" ? "Wybierz podkategorię" : subcatDetail.name}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div className="items-center flex">
//                                     <button type="button"
//                                             className="p-2 border-gray-300 shadow-md ml-2 mt-1"
//                                             onClick={() => deleteSubcategory(identifier, subcatIndex)}>
//                                         <MinusIcon />
//                                     </button>
//                                 </div>
//                             </div>
//
//
//                             <div className="flex flex-row w-full h-full">
//                                 <div className="flex relative">
//                                     <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
//                                 </div>
//
//                                 <div className="flex flex-col">
//                                     {/*{localSubcategories.map((subcat: NestedSubcategory, index: number) => (*/}
//                                     {/*    <div key={index} className="mb-4">*/}
//
//
//                                     {/*        <div*/}
//                                     {/*            className="ml-8">{subcat.category || "Unnamed Category"}</div>*/}
//                                     {/*        {subcat.values && subcat.values.length > 0 && (*/}
//
//                                     {/*        )}*/}
//                                     {/*    </div>*/}
//                                     {/*))}*/}
//                                 </div>
//                             </div>
//                         </div>
//
//                         <button type="button"
//                                 onClick={() => handleAddNestedValue(subcatIndex)}
//                                 className="ml-2">
//                             Add Nested Value
//                         </button>
//
//                         {subcatDetail.values?.length !== 0 &&
//                             <div className="flex flex-row">
//                                 <div className="flex relative">
//                                     <span className="justify-start bg-gray-300 h-full w-0.5"></span>
//                                 </div>
//
//                                 <select
//                                     className="border border-gray-300 rounded-md px-2 py-1 mt-2 ml-8"
//                                     onChange={e =>
//                                         handleSubcategoryChange(identifier, subcatIndex, e.target.value)}>
//                                     {subcatDetail.values?.map((value, index) => (
//                                         <option key={index} value={value}>{value}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         }
//                     </div>
//
//                 </div>
//             ))}
//         </>
//     )
// }
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
                    return [] // If path is empty, nothing to delete
                }
                if (path.length === 1) {
                    // We're at the target level, remove the subcategory
                    return subcategories.filter((_, index) => index !== path[0])
                }
                // Recursively navigate to the target subcategory
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

    return (
        <div>
            <button type="button" onClick={() => addSubcategory([])}>Add Root Subcategory</button>
            {selectedDetails[identifier]?.subcategories && (
                <RecursiveSubcategory
                    subcategories={selectedDetails[identifier].subcategories}
                    addSubcategory={addSubcategory}
                    addValueToSubcategory={addValueToSubcategory}
                    path={[]}
                    deleteSubcategory={deleteSubcategory}
                />
            )}


        </div>
    )
}

const RecursiveSubcategory: React.FC<RecursiveSubcategoryProps> = ({
                                                                       subcategories,
                                                                       addSubcategory,
                                                                       addValueToSubcategory,
                                                                       path = [],
                                                                       deleteSubcategory,
                                                                   }) => {

    console.log({ path })
    return (
        <span style={{ marginLeft: `${path.length * 16}px` }}>
            {subcategories.map((subcat, index) => (
                <div key={index}
                     className="flex flex-col h-full ">
                    <div className="flex flex-col border-l-2 border-gray-300">
                        <div className="flex relative w-full h-full">
                            <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
                        </div>
                        {/*<hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center min-w-8" />*/}

                        <div className="flex flex-row items-center">
                            <hr className={`border-t-2 border-gray-300 dark:border-gray-700 w-8 ${
                                subcat.subcategories && subcat.subcategories.length > 0 ? "self-start mt-6" : "self-top"
                            }`} />
                            <div className="flex flex-col">
                                <div
                                    className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1
                                shadow-md mt-2 w-fit">
                                    <p className="w-fit">
                                        {subcat.name == "" ? "Wybierz podkategorię" : subcat.name}
                                    </p>
                                </div>

                                {subcat.subcategories && subcat.subcategories.length > 0 && (
                                    <RecursiveSubcategory
                                        subcategories={subcat.subcategories}
                                        addSubcategory={addSubcategory}
                                        addValueToSubcategory={addValueToSubcategory}
                                        path={[...path, index]}
                                        deleteSubcategory={deleteSubcategory}
                                    />
                                )}
                            </div>
                            <div className="flex items-center flex-row pt-4 h-12">
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="bg-gray-300 h-1/2 flex self-start w-0.5"></span>

                        <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />

                        <div className="flex items-center flex-row">
                            <button
                                className="p-2 border-gray-300 shadow-md"
                                onClick={() => addSubcategory([...path, index])}
                                type="button">
                                <PlusIcon />
                            </button>
                        </div>

                        <button
                            className="p-2 border-gray-300 shadow-md"
                            onClick={() => deleteSubcategory([...path, index])}
                            type="button">
                            Delete
                        </button>
                        <div className="flex items-center flex-row pt-4 h-12">
                        </div>
                    </div>
                </div>
            ))}
        </span>
    )
}
export default SubcategoryList
