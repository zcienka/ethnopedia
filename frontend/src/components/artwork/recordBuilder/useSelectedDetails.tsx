import { useState, useCallback } from "react"

interface SelectedDetail {
    category: any;
    subcategories: Subcategory[];
    collection: string;
    values?: string[];
}

interface Subcategory {
    name: string;
    values?: string[];
    subcategories?: Subcategory[];
    isSelectable?: boolean;
}

function useSelectedDetails(initialState: { [key: string]: SelectedDetail } = {}) {
    const [selectedDetails, setSelectedDetails] = useState<{ [key: string]: SelectedDetail }>(initialState)

    const updateSelectedDetails = useCallback((identifier: string, update: Partial<SelectedDetail>) => {
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [identifier]: { ...prevDetails[identifier], ...update },
        }))
    }, [])

    const addSelectedDetail = useCallback((newDetail: SelectedDetail) => {
        const newIdentifier = `${Date.now()}`
        setSelectedDetails(prevDetails => ({
            ...prevDetails,
            [newIdentifier]: newDetail,
        }))
    }, [])

    const removeSelectedDetail = useCallback((identifier: string) => {
        setSelectedDetails(prevDetails => {
            const updatedDetails = { ...prevDetails }
            delete updatedDetails[identifier]
            return updatedDetails
        })
    }, [])

    return { selectedDetails, setSelectedDetails, updateSelectedDetails, addSelectedDetail, removeSelectedDetail }
}

export default useSelectedDetails
