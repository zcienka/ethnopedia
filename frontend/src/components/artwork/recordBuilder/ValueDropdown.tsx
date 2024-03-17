import React from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"
import RenameModal from "./RenameModal"

interface ValueDropdownProps {
    subcategoryName: string;
    values: string[];
    path: number[];
    index: number;
    openRenameModal: (path: number[], values: string[]) => void;
    handleDeleteValues: (path: number[]) => void;
    addValueToSubcategory: (path: number[], newValue: string) => void;
    replaceValuesInSubcategory: (path: number[], newValues: string[]) => void;
    renameModalOpen: boolean;
    setRenameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (path: number[], newValues: string[]) => void;
}

const ValueDropdown: React.FC<ValueDropdownProps> = ({
                                                         subcategoryName,
                                                         values,
                                                         path,
                                                         index,
                                                         openRenameModal,
                                                         handleDeleteValues,
                                                         addValueToSubcategory,
                                                         replaceValuesInSubcategory,
                                                         renameModalOpen,
                                                         setRenameModalOpen,
                                                         onSubmit,
                                                     }) => {

    return <div className="flex flex-row mt-2">
        {values && values[0] === "" ? (
            <button
                type="button"
                className="rounded-lg border border-gray-300 focus:outline-none dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 dark:bg-gray-800 px-4 py-2 cursor-pointer shadow-md"
                onClick={() => openRenameModal(path, values)}
            >
                Wybierz opcję
            </button>
        ) : values && values[0] && values[0] !== "" ? (
            <>
                <select className="px-4 py-2" defaultValue="">
                    {values.map((value, valueIndex) => value !== "" && (
                        <option key={valueIndex} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="px-2 py-2 ml-2 shadow-md"
                        onClick={() => openRenameModal(path, values)}>
                        <EditIcon />
                    </button>
                    <button
                        type="button"
                        className="w-fit p-2 border-gray-300 shadow-md h-fit ml-1"
                        onClick={() => handleDeleteValues(path)}>
                        <MinusIcon />
                    </button>
                </div>
            </>
        ) : null}


        {renameModalOpen && <RenameModal
            isOpen={renameModalOpen}
            onClose={() => setRenameModalOpen(false)}
            onSubmit={onSubmit}
            values={values}
            path={path}
            index={index}
        />}
    </div>
}

export default ValueDropdown