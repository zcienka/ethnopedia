import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg"
import React from "react"

type Props = {
    onClose: () => void
    deleteSelected: () => void
}

const WarningPopup = ({ onClose, deleteSelected }: Props) => {
    return <div id="popup-modal"
                className="overflow-y-auto flex items-center overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
        <div className="fixed inset-0 bg-black opacity-50" />

        <div className="relative p-4 w-full max-w-md max-h-full ">
            <div className="relative bg-white rounded-lg shadow-md dark:bg-gray-700 border-gray-200 border">
                <div className="flex justify-end">
                    <button type="button" className="items-end content-end border-none"
                            onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <hr className="border-t border-gray-200 dark:border-gray-700 w-8 self-center w-full" />

                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-700 font-semibold dark:text-gray-400">
                        Czy na pewno chcesz usunąć wybrane kolekcje?
                    </h3>
                    <button data-modal-hide="popup-modal" type="button"
                            className="text-white bg-red-600 font-semibold hover:bg-red-800 focus:ring-4
                            focus:outline-none focus:ring-red-600 dark:focus:ring-red-800
                            font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                    onClick={deleteSelected}>
                        Usuń
                    </button>
                    <button data-modal-hide="popup-modal" type="button" onClick={onClose}
                            className="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none
                            font-semibold
                            focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5
                            hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
                            dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Anuluj
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default WarningPopup