import React, { useEffect, useState } from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (path: number[], newValues: string[]) => void;
    values: string[];
    path: number[];
    index: number;
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, onSubmit, values, path, index }) => {
    const [localValues, setLocalValues] = useState<string[]>(values)

    useEffect(() => {
        setLocalValues(values)
    }, [values])

    const handleChange = (index: number, newValue: string) => {
        const updatedValues = localValues.map((value, i) => i === index ? newValue : value)
        setLocalValues(updatedValues)
    }

    const handleAddDropdownOption = () => {
        setLocalValues([...localValues, ""])
    }

    const handleDeleteDropdownOption = (index: number) => {
        const filteredValues = localValues.filter((_, i) => i !== index)
        setLocalValues(filteredValues)
    }

    const handleSubmit = () => {
        onSubmit(path, localValues)
        onClose()
    }

    return isOpen ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-4 w-96">
                <div className="flex items-start rounded-t border-b pb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Dodaj nową opcję
                    </h3>
                </div>
                {localValues.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={value}
                            placeholder="Dodaj nową opcję"
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="border mt-2 px-4 py-2"
                        />
                        <button
                            type="button"
                            className="w-fit p-2 border-gray-300 shadow-md h-fit ml-1 mt-2"
                            onClick={() => handleDeleteDropdownOption(index)}>
                            <MinusIcon />
                        </button>
                    </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={handleAddDropdownOption}
                            type="button"
                            className="py-2 px-4 bg-gray-700 text-white hover:bg-gray-600">
                        Nowa opcja
                    </button>
                    <div className="flex space-x-2">
                        <button
                            type="button"
                            onClick={onClose} className="py-2 px-4 border">
                            Anuluj
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit} className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-400">
                            Zapisz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default RenameModal