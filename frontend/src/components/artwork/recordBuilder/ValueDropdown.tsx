import React from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"
import RenameModal from "./RenameModal"
import { ModalState } from "../types/ArtworkTypes"


interface ValueDropdownProps {
    subcategoryName?: string;
    values: string[];
    path: number[];
    index: any;
    handleDeleteValues: (path: number[]) => void;
    replaceValuesInSubcategory: (path: number[], newValues: string[]) => void;
    onSubmit: (path: number[], newValues: string[]) => void;
    openRenameModal: (path: number[], values: string[], index: number) => void
    closeModal: () => void;
    modalState: ModalState;
}

const ValueDropdown: React.FC<ValueDropdownProps> = ({
                                                         subcategoryName,
                                                         values,
                                                         path,
                                                         index,
                                                         handleDeleteValues,
                                                         replaceValuesInSubcategory,
                                                         onSubmit,
                                                         modalState,
                                                         openRenameModal,
                                                         closeModal,
                                                     }) => {
    const shouldShowModal = modalState.isOpen &&
        modalState.data.index === index &&
        modalState.data.path.join("") === path.join("")


    return <div className="flex flex-row mt-2">
        {values && values[0] === "" ? (
            <button
                type="button"
                className="rounded-lg border border-gray-300 focus:outline-none dark:text-white
                    dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
                    dark:bg-gray-800 px-4 py-2 cursor-pointer shadow-md"
                onClick={() => openRenameModal(path, values, index)}>
                Wybierz opcję
            </button>
        ) : values[0] && values[0] !== "" ? (
            <>
                <select className="px-4 py-2" defaultValue="">
                    {values.map((value, valueIndex) =>
                            value !== "" && (
                                <option key={valueIndex} value={value}>
                                    {value}
                                </option>
                            ),
                    )}
                </select>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="px-2 py-2 ml-2 shadow-md"
                        onClick={() => openRenameModal(path, values, index)}
                    >
                        <EditIcon />
                    </button>
                    <button
                        type="button"
                        className="w-fit p-2 border-gray-300 shadow-md h-fit ml-1"
                        onClick={() => handleDeleteValues(path)}
                    >
                        <MinusIcon />
                    </button>
                </div>
            </>
        ) : null}


        {shouldShowModal && <RenameModal
            onClose={closeModal}
            isOpen={modalState.isOpen}
            onSubmit={onSubmit}
            values={values}
            path={path}
            index={index}
        />}
    </div>
}

export default ValueDropdown