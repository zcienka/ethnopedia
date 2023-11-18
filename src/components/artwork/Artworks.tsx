import React, { useState } from "react"
import { useQuery } from "react-query"
import { getArtworks } from "../../api/artworks"
import LoadingPage from "../../pages/LoadingPage"

const Artworks = () => {
    const { data: fetchedData } = useQuery(["artwork"], getArtworks)

    const [visibleCollections, setVisibleCollections] = useState<any>({})
    const [visibleSections, setVisibleSections] = useState<any>({})
    const [visibleSubsections, setVisibleSubsections] = useState<any>({})

    const toggleCollection = (collectionId: number) => {
        setVisibleCollections({ ...visibleCollections, [collectionId]: !visibleCollections[collectionId] })
    }

    const toggleSection = (sectionId: number) => {
        setVisibleSections({ ...visibleSections, [sectionId]: !visibleSections[sectionId] })
    }

    const toggleSubsection = (subsectionId: string) => {
        setVisibleSubsections({ ...visibleSubsections, [subsectionId]: !visibleSubsections[subsectionId] })
    }

    if (fetchedData === undefined) {
        return <LoadingPage />
    } else {
        return (
            <div className="w-128 transition-transform -translate-x-full sm:translate-x-0 shadow-md p-4
            bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 border-gray-200">
                {fetchedData.artworks.map((artwork: any, index: number) => (
                    <div key={index} className="my-2 p-2 bg-white rounded-2 shadow">
                        <h2 className="text-xl font-semibold text-gray-800 cursor-pointer"
                            onClick={() => toggleCollection(index)}>
                            {artwork.Collection}
                        </h2>
                        {visibleCollections[index] && artwork.Sections.map((section: any, sectionIndex: number) => (
                            <div key={sectionIndex} className="my-2">
                                <h3 className="text-lg font-medium text-gray-700 cursor-pointer"
                                    onClick={() => toggleSection(sectionIndex)}>
                                    {section.SectionName}
                                </h3>
                                {visibleSections[sectionIndex] && section.Subsections.map((subsection: any, subsectionIndex: number) => (
                                    <div key={subsectionIndex} className="pl-4 border-l-2 border-gray-200">
                                        <h4 className="text-md font-medium text-gray-600 cursor-pointer"
                                            onClick={() => toggleSubsection(`${sectionIndex}_${subsectionIndex}`)}>
                                            {subsection.SubsectionName}
                                        </h4>
                                        {visibleSubsections[`${sectionIndex}_${subsectionIndex}`] && subsection.Songs.map((song: any, songIndex: number) => (
                                            <div key={songIndex} className="text-sm text-gray-500 pl-2">
                                                <p>{song.Location} - {song.PerformanceStyle}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default Artworks
