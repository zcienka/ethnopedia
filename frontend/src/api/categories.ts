import axios from "axios"
import { API_URL } from "../config"

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}v1/categories`)
    return response.data
}
