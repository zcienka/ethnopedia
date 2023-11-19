import axios from "axios"
import { Collection } from "../@types/Collection"

const API_URL = "http://localhost:8080/api/"
export const getCollections = async () => {
    const response = await axios.get(`${API_URL}v1/collection`)
    return response.data.collections as Collection[]
}

export const createCollection = async () => {
    return await axios
        .post(`${API_URL}v1/collection`, {})
        .then(res => res.data)
}

export const getSingleCollection = async (id: string) => {
    const response = await axios.get(`${API_URL}v1/collection/${id}`)
    return response.data.collection as Collection
}
