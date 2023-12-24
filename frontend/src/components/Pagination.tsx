import React from "react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
                <li>
                    <div onClick={handlePrevious} className="flex items-center justify-center px-3 h-8 leading-tight
                     text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100
                     hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                     dark:hover:text-white cursor-pointer">
                        Previous
                    </div>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <div onClick={() => onPageChange(number)} className={`cursor-pointer flex items-center justify-center px-3 h-8
                         leading-tight ${currentPage === number ? "text-blue-600 bg-blue-50 border border-gray-300" :
                            "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"} 
                            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                            dark:hover:text-white`}>
                            {number}
                        </div>
                    </li>
                ))}
                <li>
                    <div onClick={handleNext} className="flex items-center justify-center px-3 h-8 leading-tight
                     text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700
                      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                      dark:hover:text-white cursor-pointer">
                        Next
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
