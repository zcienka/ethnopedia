import React from "react"
import { Link, useLocation } from "react-router-dom"
import { ReactComponent as AngleRightIcon } from "../assets/icons/angleRight.svg"

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const translations: { [key: string]: string } = {
    "collections": "Kolekcje",
    "artworks": "Rekordy",
}

const isId = (segment: string) => {
    return /^[0-9a-f]{24}$/i.test(segment)
}

const Navigation: React.FC = () => {
    const location = useLocation()
    let pathSegments = location.pathname.split("/").filter(Boolean)

    if (pathSegments.length > 0 && isId(pathSegments[pathSegments.length - 1])) {
        pathSegments = pathSegments.slice(0, -1)
    }

    const breadcrumbItems = pathSegments.map((segment, index, array) => {
        const isLast = index === array.length - 1
        const to = `/${array.slice(0, index + 1).join("/")}`

        const decodedSegment = decodeURIComponent(segment)
        const translatedSegment = translations[decodedSegment.toLowerCase()] || decodedSegment
        const displaySegment = capitalizeFirstLetter(translatedSegment)

        return (
            <li key={index} className="flex items-center space-x-1 md:space-x-2">
                {isLast ? (
                    <span className="text-lg font-medium text-gray-500">{displaySegment}</span>
                ) : (
                    <>
                        <Link to={to}
                              className="inline-flex items-center text-lg font-medium text-gray-800 hover:text-blue-600">
                            {displaySegment}
                        </Link>
                        <AngleRightIcon />
                    </>
                )}
            </li>
        )
    })

    return <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center text-lg">
                <Link to="/"
                      className="inline-flex items-center font-medium text-gray-800 hover:text-blue-600">
                    Home
                </Link>
            </li>
            <span className="self-center">
                <AngleRightIcon />
            </span>
            {breadcrumbItems}
        </ol>
    </nav>
}

export default Navigation