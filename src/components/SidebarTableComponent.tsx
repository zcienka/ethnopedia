import React from "react"
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg"

interface Props {
    componentName: string;
    onInputChange: (event: any) => void;
}

const SidebarTableComponent: React.FC<Props> = ({ componentName, onInputChange }) => {
    return <li>
        <a href="#"
           className="flex px-4 py-2 items-center text-sm text-gray-900 rounded-lg dark:text-white
           hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FolderIcon/>
            <span className="flex-1 ml-3 whitespace-nowrap">
                {componentName}
            </span>
        </a>
    </li>
}
export default SidebarTableComponent