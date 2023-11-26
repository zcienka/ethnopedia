import axios from "axios"
import { API_URL } from '../config'

export const getSections = async () => {
    const response = await axios.get(`${API_URL}v1/sections`)
    return response.data
}
export const getCategory = async (collectionName: string) => {
    const response = await axios.get(`${API_URL}v1/sections/${collectionName}`)
    return response.data
}
