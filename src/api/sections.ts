import axios from "axios"

const API_URL = "http://localhost:8080/api/"
export const getSections = async () => {
    const response = await axios.get(`${API_URL}v1/section`)
    return response.data
}
