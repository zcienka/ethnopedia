import axios from "axios"
import { Collection } from "../@types/Collection"
import { useMutation } from "react-query"
import { API_URL } from "../config"

export const getCollections = async () => {
    const response = await axios.get(`${API_URL}v1/collection`)
    return response.data.collections as Collection[]
}

export const useCreateCollectionMutation = () => {
    return useMutation(async (newCollectionData: Collection) => {
        const res = await axios.post(`${API_URL}v1/collection`, newCollectionData)
        return res.data
    })
}
export const useBatchDeleteCollectionMutation = () => {
    return useMutation(async (collections: string[]) => {
        const collectionIds = collections.join(",")
        const url = `${API_URL}v1/collection/${collectionIds}`

        const res = await axios.delete(url)
        return res.data
    })
}

export const getSingleCollection = async (id: string) => {
    const response = await axios.get(`${API_URL}v1/collection/${id}`)
    return response.data.collection as Collection
}
