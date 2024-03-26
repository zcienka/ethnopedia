import React, { useState } from "react"

interface Props {
    columnName: string;
    onInputChange: (event: any) => void;
}

const Input: React.FC<Props> = ({ columnName, onInputChange }) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    return (
        <div className="w-fit" onFocus={handleFocus} onBlur={handleBlur}>
            {isFocused ? (
                <input
                    type="text"
                    name={columnName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                     focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-fit min-w-24"
                    onChange={(e) => onInputChange(e.target.value)}
                />
            ) : (
                <div
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                     dark:focus:border-primary-500 w-fit min-w-24"
                    onClick={() => setIsFocused(true)}
                >
                    {columnName}
                </div>
            )}
        </div>
    )
}

export default Input
