import React, { useState } from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import SubcategoryComponent from "./SubcategoryComponent"

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

    const [localEditingState, setLocalEditingState] = useState<EditingState>({
        isEditing: false,
        editingIndex: null,
        editValue: "",
    })

    const handleLocalDoubleClick = (index: number | null, name: string) => {
        setLocalEditingState({
            isEditing: true,
            editingIndex: index,
            editValue: name,
        })
    }

    const handleAddNestedValue = (subcatIndex: number) => {
        const newSubcategories = subcategories.map((subcat, index) => {
            if (index === subcatIndex) {
                return {
                    ...subcat,
                    values: [...(subcat.values || []), "New Nested Value"],
                }
            }
            return subcat
        })
    }

    return (
        <>
            {subcategories.length !== 0 && subcategories?.map((subcatDetail, subcatIndex) => (
                <div className="flex flex-row w-full">
                    <div className="w-full">
                        <div className="flex flex-col w-full">
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
                                                className="border-none h-fit"
                                                value={editingState.editValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoFocus
                                            ></textarea>
                                    </div>
                                ) : (
                                    <div>
                                        <div onDoubleClick={() => handleDoubleClick(subcatIndex, subcatDetail.name)}
                                             className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-1 shadow-md mt-2">
                                            <p className="w-full">{subcatDetail.name == "" ? "Wybierz podkategorię" : subcatDetail.name}</p>
                                        </div>
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

                            <button type="button"
                                    onClick={() => handleAddNestedValue(subcatIndex)}
                                    className="ml-2">
                                Add Nested Value
                            </button>

                            <div className="flex flex-row w-full h-full">
                                <div className="flex relative">
                                    <span className="justify-start absolute bg-gray-300 h-full w-0.5"></span>
                                </div>
                                {/*<div className="ml-8">*/}
                                {/*    <SubcategoryComponent*/}
                                {/*        subcatIndex={subcatIndex}*/}
                                {/*        subcatDetail={subcatDetail}*/}
                                {/*        editingState={localEditingState}*/}
                                {/*        handleChange={handleChange}*/}
                                {/*        handleBlur={handleBlur}*/}
                                {/*        inputRef={inputRef}*/}
                                {/*        handleDoubleClick={handleLocalDoubleClick}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
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
    )
}

export default SubcategoryList
