import React, { memo } from "react"
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg"

interface Props {
    columnName: string;
    onInputChange: (event: any) => void,
    value: string
}

const CustomTextField: React.FC<Props> = ({ columnName, onInputChange, value }) => {
    console.log(onInputChange)
    return <>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {columnName}
        </label>

        <div className="flex flex-row">
            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
            border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={value}
                        onChange={e => onInputChange(e.target.value)}
            />
            <div className="p-2 flex items-center cursor-pointer">
                <CloseIcon />
            </div>
        </div>
    </>
}

export default memo(CustomTextField)