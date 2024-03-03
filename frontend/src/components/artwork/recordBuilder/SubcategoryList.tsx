import React from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"

interface Subcategory {
    name: string;
    values?: string[];
}

interface EditingState {
    isEditing: boolean;
    editingIndex: number | null;
    editValue: string;
}


interface SubcategoryListProps {
    identifier: string;
    subcategories: Subcategory[];
    editingState: EditingState;
    handleDoubleClick: (index: number, name: string) => void;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleBlur: () => void;
    deleteSubcategory: (identifier: string, index: number) => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    handleSubcategoryChange: (identifier: string, index: number, value: string) => void;
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({
                                                             identifier,
                                                             subcategories,
                                                             editingState,
                                                             handleDoubleClick,
                                                             handleChange,
                                                             handleBlur,
                                                             deleteSubcategory,
                                                             inputRef,
                                                             handleSubcategoryChange,
                                                         }) => {
    return (
        <>
            {subcategories.length !== 0 && subcategories?.map((subcatDetail, subcatIndex) => (
                <div className="flex flex-row w-full">
                    <div className="w-full">
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row w-full">
                                <div className="flex relative">
                                    <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
                                </div>

                                <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center min-w-8" />

                                {editingState.isEditing && editingState.editingIndex === subcatIndex ? (
                                    <div
                                        className="flex flex-row items-center w-fit border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
                                            <textarea
                                                ref={inputRef}
                                                className="border-none h-fit w-96"
                                                value={editingState.editValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoFocus
                                            ></textarea>
                                    </div>
                                ) : (
                                    <div onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}
                                         className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
                                        <p className="w-full">{subcatDetail.name == "" ? "Wybierz podkategorię" : subcatDetail.name}</p>
                                    </div>
                                )}
                                <div className="items-center flex">
                                    <button type="button"
                                            className="p-2 border-gray-300 shadow-md ml-2 mt-1"
                                            onClick={() => deleteSubcategory(identifier, subcatIndex)}>
                                        <MinusIcon />
                                    </button>
                                </div>
                            </div>

                            {/*<AddNewSubcategory />*/}

                        </div>

                        {subcatDetail.values?.length !== 0 &&
                            <div className="flex flex-row">
                                <div className="flex relative">
                                    <span className="justify-start bg-gray-300 h-full w-0.5"></span>
                                </div>

                                <select
                                    className="border border-gray-300 rounded-md px-2 py-1 mt-2 ml-8"
                                    onChange={e =>
                                        handleSubcategoryChange(identifier, subcatIndex, e.target.value)}>
                                    {subcatDetail.values?.map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        }
                    </div>

                </div>
            ))}
        </>


        // <div className="flex flex-row w-full">
        //     <div className="flex relative">
        //         <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
        //     </div>
        //
        //     <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center min-w-8" />
        //
        //     {editingState.isEditing && editingState.editingIndex === subcatIndex ? (
        //         <div
        //             className="flex flex-row items-center w-fit border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
        //                                     <textarea
        //                                         ref={inputRef}
        //                                         className="border-none h-fit w-96"
        //                                         value={editingState.editValue}
        //                                         onChange={handleChange}
        //                                         onBlur={handleBlur}
        //                                         autoFocus
        //                                     ></textarea>
        //         </div>
        //     ) : (
        //         <div onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}
        //              className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
        //             <p className="w-full">{subcatDetail.name == "" ? "Wybierz podkategorię" : subcatDetail.name}</p>
        //         </div>
        //     )}
        //     <div className="items-center flex">
        //         <button type="button"
        //                 className="p-2 border-gray-300 shadow-md ml-2 mt-1"
        //                 onClick={() => deleteSubcategory(identifier, subcatIndex)}>
        //             <MinusIcon />
        //         </button>
        //     </div>
        // </div>


        // <div className="flex flex-col w-full">
        //     {subcategories.map((subcatDetail, subcatIndex) => (
        //         <div key={subcatIndex} className="flex flex-row w-full items-center my-2">
        //             <div className="flex relative">
        //                 <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
        //             </div>
        //             <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center min-w-8" />
        //             {editingState.isEditing && editingState.editingIndex === subcatIndex ? (
        //                 <textarea
        //                     ref={inputRef}
        //                     className="border-none h-fit w-full px-2 py-1"
        //                     value={editingState.editValue}
        //                     onChange={handleChange}
        //                     onBlur={handleBlur}
        //                     autoFocus
        //                 />
        //             ) : (
        //                 <div
        //                     className="flex-1 px-2 py-1 border border-gray-300 rounded-md shadow-md"
        //                     onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}
        //                 >
        //                     {subcatDetail.name || "Wybierz podkategorię"}
        //                 </div>
        //             )}
        //             <button
        //                 type="button"
        //                 className="p-2 border-gray-300 shadow-md ml-2"
        //                 onClick={() => deleteSubcategory(identifier, subcatIndex)}
        //             >
        //                 <MinusIcon className="h-5 w-5" />
        //             </button>
        //         </div>
        //     ))}
        // </div>
    )
}

export default SubcategoryList
