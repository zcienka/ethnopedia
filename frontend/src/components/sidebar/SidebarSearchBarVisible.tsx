import { ReactComponent as SearchBarLoop } from "../../assets/icons/searchLoop.svg"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import React from "react"

type Props = {
    onClose: () => void
}

const SidebarSearchBarVisible: React.FC<Props> = ({ onClose }) => {
    return <section className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-50 border
                                border-red-900">
        <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="fixed inset-0 bg-black opacity-50 w-screen h-screen" />
            <div className="w-full mb-2  ">
                <div className="flex justify-end">
                    <button type="button"
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                    text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600
                                    dark:hover:text-white "
                            data-modal-hide="default-modal">
                        <Close />
                    </button>
                </div>
                <form className="flex items-center">
                    <label
                        htmlFor="simple-search"
                        className="sr-only"
                    >
                        Search
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchBarLoop />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
}

export default SidebarSearchBarVisible