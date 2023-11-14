import axios from "axios"

const API_URL = "http://localhost:8080/api/"
export const getCollections = async () => {
    const response = await axios.get(`${API_URL}v1/collection`)
    return response.data
}
