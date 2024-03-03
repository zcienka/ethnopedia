import React from "react"
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg"
import { SVGProps } from "react"

interface Props {
    action: (identifier: string) => void;
    identifier: string;
    icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

const ItemAdderButton: React.FC<Props> = ({ action, identifier, icon: Icon = PlusIcon }) => {
    return (
        <div className="flex flex-row items-center">
            <span className="bg-gray-300 h-1/2 flex self-start w-0.5"></span>
            <hr className="border-t-2 border-gray-300 dark:border-gray-700 w-8 self-center" />
            <div className="flex items-center flex-row">
                <button
                    className="p-2 border-gray-300 shadow-md"
                    onClick={() => action(identifier)}
                    type="button"
                >
                    <Icon />
                </button>
            </div>
            <div className="flex items-center flex-row pt-4 h-12"></div>
        </div>
    )
}

export default ItemAdderButton
