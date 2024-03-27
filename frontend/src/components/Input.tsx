import React, { useState } from "react"

interface Props {
    inputValue: string;
    onInputChange: (inputValue: string) => void;
}


const Input: React.FC<Props> = ({ inputValue, onInputChange }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState(inputValue || "")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        onInputChange(event.target.value)
    }

    return (
        <div className={`w-fit ${isFocused ? "" : "cursor-pointer"}`}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}>
            {isFocused ? (
                <input
                    type="text"
                    value={value}
                    className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 p-2"
                    onChange={handleChange}
                />
            ) : (
                <div className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2 dark:bg-gray-700
                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                     dark:focus:border-primary-500 w-fit min-w-24"
                     onClick={() => setIsFocused(true)}
                     onChange={handleChange}
                >
                    {value || "Wpisz wartość..."}
                </div>
            )}
        </div>
    )
}

export default Input
