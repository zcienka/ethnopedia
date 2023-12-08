import React, { useState } from "react"

interface Option {
    value: string
    label: string
}

interface CustomDropdownProps {
    options: Option[]
    onSelect: (value: string) => void
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState<string>(options[0].value)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectedOption(value)
        onSelect(value)
    }

    return <div className="flex flex-row items-center ml-2 custom-dropdown  text-sm">
        <p className="pr-2">Sortuj:</p>
        <select
            value={selectedOption}
            onChange={handleChange}
            className="py-2 px-4 border bg-white border border-gray-300 rounded-lg"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value} className="py-2 px-4">
                    {option.label}
                </option>
            ))}
        </select>
    </div>
}

export default CustomDropdown
