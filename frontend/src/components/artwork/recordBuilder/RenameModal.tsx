import React, { useEffect, useState } from "react"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { SubcategoryValue } from "../types/ArtworkTypes"

interface RenameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (path: number[], newValues: string[]) => void;
    values: SubcategoryValue[];
    path: number[];
    index: number;
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, onSubmit, values, path, index }) => {
    const [localValues, setLocalValues] = useState<SubcategoryValue[]>(values)

    useEffect(() => {
        setLocalValues(values)
    }, [values])
console.log({path})
    const handleChange = (valueIndex: number, newValue: string) => {
        const updatedValues = localValues.map((value, i) => {
            return i === valueIndex ? { ...value, value: newValue } : value
        })
        setLocalValues(updatedValues)
    }

    const handleAddDropdownOption = () => {
        setLocalValues([...localValues, { index: localValues.length, value: "", row: localValues.length + 1 }])
    }

    const handleDeleteDropdownOption = (deleteIndex: number) => {
        const filteredValues = localValues.filter((_, i) => i !== deleteIndex)
        setLocalValues(filteredValues)
    }

    const handleSubmit = () => {
        onSubmit(path, localValues.map(v => v.value)) // Assuming onSubmit expects path and an array of string values
        onClose()
    }

    return isOpen ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-4 w-96">
                {/* Modal Content */}
                {localValues.map((value, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={value.value}
                            placeholder="Value"
                            onChange={(e) => handleChange(i, e.target.value)}
                            className="input-class"
                        />
                        <button
                            type="button"
                            onClick={() => handleDeleteDropdownOption(i)}>
                            <MinusIcon />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddDropdownOption}>Add Option</button>
                <button
                    type="button"
                    onClick={handleSubmit}>Submit</button>
                <button
                    type="button"
                    onClick={onClose}>Close</button>
            </div>
        </div>
    ) : null
}

export default RenameModal